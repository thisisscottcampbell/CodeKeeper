import React from 'react';
import './styles.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	if (direction === 'horizontal')
		resizableProps = {
			className: 'resize-horizontal',
			maxConstraints: [window.innerWidth * 0.95, Infinity],
			minConstraints: [window.innerWidth * 0.15, Infinity],
			height: Infinity,
			width: window.innerWidth * 0.75,
			resizeHandles: ['e'],
		};
	else
		resizableProps = {
			maxConstraints: [Infinity, window.innerHeight * 0.95],
			minConstraints: [Infinity, window.innerHeight * 0.15],
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
		};

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
