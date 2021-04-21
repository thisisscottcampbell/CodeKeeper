import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const cache = localForage.createInstance({
	name: 'cache',
});

export const unpkgPathPlugin = (clientInput: string) => {
	return {
		name: 'unpkg-path-plugin',
		setup(build: esbuild.PluginBuild) {
			//handle root entry file of index.js
			build.onResolve({ filter: /(^index\.js$)/ }, () => {
				return { path: 'index.js', namespace: 'a' };
			});

			//handle relative paths in a module
			build.onResolve({ filter: /^\.+\// }, (args: any) => {
				return {
					namespace: 'a',
					path: new URL(args.path, 'https://unpkg.com' + args.resolveDir + '/')
						.href,
				};
			});

			//handle main file of a module
			build.onResolve({ filter: /.*/ }, async (args: any) => {
				return { namespace: 'a', path: `https://unpkg.com/${args.path}` };
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
				console.log('onLoad', args);

				if (args.path === 'index.js') {
					return {
						loader: 'jsx',
						contents: clientInput,
					};
				}

				const inCache = await cache.getItem<esbuild.OnLoadResult>(args.path);

				if (inCache) return inCache;

				const { data, request } = await axios.get(args.path);

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents: data,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				await cache.setItem(args.path, result);

				return result;
			});
		},
	};
};
