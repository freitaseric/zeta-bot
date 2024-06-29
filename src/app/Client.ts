import fs, { type PathLike } from 'node:fs'
import path from 'node:path'
import type {
	ButtonCollection,
	CommandCollection,
	CommandOptions,
	EventCollection,
	ModalCollection,
	SelectMenuCollection,
} from '@/types'
import {
	type ClientEvents,
	Collection,
	Client as DiscordClient,
	GatewayIntentBits,
	Partials,
} from 'discord.js'
import dotenv from 'dotenv'
import { logger } from '..'
import type { Event } from './Event'
dotenv.config()

export class Client extends DiscordClient {
	private static readonly PATH = path.resolve(__dirname, '..')
	public commands: CommandCollection = new Collection()
	public buttons: ButtonCollection = new Collection()
	public selects: SelectMenuCollection = new Collection()
	public modals: ModalCollection = new Collection()
	public events: EventCollection = new Collection()

	constructor() {
		super({
			intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
			partials: Object.values(Partials) as Partials[],
		})

		this.registerEvents()
		this.registerCommands()
		this.login(process.env.BOT_TOKEN)
	}

	private async registerCommands() {
		const entryCondition = (entry: string | Buffer) => {
			const isFile = fs
				.statSync(path.join(commandsPath, entry.toString()))
				.isFile()
			const isJsOrTsFile =
				path.extname(path.join(commandsPath, entry.toString())) === '.js' ||
				path.extname(path.join(commandsPath, entry.toString())) === '.ts'
			const isLib = entry.includes('lib/') || entry.includes('.lib')

			return isFile && isJsOrTsFile && !isLib
		}

		const commandsPath = path.join(Client.PATH, 'commands')
		this.ensureDir(commandsPath)

		for (const path of fs
			.readdirSync(commandsPath, { recursive: true })
			.filter(entryCondition)) {
			import(`../commands/${path}`).then(imported => {
				const command: CommandOptions = imported.default
				if (!command?.name) return
				this.commands.set(command.name, command)

				if (command.buttons)
					command.buttons.each((button, customId) =>
						this.buttons.set(customId, button),
					)
				if (command.selects)
					command.selects.each((select, customId) =>
						this.selects.set(customId, select),
					)
				if (command.modals)
					command.modals.each((modal, customId) =>
						this.modals.set(customId, modal),
					)
			})
		}
	}

	private registerEvents() {
		const eventsPath = path.join(Client.PATH, 'events')

		const entryCondition = (entry: string | Buffer) => {
			const isFile = fs
				.statSync(path.join(eventsPath, entry.toString()))
				.isFile()
			const isJsOrTsFile =
				path.extname(path.join(eventsPath, entry.toString())) === '.js' ||
				path.extname(path.join(eventsPath, entry.toString())) === '.ts'

			return isFile && isJsOrTsFile
		}

		this.ensureDir(eventsPath)

		for (const path of fs
			.readdirSync(eventsPath, { recursive: true })
			.filter(entryCondition)) {
			import(`../events/${path}`).then(imported => {
				const event: Event<keyof ClientEvents> = imported.default
				this.events.set(event.name, event)

				try {
					if (event.once) {
						this.once(event.name, event.run)
					} else {
						this.on(event.name, event.run)
					}
				} catch (error) {
					logger.error(
						`An error has ocurred on event: ${event.name}\n`,
						error as Error,
					)
				}
			})
		}
	}

	private ensureDir(path: PathLike) {
		if (!fs.existsSync(path)) {
			fs.mkdirSync(path)
		}
	}

	public async reloadCommands() {
		try {
			this.commands.clear()
			await this.registerCommands()

			return true
		} catch (error) {
			this.commands.clear()

			logger.error(
				'An error has ocurred while trying to reload the application commands!',
				error as object,
			)

			return false
		}
	}

	public reloadEvents() {
		try {
			this.events.clear()
			this.removeAllListeners()

			this.registerEvents()

			return true
		} catch (error) {
			this.events.clear()
			this.removeAllListeners()

			logger.error(
				'An error has ocurred while trying to reload the client events!',
				error as object,
			)

			return false
		}
	}
}
