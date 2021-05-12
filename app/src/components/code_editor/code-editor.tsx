import React, { useRef } from 'react';
import './styles.css';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';

interface CodeEditorProps {
	initValue: string;
	onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initValue }) => {
	const editorRef = useRef<any>(null);

	const handleDidMount: EditorDidMount = (getValue, monacoEditor) => {
		editorRef.current = monacoEditor;

		monacoEditor.onDidChangeModelContent(() => {
			onChange(getValue());
		});
		monacoEditor.getModel()?.updateOptions({ tabSize: 2 });
	};

	const handleFormat = () => {
		const currFormat = editorRef.current.getModel().getValue();

		const currPrettier = prettier
			.format(currFormat, {
				parser: 'babel',
				plugins: [parser],
				useTabs: false,
				semi: true,
				singleQuote: true,
			})
			.replace(/\n$/, '');

		editorRef.current.setValue(currPrettier);
	};

	return (
		<div className="editor-wrapper">
			<button
				className="button button-format is-primary is-small"
				onClick={handleFormat}
			>
				Format
			</button>
			<MonacoEditor
				editorDidMount={handleDidMount}
				value={initValue}
				theme="dark"
				language="javascript"
				height="500px"
				options={{
					wordWrap: 'on',
					minimap: { enabled: false },
					showUnused: false,
					folding: false,
					lineNumbersMinChars: 3,
					fontSize: 16,
					scrollBeyondLastLine: false,
					automaticLayout: true,
				}}
			/>
		</div>
	);
};

export default CodeEditor;
