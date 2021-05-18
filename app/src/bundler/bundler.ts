import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';

let service: esbuild.Service;

export const bundler = async (userInput: string) => {
	if (!service)
		service = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	try {
		const res = await service.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(userInput)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		return { code: res.outputFiles[0].text, error: '' };
	} catch (err) {
		return { code: '', error: err.message };
	}
};
