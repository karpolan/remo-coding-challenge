import * as React from 'react';
import UserComponent from './User'
import { ITable, IUser, ISeat } from './types';

type TableProps = ITable & {
	users?: IUser[];
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	onDoubleClick?: React.MouseEventHandler<HTMLDivElement>;
}

/**
 * Renders single Table at specific position
 * Also renders Users on Seat
 */
const Table: React.FC<TableProps> = ({ id, x, y, width, height, seats, users, onClick, onDoubleClick }) => {
	const style = {
		left: x,
		top: y,
		width,
		height
	}
	return (
		<div className="rt-room" style={style} onClick={onClick} onDoubleClick={onDoubleClick}>
			<div className="rt-room-name">{id}</div>
			{users && users?.map((user: IUser, index) => {
				const { id, name, avatar, currentUser } = user;
				const seat: ISeat = (seats && seats[index]) || { x: 0, y: 0 };
				const { x, y } = seat;
				return <UserComponent key={id || index} x={x} y={y} name={name} avatar={avatar} currentUser={currentUser} />
			})}

			{/* {seats && seats?.map(({ x, y, userId }, index) => {
				return <UserComponent key={user?.id || index} x={x} y={y} name={user?.name} avatar={user?.avatar} currentUser={user?.currentUser} />
			})} */}


		</div>
	);
};


export default Table;
