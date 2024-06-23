import * as fs from 'node:fs'
import logger from 'might-log'
import { BundleError, hasError } from './utils/ErrorHandling'

const PROJECT_DIRECTORY = 'src/'
;(async () => {
	const environment = process.env.ENVIRONMENT ?? 'dev'
	logger.info(`Starting application bundle in ${environment} environment...`)

	logger.info('Gettering all application files...')
	const entries = fs.readdirSync(PROJECT_DIRECTORY, { recursive: true })
	const entrypoints = entries
		.map(entry => `./src/${entry}`)
		.filter(entry => fs.statSync(entry).isFile() && !entry.includes('.d.ts'))

	logger.info('Bundling application...')
	const output = await Bun.build({
		entrypoints,
		format: 'esm',
		minify: environment === 'prod',
		outdir: 'dist',
		target: 'node',
		root: 'src',
	})

	if (hasError(output)) {
		throw new BundleError(output)
	}

	return logger.success('Application bundling completed successfully!')
})()
