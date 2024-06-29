import { client } from '..'

// biome-ignore lint/complexity/noStaticOnlyClass: this class is necessary
export class Config {
	static readonly version = 'v0.0.1'
	static readonly developerId = '1064162067919163485'
	static readonly developer = 'oDevEric'
	static isProduction() {
		return process.env.ENVIRONMENT === 'prod'
	}
}
