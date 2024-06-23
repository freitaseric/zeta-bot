import { EmbedBuilder, type EmbedData, type User } from 'discord.js'
import { client } from '..'

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
