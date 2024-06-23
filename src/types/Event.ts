import type { Event } from '@/app'
import type { ClientEvents, Collection } from 'discord.js'

export type EventCollection = Collection<string, Event<keyof ClientEvents>>
