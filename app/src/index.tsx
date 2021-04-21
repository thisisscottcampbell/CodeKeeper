import ReactDOM from 'react-dom';
import React, { useState, useEffect, useRef } from 'react';
import * as esbuild from 'esbuild-wasm';

const App = () => {
	const service = useRef<any>(null);

	const [input, setInput] = useState('');
	const [code, setCode] = useState('');

	const handleClick = async (): Promise<any> => {
		setInput('');

		if (!service.current) return;

		const res = await service.current.transform(input, {
			loader: 'jsx',
			target: 'es2015',
		});

		setCode(res.code);
	};

	const startService = async (): Promise<any> => {
		service.current = await esbuild.startService({
			worker: true,
			wasmURL: '/esbuild.wasm',
		});
	};

	useEffect(() => {
		startService();
	}, []);

	return (
		<div>
			<textarea
				value={input}
				onChange={(e) => setInput(e.target.value)}
			></textarea>
			<div>
				<button onClick={handleClick}>Submit</button>
			</div>
			<pre>{code}</pre>
		</div>
	);
};

ReactDOM.render(<App />, document.getElementById('root'));
