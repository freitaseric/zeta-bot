import type {
	AnySelectMenuInteraction,
	ButtonInteraction,
	Collection,
	ModalSubmitInteraction,
} from 'discord.js'

export type ButtonCollection = Collection<
	string,
	(interaction: ButtonInteraction) => void | Promise<void>
>

export type SelectMenuCollection = Collection<
	string,
	(interaction: AnySelectMenuInteraction) => void | Promise<void>
>

export type ModalCollection = Collection<
	string,
	(interaction: ModalSubmitInteraction) => void | Promise<void>
>
