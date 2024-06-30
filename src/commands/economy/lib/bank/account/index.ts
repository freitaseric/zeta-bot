import type {
	CommandInteraction,
	CommandInteractionOptionResolver,
} from 'discord.js'
import openBankAccount from './open'

type CommandBankAccountSubCommand = 'abrir' | 'gerenciar' | 'fechar'

export default async function bankAccountCommandHandler(
	interaction: CommandInteraction,
	options: CommandInteractionOptionResolver,
) {
	const subCommand = options.getSubcommand(true) as CommandBankAccountSubCommand

	switch (subCommand) {
		case 'abrir': {
			await openBankAccount(interaction, options)
			break
		}
		case 'fechar': {
			break
		}
		case 'gerenciar': {
			break
		}
	}
}
