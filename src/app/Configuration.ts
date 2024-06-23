import * as fs from 'node:fs'
import * as path from 'node:path'
import type { User } from 'discord.js'
import { client } from '..'

export interface Configurations {
	readonly version: string
	readonly developer?: User
	readonly datasource: string
}

export class Configuration implements Configurations {
	private readonly _version = 'v0.0.1'
	private readonly _developerId = '1064162067919163485'
	private readonly _developer = client.users.cache.get(this._developerId)

	public get version() {
		return this._version
	}

	public get developerId() {
		return this._developerId
	}

	public get developer() {
		return this._developer
	}

	public get datasource() {
		const datasourceUrl = process.env.DATABASE_URL

		return datasourceUrl.includes('mongodb') ? 'MongoDB' : 'PostgreSQL'
	}
}
