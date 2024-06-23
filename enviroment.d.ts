declare global {
	namespace NodeJS {
		interface ProcessEnv {
			BOT_TOKEN: string
			ENVIRONMENT?: 'prod' | 'dev'
			DATABASE_URL: string
		}
	}
}

export type {}
