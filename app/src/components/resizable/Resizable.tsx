import React, { useEffect, useState } from 'react';
import './styles.css';
import { ResizableBox, ResizableBoxProps } from 'react-resizable';

interface ResizeableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
	let resizableProps: ResizableBoxProps;

	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	if (direction === 'horizontal')
		resizableProps = {
			className: 'resize-horizontal',
			maxConstraints: [innerWidth * 0.95, Infinity],
			minConstraints: [innerWidth * 0.15, Infinity],
			height: Infinity,
			width: innerWidth * 0.75,
			resizeHandles: ['e'],
		};
	else
		resizableProps = {
			maxConstraints: [Infinity, innerHeight * 0.95],
			minConstraints: [Infinity, innerHeight * 0.15],
			height: 300,
			width: Infinity,
			resizeHandles: ['s'],
		};

	useEffect(() => {
		let timer: any;

		const listener = () => {
			if (timer) clearTimeout(timer);
			timer = setTimeout(() => {
				setInnerHeight(window.innerHeight);
				setInnerWidth(window.innerWidth);
			}, 100);
		};
		window.addEventListener('resize', listener);

		return () => window.removeEventListener('resize', listener);
	}, []);

	return <ResizableBox {...resizableProps}>{children}</ResizableBox>;
};

export default Resizable;
