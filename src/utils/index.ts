import * as os from 'node:os'

export * from './PresenceUpdater'
export * from './Math'
export * from './discord'

export function getRuntimeEnvironment() {
	return {
		name: process.isBun ? 'Bun' : 'Node',
		version: process.isBun ? process.versions.bun : process.versions.node,
	}
}

export function getOSEnvironment() {
	return {
		name: os.type,
		arch: os.machine,
		kernel: os.release,
	}
}
