import fs from 'node:fs'
import path from 'node:path'
import type {
	ButtonCollection,
	CommandCollection,
	CommandOptions,
	EventCollection,
	ModalCollection,
	SelectMenuCollection,
} from '@/types'
import { PrismaClient } from '@prisma/client'
import {
	type ApplicationCommandDataResolvable,
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

	public database = new PrismaClient()

	constructor() {
		super({
			intents: Object.values(GatewayIntentBits) as GatewayIntentBits[],
			partials: Object.values(Partials) as Partials[],
		})

		this.registerModules()
		this.login(process.env.BOT_TOKEN)
	}

	private async registerCommands(commands: ApplicationCommandDataResolvable[]) {
		this.application?.commands.set(commands).catch(err => {
			this.commands.clear()
			logger.error(
				'An error has ocurred while trying to define the application commands',
				err,
			)
		})
	}

	private registerModules() {
		const entryConditionCommands = (entry: string | Buffer) => {
			const isFile = fs
				.statSync(path.join(commandsPath, entry.toString()))
				.isFile()
			const isJsOrTsFile =
				path.extname(path.join(commandsPath, entry.toString())) === '.js' ||
				path.extname(path.join(commandsPath, entry.toString())) === '.ts'
			const isLib = entry.includes('lib/') || entry.includes('.lib')

			return isFile && isJsOrTsFile && !isLib
		}
		const entryConditionEvents = (entry: string | Buffer) => {
			const isFile = fs
				.statSync(path.join(eventsPath, entry.toString()))
				.isFile()
			const isJsOrTsFile =
				path.extname(path.join(eventsPath, entry.toString())) === '.js' ||
				path.extname(path.join(eventsPath, entry.toString())) === '.ts'

			return isFile && isJsOrTsFile
		}

		// Commands
		const slashCommands: Array<ApplicationCommandDataResolvable> = new Array()

		const commandsPath = path.join(Client.PATH, 'commands')
		for (const path of fs
			.readdirSync(commandsPath, { recursive: true })
			.filter(entryConditionCommands)) {
			import(`../commands/${path}`).then(imported => {
				const command: CommandOptions = imported.default
				if (!command?.name) return
				this.commands.set(command.name, command)
				slashCommands.push(command)

				if (command.buttons)
					command.buttons.each((button, name) => this.buttons.set(name, button))
				if (command.selects)
					command.selects.each((select, name) => this.selects.set(name, select))
				if (command.modals)
					command.modals.each((modal, name) => this.modals.set(name, modal))
			})
		}

		this.on('ready', () => this.registerCommands(slashCommands))

		// Events
		const eventsPath = path.join(Client.PATH, 'events')
		for (const path of fs
			.readdirSync(eventsPath, { recursive: true })
			.filter(entryConditionEvents)) {
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
}
