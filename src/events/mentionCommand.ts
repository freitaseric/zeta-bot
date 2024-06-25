import { Event } from '@/app'
import { createEmbed } from '@/utils/functions'
import { client } from '..'
export default new Event('messageCreate', async message => {
	if (!message.content.startsWith(`<@${client.user?.id}>`)) return

	const embed = createEmbed(message.author, {
		title: `Saudações ${message.author.displayName}!`,
		description:
			'Se você está interessado em ver meus comandos utilize o comando </ajuda:1255171245201297439>. Caso você seja um iniciante que deseja aprender a jogar basta usar o comando </zeta tutorial:1254593387487694951> para ter acesso a um tutorial completo de como se aventurar nesse mundo de emoções e diversão!',
	})

	await message.reply({
		embeds: [embed],
	})
})
