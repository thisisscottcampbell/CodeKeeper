import React, { useState, useEffect } from 'react';
import Preview from '../components/preview/Preview';
import CodeEditor from '../components/code_editor/CodeEditor';
import { bundler } from '../bundler/bundler';
import Resizable from '../components/resizable/Resizable';

const CodeCell = () => {
	const [code, setCode] = useState('');
	const [input, setInput] = useState('');

	useEffect(() => {
		const timer = setTimeout(async () => {
			const output = await bundler(input);
			setCode(output);
		}, 1000);
		return () => clearTimeout(timer);
	}, [input]);

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<Resizable direction="horizontal">
					<CodeEditor
						initValue="//your code here"
						onChange={(value) => setInput(value)}
					/>
				</Resizable>
				<Preview code={code} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
