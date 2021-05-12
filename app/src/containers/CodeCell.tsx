import React, { useState } from 'react';
import Preview from '../components/preview/Preview';
import CodeEditor from '../components/code_editor/CodeEditor';
import { bundler } from '../bundler/bundler';
import Resizable from '../components/resizable/Resizable';

const CodeCell = () => {
	const [inputCode, setInputCode] = useState('');
	const [displayCode, setDisplayCode] = useState('');

	const handleCodeSubmit = async (): Promise<any> => {
		const bundledCode = await bundler(inputCode);
		setDisplayCode(bundledCode);
		setInputCode('');
	};

	return (
		<Resizable direction="vertical">
			<div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
				<CodeEditor
					initValue="//your code here"
					onChange={(value) => setInputCode(value)}
				/>
				<Preview displayCode={displayCode} />
			</div>
		</Resizable>
	);
};

export default CodeCell;
