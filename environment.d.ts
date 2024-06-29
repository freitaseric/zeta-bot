declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string
			NODE_ENV?: 'prod' | 'dev'
			DATABASE_URL: string
		}
	}
}

export type {}
