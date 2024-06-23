import { Command } from '@/app'
import { config, environment } from '@/index'
import { createEmbed, getOSEnvironment, getRuntimeEnvironment } from '@/utils'
import { ApplicationCommandOptionType, codeBlock } from 'discord.js'

export default new Command({
	name: 'dev',
	description: 'Comando mestre para gerenciamento do bot.',
	options: [
		{
			name: 'info',
			description: 'Mostra algumas informações técnicas de desenvolvimento.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'ephemeral',
					description: 'Define se a resposta será efêmera ou não.',
					type: ApplicationCommandOptionType.Boolean,
				},
			],
		},
		{
			name: 'eval',
			description: 'Executa códigos javascript por comando.',
			type: ApplicationCommandOptionType.Subcommand,
			options: [
				{
					name: 'código',
					description: 'Código que será executado',
					type: ApplicationCommandOptionType.String,
					required: true,
				},
			],
		},
	],
	run: async ({ interaction, options }) => {
		const subcmd = options.getSubcommand() as SubCommand

		switch (subcmd) {
			case 'info': {
				const ephemeral = options.getBoolean('ephemeral') ?? undefined

				const runtime = getRuntimeEnvironment()
				const os = getOSEnvironment()

				const embed = createEmbed(interaction.user, {
					title: 'Informações de Desenvolvimento',
					description:
						'Abaixo você verá informações úteis para depuração e meu desenvolvimento.',
					fields: [
						{
							name: 'Ambiente',
							value: `**__Tipo__: \`${environment.replace('dev', 'DESENVOLVIMENTO').replace('prod', 'PRODUÇÃO')}\`**\n**__Runtime__:\`${runtime.name} v${runtime.version}\`**\n**__Sistema Operacional__: \`${os.name}(${os.arch}) ${os.kernel}\`**`,
						},
						{
							name: 'Banco de Dados',
							value: `**__Datasource__: \`${config.datasource}\`**\n**__ORM__: \`Prisma ORM\`**`,
						},
					],
				})

				await interaction.reply({
					embeds: [embed],
					ephemeral,
				})
				break
			}

			case 'eval': {
				break
			}

			default:
				break
		}
	},
})

type SubCommand = 'info' | 'eval'
