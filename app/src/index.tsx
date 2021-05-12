import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code-editor';

const App = () => {
	const service = useRef<any>(null);
	const iframe = useRef<any>(null);
	const [input, setInput] = useState('');

	const handleClick = async (): Promise<any> => {
		setInput('');

		if (!service.current) return;

		iframe.current.srcdoc = html;

		const res = await service.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});

		iframe.current.contentWindow.postMessage(res.outputFiles[0].text, '*');
	};

	const startService = async (): Promise<any> => {
		service.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	const html = `
		<html>
			<head></head>
			<body>
				<div id="root"></div>
				<script>
					window.addEventListener('message', e => {
						try {
							eval(e.data);
						} catch (err) {
							const root = document.querySelector('#root');
							root.innerHTML = '<div style="color: red"><h4>Runtime Error:</h4>' + err + '</div>'
							console.err(err);s
						}
					},false)
				</script>
			</body>
		</html>
	`;

	return (
		<div>
			<CodeEditor />
			<textarea
				value={input}
				onChange={(e) => setInput(e.target.value)}
			></textarea>
			<div>
				<button onClick={handleClick}>Submit</button>
			</div>
			<iframe
				title="preview"
				ref={iframe}
				sandbox="allow-scripts"
				srcDoc={html}
			/>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
