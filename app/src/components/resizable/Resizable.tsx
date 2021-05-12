import React from 'react';
import './styles.css';
import { ResizableBox } from 'react-resizable';

interface ResizeableProps {
	direction: 'horizontal' | 'vertical';
}

const Resizable: React.FC<ResizeableProps> = ({ direction, children }) => {
	return (
		<ResizableBox height={300} width={Infinity} resizeHandles={['s']}>
			{children}
		</ResizableBox>
	);
};

export default Resizable;
