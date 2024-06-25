import {
	ActionRowBuilder,
	ButtonBuilder,
	type ButtonComponentData,
	type CommandInteraction,
	EmbedBuilder,
	type EmbedData,
	type User,
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

export function createButtonRow(...buttons: Partial<ButtonComponentData>[]) {
	const components = new Array<ButtonBuilder>()

	for (const buttonData of buttons) {
		components.push(new ButtonBuilder(buttonData))
	}

	return new ActionRowBuilder<ButtonBuilder>({ components })
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
