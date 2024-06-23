import type { Client } from '@/app'
import type {
	ApplicationCommandData,
	AutocompleteInteraction,
	Collection,
	CommandInteraction,
	CommandInteractionOptionResolver,
	MessageContextMenuCommandInteraction,
	UserContextMenuCommandInteraction,
} from 'discord.js'
import type {
	ButtonCollection,
	ModalCollection,
	SelectMenuCollection,
} from './Component'

export type CommandOptions = ApplicationCommandData & {
	run: (options: {
		client: Client
		interaction:
			| CommandInteraction
			| UserContextMenuCommandInteraction
			| MessageContextMenuCommandInteraction
		options: CommandInteractionOptionResolver
	}) => void
	autoComplete?: (interaction: AutocompleteInteraction) => void
	buttons?: ButtonCollection
	selects?: SelectMenuCollection
	modals?: ModalCollection
}

export type CommandCollection = Collection<string, CommandOptions>
