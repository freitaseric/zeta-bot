import { type ActivitiesOptions, ActivityType, type Client } from 'discord.js'
import { colorer } from 'might-log'
import { logger } from '..'
import { randomInt } from './Math'
import { Config } from '@/app'

export class PresenceUpdater {
	public static readonly activities: ActivitiesOptions[] = [
		{
			name: 'economia 💸',
			state: 'economy 💸',
			type: ActivityType.Playing,
		},
		{
			name: 'roleplay 😎',
			state: 'roleplay 😎',
			type: ActivityType.Listening,
		},
		{
			name: 'jogos 🎮',
			state: 'games 🎮',
			type: ActivityType.Watching,
		},
	]
	public currentActivityIndex: number | undefined

	constructor(public readonly client: Client) {}

	private changePresence() {
		const randomIndex = randomInt(0, PresenceUpdater.activities.length)

		if (randomIndex !== this.currentActivityIndex) {
			this.client.user?.setPresence({
				activities: [PresenceUpdater.activities[randomIndex]],
			})
			this.currentActivityIndex = randomIndex
			if (!Config.isProduction())
				logger.debug(
					'The client presence has been changed to:',
					PresenceUpdater.activities[randomIndex],
				)
		} else {
			this.changePresence()
		}
	}

	public mainLoop() {
		this.client.user?.setPresence({
			activities: [PresenceUpdater.activities[0]],
		})
		this.currentActivityIndex = 0
		logger.success(
			`Client presence defined by the ${colorer.hex('#5f9ea0')('MainLoop')}.`,
		)
		if (!Config.isProduction())
			logger.debug('Initial presence:', PresenceUpdater.activities[0])

		setInterval(() => this.changePresence(), 300000)
	}
}
