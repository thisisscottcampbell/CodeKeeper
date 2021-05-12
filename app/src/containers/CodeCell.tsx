import React, { useState } from 'react';
import Preview from '../components/preview/Preview';
import CodeEditor from '../components/code_editor/CodeEditor';
import { bundler } from '../bundler/bundler';

const CodeCell = () => {
	const [inputCode, setInputCode] = useState('');
	const [displayCode, setDisplayCode] = useState('');

	const handleCodeSubmit = async (): Promise<any> => {
		const bundledCode = await bundler(inputCode);
		setDisplayCode(bundledCode);
		setInputCode('');
	};

	return (
		<div>
			<CodeEditor
				initValue="//your code here"
				onChange={(value) => setInputCode(value)}
			/>
			<div>
				<button onClick={handleCodeSubmit}>Submit</button>
			</div>
			<Preview displayCode={displayCode} />
		</div>
	);
};

export default CodeCell;
