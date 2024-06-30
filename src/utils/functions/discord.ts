import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonComponentData,
	type CommandInteraction,
	EmbedBuilder,
	type EmbedData,
	type User,
	type StringSelectMenuComponentData,
	StringSelectMenuBuilder,
	unorderedList,
	inlineCode,
} from 'discord.js'
import { client } from '../..'

export function createEmbed(author: User, options?: EmbedData) {
	return new EmbedBuilder({
		author: {
			name: author.displayName,
			iconURL: author.displayAvatarURL(),
			url: `https://discord.com/users/${author.id}`,
		},
		...options,
		color: 0xdc143c,
		footer: {
			text: `${client.user?.displayName}`,
			iconURL: client.user?.displayAvatarURL(),
		},
		timestamp: Date.now(),
	})
}

export function createErrorEmbed(
	author: User,
	description: string,
	cause: string,
) {
	return new EmbedBuilder({
		author: {
			name: author.displayName,
			iconURL: author.displayAvatarURL(),
			url: `https://discord.com/users/${author.id}`,
		},
		description,
		fields: [
			{
				name: '📝 Causa do Problema',
				value: cause,
			},
			{
				name: '🤔 Possíveis Soluções',
				value: `${unorderedList([
					`Se você acredita que o erro tenha ocorrido de sua parte, tente executar o comando novamente de uma maneira diferente. O comando ${inlineCode('/ajuda')} ou minha documentação oficial podem te ajudar.`,
					'Se o erro tenha sido por nossa parte você poderá entrar em contato com o suporte via fórum online ou minha comunidade oficial.',
					'Em caso do erro ter ocorrido por parte do discord (estará explícito!) não há muito o que ambos possamos fazer além de aguarda, mas vale apena comunicar a equipe do bot para que eles fiquem ciêntes.',
				])}`,
			},
		],
		color: 0xff6347,
		footer: {
			text: `${client.user?.displayName}`,
			iconURL: client.user?.displayAvatarURL(),
		},
		timestamp: Date.now(),
	})
}

export function createButtonRow(...buttons: Partial<ButtonComponentData>[]) {
	const components = new Array<ButtonBuilder>()

	for (const buttonData of buttons) {
		components.push(new ButtonBuilder(buttonData))
	}

	return new ActionRowBuilder<ButtonBuilder>({ components })
}

export function createStringSelectRow(
	data: Partial<StringSelectMenuComponentData>,
) {
	return new ActionRowBuilder<StringSelectMenuBuilder>({
		components: [new StringSelectMenuBuilder(data)],
	})
}

export async function commandNotImplemented(
	interaction: CommandInteraction,
	deferred = false,
) {
	if (deferred) {
		await interaction.editReply({
			content:
				'**:warning: Ops... Parece que você está tentando utilizar um comando que ainda não foi implementado, tente novamente mais tarde!**\n\n> *Se você tem certeza que isso é um erro entre em contato com o suporte!*',
			components: [],
			embeds: [],
			attachments: [],
		})
	} else {
		await interaction.reply({
			ephemeral: true,
			content:
				'**:warning: Ops... Parece que você está tentando utilizar um comando que ainda não foi implementado, tente novamente mais tarde!**\n\n> *Se você tem certeza que isso é um erro entre em contato com o suporte!*',
		})
	}
}
