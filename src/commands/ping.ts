import { Command } from '@/app'
import { createEmbed } from '@/utils/functions'
import { client, db } from '..'

export default new Command({
	name: 'ping',
	description: 'Mostra minhas latências.',
	run: async interaction => {
		const start = Date.now()
		db.users.findMany()
		const end = Date.now()

		const ping = {
			ws: client.ws.ping,
			interaction: Date.now() - interaction.createdTimestamp,
			database: end - start,
		}

		const embed = createEmbed(interaction.user, {
			title: '🏓 Pong!',
			description: `Eu respondi esse comando em \`${ping.interaction}ms\`.\nA latência do **WebScocket** é de \`${ping.ws}ms\`.\nA latência do banco de dados é de \`${ping.database}ms\`.`,
		})

		await interaction.reply({
			embeds: [embed],
		})
	},
})
