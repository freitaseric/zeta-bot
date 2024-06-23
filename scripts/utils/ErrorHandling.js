import * as path from 'node:path'

export const hasError = output => {
	for (const log of output.logs) {
		if (log.level === 'error') return true
	}

	return false
}

export class BundleError extends Error {
	constructor(output) {
		super()
		this.name = 'BuildError'
		this.message = 'The application bundle could not be executed.'
		this.stack = path.resolve('./scripts/bundle.js')
		this.cause = this._getErrors(output.logs)
	}

	_getErrors(logs) {
		return logs.filter(log => log.level === 'error')
	}
}
