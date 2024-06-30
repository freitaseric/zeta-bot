import { Command } from '@/app'
import { db } from '@/index'
import { ApplicationCommandOptionType, Collection } from 'discord.js'
import bankAccountCommandHandler from './lib/bank/account'
import { chooseBankSelectMenuHandler } from './lib/bank/account/open'

export default new Command({
	name: 'banco',
	description: 'Comando mestre do sistema de banco',
	options: [
		{
			name: 'conta',
			description: 'Comando mestre do sistema de conta bancária',
			type: ApplicationCommandOptionType.SubcommandGroup,
			options: [
				{
					name: 'abrir',
					description: 'Abra uma conta bancária',
					type: ApplicationCommandOptionType.Subcommand,
					options: [
						{
							name: 'banco',
							description: 'Informe um banco para criar uma conta bancária.',
							type: ApplicationCommandOptionType.String,
							autocomplete: true,
						},
					],
				},
				{
					name: 'gerenciar',
					description: 'Gerencie sua conta bancária',
					type: ApplicationCommandOptionType.Subcommand,
				},
				{
					name: 'fechar',
					description: 'Feche sua conta bancária',
					type: ApplicationCommandOptionType.Subcommand,
				},
			],
		},
	],
	autoComplete: async interaction => {
		const banks = await db.banks.findMany()
		const choices =
			banks.length === 0
				? [
						{
							name: 'Ops... Nenhum banco encontrado no registro!',
							value: 'empty',
						},
					]
				: banks.map(bank => ({
						name: bank.name,
						value: bank.id,
					}))

		const focused = interaction.options.getFocused(true)

		await interaction.respond(
			choices.filter(choice =>
				choice.value.includes(focused.value.toLowerCase()),
			),
		)
	},
	run: async (interaction, options) => {
		if (!options) return

		const subCommandGroup = options.getSubcommandGroup(
			true,
		) as CommandBankSubCommandGroup

		switch (subCommandGroup) {
			case 'conta': {
				await bankAccountCommandHandler(interaction, options)
				break
			}
		}
	},
	selects: new Collection([
		['chooseBankSelectMenu', chooseBankSelectMenuHandler],
	]),
})

type CommandBankSubCommandGroup = 'conta'
