import * as esbuild from 'esbuild-wasm';
import axios from 'axios';
import localForage from 'localforage';

const cache = localForage.createInstance({
	name: 'cache',
});

export const fetchPlugin = (clientInput: string) => {
	return {
		name: 'fetch-plugin',
		setup(build: esbuild.PluginBuild) {
			//
			build.onLoad({ filter: /(^index\.js$)/ }, () => {
				return {
					loader: 'jsx',
					contents: clientInput,
				};
			});

			build.onLoad({ filter: /.css$/ }, async (args: any) => {
				const inCache = await cache.getItem<esbuild.OnLoadResult>(args.path);

				if (inCache) return inCache;

				const { data, request } = await axios.get(args.path);

				const escaped = data
					.replace(/\n/g, '')
					.replace(/"/g, '\\"')
					.replace(/'/g, "\\'");

				const contents = `
            const style = document.createElement('style');
            style.innerText = '${escaped}';
            document.head.appendChild(style); 
          `;

				const result: esbuild.OnLoadResult = {
					loader: 'jsx',
					contents,
					resolveDir: new URL('./', request.responseURL).pathname,
				};

				await cache.setItem(args.path, result);

				return result;
			});

			build.onLoad({ filter: /.*/ }, async (args: any) => {
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
