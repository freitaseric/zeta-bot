import type {
	ApplicationCommandDataResolvable,
	CommandInteractionOptionResolver,
} from 'discord.js'
import { MightLogger, colorer } from 'might-log'
import { logger } from '.'
import { Client, Config } from './app'
import { PresenceUpdater } from './utils'
import { Database } from './app/Database'

export function bootstrapApplication() {
	const client = new Client()

	client.once('ready', async () => {
		const commands = new Array<ApplicationCommandDataResolvable>()

		for (const command of client.commands.values()) {
			commands.push(command)
		}

		try {
			await client.application?.commands.set(commands)
		} catch (error) {
			client.commands.clear()

			logger.error(
				'An error has ocurred while trying to define the application commands!',
				error as object,
			)
		}

		logger.success(
			`Application has been conected to ${colorer.hex('#5f9ea0')(client.user?.username)}!`,
		)

		const presenceUpdater = new PresenceUpdater(client)
		presenceUpdater.mainLoop()

		if (!Config.isProduction()) {
			logger.debug(client.events.size, 'event(s) successfully defined!')
			logger.debug(
				client.commands.size,
				'application command(s) successfully defined!',
			)
		}
	})
	client.on('interactionCreate', interaction => {
		if (interaction.isButton()) {
			return client.buttons.get(interaction.customId)?.(interaction)
		}
		if (interaction.isAnySelectMenu()) {
			return client.selects.get(interaction.customId)?.(interaction)
		}
		if (interaction.isModalSubmit()) {
			return client.modals.get(interaction.customId)?.(interaction)
		}

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName)

			if (interaction.isAutocomplete() && command?.autoComplete) {
				command.autoComplete(interaction)
			}

			if (!command)
				return interaction.reply({
					ephemeral: true,
					content: 'Este comando ainda não foi configurado!',
				})

			command.run({
				client,
				interaction: interaction,
				options: interaction.options as CommandInteractionOptionResolver,
			})
		}
	})

	return client
}

export function bootstrapDatabase() {
	const db = new Database()

	db.connect()
		.then(connection => {
			logger.success('Database connected successfullt')
			if (!Config.isProduction())
				logger.debug(
					Object.values(connection.collections).length,
					'collections registered!',
				)
		})
		.catch(error => logger.error(error))

	return db
}

export function bootstrapLogger() {
	return new MightLogger({
		locale: 'pt-br',
		verbosity: Config.isProduction() ? 1 : 3,
		pretty: !Config.isProduction(),
	})
}
