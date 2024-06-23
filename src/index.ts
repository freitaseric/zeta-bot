import * as os from 'node:os'
import { MightLogger } from 'might-log'
import { Configuration } from './app'
import { bootstrapApplication } from './bootstrap'

export const logger = new MightLogger({
	verbosity: 3,
	locale: 'pt-br',
	pretty: true,
})

export const { client, environment } = bootstrapApplication()
export const config = new Configuration()
