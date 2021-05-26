import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../state';
import TextEditor from '../components/text_editor/TextEditor';
import 'bulmaswatch/superhero/bulmaswatch.min.css';

const App = () => {
	return (
		<Provider store={store}>
			<div>
				<TextEditor />
			</div>
		</Provider>
	);
};

export default App;
