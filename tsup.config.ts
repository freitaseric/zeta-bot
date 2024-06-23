import { defineConfig } from 'tsup'

export default defineConfig({
	entry: ['src/**'],
	bundle: false,
	format: ['cjs'],
	clean: true,
})
