import ReactDOM from 'react-dom';
import React, { useState } from 'react';
import Preview from './components/preview/Preview';
import 'bulmaswatch/superhero/bulmaswatch.min.css';
import CodeEditor from './components/code_editor/code-editor';
import { bundler } from './bundler';

const App = () => {
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

ReactDOM.render(<App />, document.getElementById('root'));
