export type CellTypes = 'code' | 'text';

export interface Cell {
	id: string;
	category: CellTypes;
	content: string;
}
