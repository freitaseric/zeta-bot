import type { CommandOptions } from '@/types'

export class Command {
	constructor(options: CommandOptions) {
		Object.assign(this, options)
	}
}
