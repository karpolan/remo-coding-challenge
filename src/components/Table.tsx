import * as React from 'react';
import UserComponent from './User'
import { ITable } from './types';

type TableProps = ITable & {
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Renders single Table at specific position
 * Also renders Users on Seat
 */
const Table: React.FC<TableProps> = ({ id, x, y, width, height, seats, onClick, onDoubleClick }) => {
	const style = {
		left: x,
		top: y,
		width,
		height
	}
	return (
		<div className="rt-room" style={style} onClick={onClick} onDoubleClick={onDoubleClick}>
			<div className="rt-room-name">{id}</div>
			{seats && seats?.map(({ x, y, user }, index) => <UserComponent key={user?.id || index} x={x} y={y} name={user?.name} avatar={user?.avatar} currentUser={user?.currentUser} />)}
		</div>
	);
};


export default Table;
