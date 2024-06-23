import { Command } from '@/app'
import { createEmbed } from '@/utils'
import {
	ApplicationCommandOptionType,
	type CommandInteraction,
	inlineCode,
	italic,
} from 'discord.js'
import { client, config } from '..'

export default new Command({
	name: 'zeta',
	description: 'Comando mestre do ZetaBot.',
	options: [
		{
			name: 'gerenciar',
			description: 'Comando para gerenciar o ZetaBot. (Apenas para o DEV)',
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [
				{
					name: 'recarregar',
					description: 'Recarrega alguns de meus componentes.',
					type: ApplicationCommandOptionType.Subcommand,
				},
			],
		},
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
		const subCommandGroup =
			options.getSubcommandGroup() as CommandZetaSubcommandGroup
		const subCommand = options.getSubcommand() as CommandZetaSubcommand

		switch (subCommandGroup) {
			case 'gerenciar': {
				commandManageHandler(interaction, options)
				break
			}
		}
		switch (subCommand) {
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

type CommandZetaSubcommandGroup = 'gerenciar'
type CommandZetaSubcommand = 'informações' | 'links'

async function commandInformationsHandler(interaction: CommandInteraction) {
	const embed = createEmbed(interaction.user, {
		title: `Informações - ${inlineCode(client.user?.username ?? 'BOT')}`,
		description:
			'Abaixo estarão algumas informações sobre meu desenvolvimento, funcionamento e objetivo de vida.',
		thumbnail: { url: client.user?.displayAvatarURL() ?? '' },
		fields: [
			{
				name: '🤖 Sobre Mim',
				value: `Olá **${interaction.user.displayName}**, me chamo ${inlineCode('ZetaBot')} mas pode me chamar apenas de ${inlineCode('Zeta')}. Sou um pequeno bot **brasileiro** para Discord focado em economia e entretenimento desenvolvidor pelo ${inlineCode(config.developer?.displayName ?? 'Eric Freitas')}.\n\nMinhas funcionalidades principais são ${inlineCode('roleplay')}, ${inlineCode('apostas')} e ${inlineCode('minijogos')}. O seu objetivo nesta incrível aventura é conseguir bastantes __**ZetaCoins**__ para dominar a economia do servidor, e quem sabe até a global, e se tornar o jogador mais rico dentre todos.\nPara isso você poderá seguir diversos caminhos como, por exemplo: ${inlineCode('Mineração')}, ${inlineCode('Agropecuária')}, ${inlineCode('Investimentos')}, ${inlineCode('Mercado ilegal')} e até mesmo ${inlineCode('E-Sports')} e ${inlineCode('Digital Influencer')}, mas é óbvio que você não chegará no topo tão facilmente, por tanto iniciar do básico, trabalhando de ${italic('motoboy')} ou ${italic('uber')}, será necessário para construir seu império!`,
			},
			{
				name: '⚡ Motivação',
				value: `O que motiva meu desenvolvedor a continuar me aprimorando é, principalmente, a ideia de proporcionar uma experiência inovadora sobre o uso de bots de entretenimento e economia no Discord. Nós queremos quebrar a ${italic('mesmisse')} de pegar daily, fazer um ${italic('coinflipbet')} e ficar cheio do dinheiro sem ter com que gastar, porém sem criar algo muito avançado com temas, geralmente, fictícios onde o jogo se parece mais com um RPG do que um simples roleplay. O ${inlineCode(config.developer?.displayName ?? 'Eric Freitas')} visa fornecer a experiência real de como é viver no **Brasil** dentro do Discord mesmo que não siga 100% da realidade pois isso não seria possível como, também, não seria tão interessante.`,
			},
		],
	})

	await interaction.reply({
		embeds: [embed],
	})
}

async function commandLinksHandler(interaction: CommandInteraction) {}

async function commandManageHandler(interaction: unknown, options: unknown) {}
