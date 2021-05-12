import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import Preview from './components/preview/Preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import * as esbuild from 'esbuild-wasm';
import { unpkgPathPlugin } from './plugins/unpkg-path-plugin';
import { fetchPlugin } from './plugins/fetch-plugin';
import CodeEditor from './components/code_editor/code-editor';

const App = () => {
	const isService = useRef<any>(null);

	const [input, setInput] = useState('');
	const [userCode, setUserCode] = useState('');

	const startService = async (): Promise<any> => {
		isService.current = await esbuild.startService({
			worker: true,
			wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm',
		});
	};

	const handleCodeSubmit = async (): Promise<any> => {
		setInput('');

		if (!isService.current) return;

		const res = await isService.current.build({
			entryPoints: ['index.js'],
			bundle: true,
			write: false,
			plugins: [unpkgPathPlugin(), fetchPlugin(input)],
			define: {
				'process.env.NODE_ENV': '"production"',
				global: 'window',
			},
		});
		setUserCode(res.outputFiles[0].text);
	};

	useEffect(() => {
		startService();
	}, []);

	return (
		<div>
			<CodeEditor
				initValue="//your code here"
				onChange={(value) => setInput(value)}
			/>
			<div>
				<button onClick={handleCodeSubmit}>Submit</button>
			</div>
			<Preview userCode={userCode} />
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
