import type {
	CommandInteraction,
	CommandInteractionOptionResolver,
} from 'discord.js'

export async function commandManageHandler(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	await interaction.reply('')
}

async function commandReloadHandler(interaction: CommandInteraction) {}
