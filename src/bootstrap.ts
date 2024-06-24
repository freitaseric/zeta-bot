import type { CommandInteractionOptionResolver } from 'discord.js'
import { colorer } from 'might-log'
import { logger } from '.'
import { Client } from './app'
import { PresenceUpdater } from './utils'

export function bootstrapApplication() {
	const environment = process.env.ENVIRONMENT ?? 'dev'
	const client = new Client()

	client.once('ready', () => {
		logger.success(
			`Application has been conected to ${colorer.hex('#5f9ea0')(client.user?.username)}!`,
		)

		const presenceUpdater = new PresenceUpdater(client)
		presenceUpdater.mainLoop()

		if (environment === 'dev') {
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

	return { client, environment }
}
