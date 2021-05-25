import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import './styles.css';

const TextEditor: React.FC = () => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [editing, setEditing] = useState(false);

	useEffect(() => {
		const listener = (e: MouseEvent) => {
			if (ref.current && e.target && ref.current.contains(e.target as Node))
				return;
			setEditing(false);
		};
		document.addEventListener('click', listener, { capture: true });
		return () =>
			document.removeEventListener('click', listener, { capture: true });
	}, []);

	return editing ? (
		<div className="text-editor" ref={ref}>
			<MDEditor />
		</div>
	) : (
		<div className="text-editor" onClick={() => setEditing(true)}>
			<MDEditor.Markdown source={'# Header'} />
		</div>
	);
};

export default TextEditor;
