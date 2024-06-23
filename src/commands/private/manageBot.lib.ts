import { createEmbed } from '@/utils'
import {
	type CommandInteraction,
	type CommandInteractionOptionResolver,
	codeBlock,
} from 'discord.js'

export async function commandManageHandler(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	const subCommand = options.getSubcommand(true) as CommandManageSubcommand

	switch (subCommand) {
		case 'eval': {
			await commandEvalHandler(interaction, options)
			break
		}
		case 'recarregar': {
			await commandReloadHandler(interaction, options)
			break
		}
	}
}

type CommandManageSubcommand = 'eval' | 'recarregar'

async function commandEvalHandler(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	await interaction.deferReply()
	const code = options.getString('código', true)

	// biome-ignore lint/security/noGlobalEval: this command is only for devs
	const evaluated = eval(code)
	let result: string

	if (typeof evaluated === 'object') {
		result = JSON.stringify(evaluated, null, 2)
	} else {
		result = evaluated
	}

	const embed = createEmbed(interaction.user, {
		title: 'Eval',
		fields: [
			{
				name: 'Entrada:',
				value: codeBlock('javascript', code),
			},
			{
				name: 'Saída:',
				value: codeBlock('json', result),
			},
		],
	})

	await interaction.editReply({
		embeds: [embed],
	})
}

async function commandReloadHandler(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	await interaction.deferReply({ ephemeral: true })
}
