import * as React from 'react';
import UserComponent from './User'
import { ITable } from './types';

type TableProps = ITable

/**
 * Renders single Table at specific position
 */
const Table: React.FC<TableProps> = ({ id, x, y, width, height, seats }) => {
	const tableStyle = {
		left: x,
		top: y,
		width,
		height
	}
	return (
		<div className="rt-room" style={tableStyle}>
			<div className="rt-room-name">{id}</div>
			{seats && seats?.map(({ x, y, user }, index) => <UserComponent key={user?.id || index} x={x} y={y} name={user?.name} avatar={user?.avatar} />)}
		</div>
	);
};


export default Table;
