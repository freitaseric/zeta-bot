import { db } from '@/index'
import {
	createEmbed,
	createErrorEmbed,
	createStringSelectRow,
} from '@/utils/functions'
import {
	bold,
	type AnySelectMenuInteraction,
	type CommandInteraction,
	type CommandInteractionOptionResolver,
	type SelectMenuComponentOptionData,
} from 'discord.js'

export default async function openBankAccount(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	await interaction.deferReply()

	const bank = options.getString('banco')

	if (bank) {
	} else {
		const banks = await db.banks.findMany()

		const embed = createEmbed(interaction.user, {
			title: 'Financeiro ZetaBot',
			description:
				'Para abrir uma conta bancária você deve escolher em qual instituição bancária você deseja afiliar-se.',
		})

		const row = createStringSelectRow({
			customId: 'chooseBankSelectMenu',
			placeholder: 'Selecione um banco aqui...',
			options: banks.map<SelectMenuComponentOptionData>(bank => ({
				label: bank.name,
				value: bank.id,
			})),
		})

		await interaction.editReply({
			embeds: [embed],
			components: [row],
		})
	}
}

export async function chooseBankSelectMenuHandler(
	interaction: AnySelectMenuInteraction,
) {
	await interaction.deferReply({ ephemeral: true })

	await interaction.update({
		embeds: [
			createEmbed(interaction.user, {
				description: 'Aguardando confirmação...',
			}),
		],
		components: [],
	})

	const bankId = interaction.values[0]
	const bank = await db.banks.findUnique({
		where: {
			id: bankId,
		},
	})

	if (!bank) {
		const errorEmbed = createErrorEmbed(
			interaction.user,
			'Ocorreu um erro durante o processamento desse comando.',
			'O banco escolhido não existe, foi alterado ou foi deletado.',
		)
		await interaction.editReply({})
		return
	}

	const embed = createEmbed(interaction.user, {
		title: 'Financeiro ZetaBot',
		description: `Você acaba de escolher o banco ${bold(bank.name)}`,
	})
}
