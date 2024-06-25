import { createButtonRow, createEmbed } from '@/utils/functions'
import {
	bold,
	ButtonStyle,
	hyperlink,
	type CommandInteraction,
} from 'discord.js'

export async function commandLinksHandler(interaction: CommandInteraction) {
	const embed = createEmbed(interaction.user, {
		title: 'ZetaBot Links',
		description:
			'Fico feliz em saber que você está interessado em meus links. Abaixo você verá os mais diversos links para as mais diversas utilidades, lembrando que nem todos estão disponíveis neste momento e que outros serão adicionados no futuro!',
		fields: [
			{
				name: ':link: Adquira Suporte',
				value: `⤷\tComunidade no Discord: ${hyperlink('.gg/Nb8P7e38b', 'https://discord.gg/Nb8P7e38b', 'Comunidade oficial no Discord')}`,
			},
			{
				name: ':link: Informações Legais',
				value: `⤷\tTermos de Serviço: ~~${hyperlink('zetabot.xyz/tos', 'https://zetabot.xyz/tos', 'Termos de Serviço do bot')}~~ (${bold('Indisponível')})\n⤷\tPolíticas de Privacidade: ~~${hyperlink('zetabot.xyz/privacy', 'https://zetabot.xyz/privacy', 'Políticas de Privacidade com seus dados')}~~ (${bold('Indisponível')})`,
			},
		],
	})

	const row = createButtonRow(
		{
			label: 'Comunidade no Discord',
			style: ButtonStyle.Link,
			url: 'https://discord.gg/Nb8P7e38b',
		},
		{
			label: 'Termos de Serviço',
			style: ButtonStyle.Link,
			url: 'https://zetabot.xyz/tos',
			disabled: true,
		},
		{
			label: 'Políticas de Privacidade',
			style: ButtonStyle.Link,
			url: 'https://zetabot.xyz/privacy',
			disabled: true,
		},
	)

	await interaction.reply({
		embeds: [embed],
		components: [row],
	})
}
