import { PrismaClient } from '@prisma/client'

export class Database {
	private readonly client = new PrismaClient()

	public get users() {
		return this.client.user
	}

	public get banks() {
		return this.client.bank
	}
}
