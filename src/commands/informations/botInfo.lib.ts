import { client, db } from '@/index'
import { getRuntimeEnvironment } from '@/utils'
import { createButtonRow, createEmbed } from '@/utils/functions'
import {
	bold,
	type ButtonInteraction,
	ButtonStyle,
	type CommandInteraction,
	inlineCode,
	italic,
	quote,
} from 'discord.js'
import packageJson from '#/package'
import { Config } from '@/app'

export async function commandInformationsHandler(
	interaction: CommandInteraction | ButtonInteraction,
) {
	await sendGeneralInformationsPage(interaction, true)
}

export async function sendGeneralInformationsPage(
	interaction: CommandInteraction | ButtonInteraction,
	firstTime = false,
) {
	const embed = createEmbed(interaction.user, {
		title: `Informações - ${inlineCode(client.user?.username ?? 'BOT')}`,
		description:
			'Abaixo estarão algumas informações sobre meu desenvolvimento, funcionamento e objetivo de vida.',
		fields: [
			{
				name: '🤖 Sobre Mim',
				value: `Olá **${interaction.user.displayName}**, me chamo ${inlineCode('ZetaBot')} mas pode me chamar apenas de ${inlineCode('Zeta')}. Sou um pequeno bot **brasileiro** para Discord focado em economia e entretenimento desenvolvidor pelo ${inlineCode(Config.developer)}.\n\nMinhas funcionalidades principais são ${inlineCode('roleplay')}, ${inlineCode('apostas')} e ${inlineCode('minijogos')}. O seu objetivo nesta incrível aventura é conseguir bastantes __**ZetaCoins**__ para dominar a economia do servidor, e quem sabe até a global, e se tornar o jogador mais rico dentre todos.\nPara isso você poderá seguir diversos caminhos como, por exemplo: ${inlineCode('Mineração')}, ${inlineCode('Agropecuária')}, ${inlineCode('Investimentos')}, ${inlineCode('Mercado ilegal')} e até mesmo ${inlineCode('E-Sports')} e ${inlineCode('Digital Influencer')}, mas é óbvio que você não chegará no topo tão facilmente, por tanto iniciar do básico, trabalhando de ${italic('motoboy')} ou ${italic('uber')}, será necessário para construir seu império!`,
			},
			{
				name: '⚡ Motivação',
				value: `O que motiva meu desenvolvedor a continuar me aprimorando é, principalmente, a ideia de proporcionar uma experiência inovadora sobre o uso de bots de entretenimento e economia no Discord. Nós queremos quebrar a ${italic('mesmisse')} de pegar daily, fazer um ${italic('coinflipbet')} e ficar cheio do dinheiro sem ter com que gastar, porém sem criar algo muito avançado com temas, geralmente, fictícios onde o jogo se parece mais com um RPG do que um simples roleplay. O ${inlineCode(Config.developer)} visa fornecer a experiência real de como é viver no **Brasil** dentro do Discord mesmo que não siga 100% da realidade pois isso não seria possível como, também, não seria tão interessante.`,
			},
		],
	})

	const navigationRow = createButtonRow(
		{
			customId: 'sendGeneralInformationsPageButton',
			label: 'Informações Gerais (Atual)',
			style: ButtonStyle.Primary,
			disabled: true,
		},
		{
			customId: 'sendTechnicalInformationsPageButton',
			label: 'Informações Técnicas',
			emoji: '🤖',
			style: ButtonStyle.Primary,
		},
	)

	const linksRow = createButtonRow(
		{
			label: 'Website',
			emoji: '🌐',
			style: ButtonStyle.Link,
			url: 'https://zetabot.xyz',
			disabled: true,
		},
		{
			label: 'Comunidade',
			emoji: '🏠',
			style: ButtonStyle.Link,
			url: 'https://discord.gg/Nb8P7e38bW',
		},
	)

	if (firstTime) {
		await interaction.reply({
			embeds: [embed],
			components: [navigationRow, linksRow],
		})
	} else {
		if (!interaction.isButton()) return
		await interaction.update({
			embeds: [embed],
			components: [navigationRow, linksRow],
		})
	}
}

export async function sendTechnicalInformationsPage(
	interaction: ButtonInteraction,
) {
	await interaction.deferUpdate()
	const runtime = getRuntimeEnvironment()
	const users = await db.users.findMany()

	const embed = createEmbed(interaction.user, {
		title: `Informações - ${inlineCode(client.user?.username ?? 'BOT')}`,
		description:
			'Abaixo estarão algumas informações sobre meu ambiente de desenvolvimento, ambiente de hospedagem e banco de dados.',
		fields: [
			{
				name: ':bar_chart: Estatísticas',
				value: `⤷\tUsuários Registrados: ${inlineCode(users.length.toString())}\n⤷\tServidores Registrados: ${inlineCode(client.guilds.cache.size.toString())}\n⤷\tComandos Registrados: ${inlineCode(client.commands.size.toString())}\n⤷\tEventos Registrados: ${inlineCode(client.events.size.toString())}`,
			},
			{
				name: ':computer: Ambiente de Desenvolvimento',
				value: `⤷\tLinguagem de Programação: ${inlineCode('TypeScript')} (${italic(packageJson.devDependencies.typescript)})\n⤷\tInterpretador JavaScript: ${inlineCode(runtime.name)} (${italic(runtime.version)})\n⤷\tAPI Wrapper: ${inlineCode('Discord.js')} (${italic(packageJson.dependencies['discord.js'])})`,
			},
			{
				name: ':cloud: Ambiente de Hospedagem',
				value: quote(
					italic(
						`Ainda não possuo uma host, caso conheça uma com preço mais em conta ou seja dono de alguma e queira me ajudar, por favor entre em contato com ${bold(Config.developer)} na DM.`,
					),
				),
			},
			{
				name: ':floppy_disk: Banco de Dados',
				value: '⤷\tMongoDB',
			},
		],
	})

	const navigationRow = createButtonRow(
		{
			customId: 'sendGeneralInformationsPageButton',
			label: 'Informações Gerais',
			style: ButtonStyle.Primary,
		},
		{
			customId: 'sendTechnicalInformationsPageButton',
			label: 'Informações Técnicas (Atual)',
			emoji: '🤖',
			style: ButtonStyle.Primary,
			disabled: true,
		},
	)

	const linksRow = createButtonRow(
		{
			label: 'Website',
			emoji: '🌐',
			style: ButtonStyle.Link,
			url: 'https://zetabot.xyz',
			disabled: true,
		},
		{
			label: 'Comunidade',
			emoji: '🏠',
			style: ButtonStyle.Link,
			url: 'https://discord.gg/Nb8P7e38bW',
		},
	)

	await interaction.editReply({
		embeds: [embed],
		components: [navigationRow, linksRow],
	})
}
