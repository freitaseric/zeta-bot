import {
	bootstrapApplication,
	bootstrapDatabase,
	bootstrapLogger,
} from './bootstrap'

export const logger = bootstrapLogger()
// export const db = bootstrapDatabase()
export const client = bootstrapApplication()
