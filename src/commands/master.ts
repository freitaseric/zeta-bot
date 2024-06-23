import { Command } from '@/app'
import { createEmbed } from '@/utils'
import {
	ApplicationCommandOptionType,
	type CommandInteraction,
	inlineCode,
} from 'discord.js'
import { client } from '..'
import { commandManageHandler } from './private/manageBot.lib'

export default new Command({
	name: 'itadori',
	description: 'Comando mestre do bot.',
	options: [
		{
			name: 'gerenciar',
			description: 'Comando para gerenciar o bot. (Apenas para o DEV)',
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [],
		},
		{
			name: 'informações',
			description: 'Veja informações sobre mim.',
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [],
		},
		{
			name: 'links',
			description: 'Veja alguns links úteis.',
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [],
		},
	],
	run: async ({ interaction, options }) => {
		const subCommandGroup = options.getSubcommandGroup(
			true,
		) as CommandMasterSubcommandGroup

		switch (subCommandGroup) {
			case 'gerenciar': {
				commandManageHandler(interaction, options)
				break
			}
			case 'informações': {
				commandInformationsHandler(interaction)
				break
			}
			case 'links': {
				commandLinksHandler(interaction)
				break
			}
		}
	},
})

type CommandMasterSubcommandGroup = 'gerenciar' | 'informações' | 'links'

async function commandInformationsHandler(interaction: CommandInteraction) {
	const embed = createEmbed(interaction.user, {
		title: `Informações - ${inlineCode(client.user?.username ?? 'BOT')}`,
		description:
			'Abaixo estarão algumas informações sobre meu desenvolvimento, funcionamento e objetivo de vida.',
		thumbnail: { url: interaction.user.displayAvatarURL() },
	})

	await interaction.reply({
		embeds: [embed],
	})
}

async function commandLinksHandler(interaction: CommandInteraction) {}
