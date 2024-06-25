import { Command } from '@/app'
import { ApplicationCommandOptionType, Collection } from 'discord.js'
import {
	commandInformationsHandler,
	sendGeneralInformationsPage,
	sendTechnicalInformationsPage,
} from './informations/botInfo.lib'
import { commandLinksHandler } from './informations/botLinks.lib'

export default new Command({
	name: 'zeta',
	description: 'Comando mestre do ZetaBot.',
	options: [
		{
			name: 'informações',
			description: 'Veja informações sobre mim.',
			type: ApplicationCommandOptionType.Subcommand,
		},
		{
			name: 'links',
			description: 'Veja alguns links úteis.',
			type: ApplicationCommandOptionType.Subcommand,
		},
	],
	run: async ({ interaction, options }) => {
		const subCommand = options.getSubcommand() as CommandZetaSubcommand

		switch (subCommand) {
			case 'informações': {
				await commandInformationsHandler(interaction)
				break
			}
			case 'links': {
				await commandLinksHandler(interaction)
				break
			}
		}
	},
	buttons: new Collection([
		[
			'sendGeneralInformationsPageButton',
			async interaction => await sendGeneralInformationsPage(interaction),
		],
		[
			'sendTechnicalInformationsPageButton',
			async interaction => await sendTechnicalInformationsPage(interaction),
		],
	]),
})

type CommandZetaSubcommand = 'informações' | 'links'
