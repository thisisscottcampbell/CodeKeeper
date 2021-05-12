import React from 'react';
import './styles.css';
import { ResizableBox } from 'react-resizable';

interface ResizeableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
	return (
		<ResizableBox
			maxConstraints={[Infinity, window.innerHeight * 0.95]}
			minConstraints={[Infinity, window.innerHeight * 0.15]}
			height={300}
			width={Infinity}
			resizeHandles={['s']}
		>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
