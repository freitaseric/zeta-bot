import type {
	ApplicationCommandDataResolvable,
	CommandInteractionOptionResolver,
} from 'discord.js'
import { MightLogger, colorer } from 'might-log'
import { logger } from '.'
import { Client, Config } from './app'
import { PresenceUpdater } from './utils'
import { Database } from './app/Database'
import { commandNotImplemented } from './utils/functions'

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

		if (interaction.isAutocomplete()) {
			const command = client.commands.get(interaction.commandName)

			if (!command || !command.autoComplete) return

			command.autoComplete(interaction)
		}

		if (interaction.isCommand()) {
			const command = client.commands.get(interaction.commandName)

			if (!command) return commandNotImplemented(interaction)

			command.run(
				interaction,
				interaction.options as CommandInteractionOptionResolver,
			)
		}
	})

	return client
}

export function bootstrapDatabase() {
	return new Database()
}

export function bootstrapLogger() {
	return new MightLogger({
		locale: 'pt-br',
		verbosity: Config.isProduction() ? 1 : 3,
		pretty: !Config.isProduction(),
	})
}
