import { Command } from '@/app'
import { commandNotImplemented } from '@/utils/functions'

export default new Command({
	name: 'ajuda',
	description: 'Tenha acesso ao meu painel de ajuda.',
	run: async interaction => {
		await commandNotImplemented(interaction)
	},
})
