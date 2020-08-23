import * as React from 'react';

type TableProps = {
	id: string,
	x: number,
	y: number,
	width: number,
	height: number,
}

/**
 * Renders single Table at specific position
 */
const Table: React.FC<TableProps> = ({ id, x, y, width, height }) => {
	const tableStyle = {
		left: x,
		top: y,
		width,
		height
	}
	return (
		<div className="rt-room" style={tableStyle}>
			<div className="rt-room-name">{id}</div>
		</div>
	);
};


export default Table;
