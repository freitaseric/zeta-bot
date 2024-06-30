declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string
			NODE_ENV?: 'production' | 'development'
			DATABASE_URL: string
		}
	}
}

export type {}
