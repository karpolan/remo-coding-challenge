import * as React from 'react';
import { DEFAULT_AVATAR } from '../utils/consts';

interface IUserProps {
	x: number;
	y: number;
	name?: string;
	avatar?: string;
}

/**
 * Renders single User at specific position.
 * Don't render user without name
 */
const User: React.FC<IUserProps> = ({ x, y, name, avatar }) => {
	if (!name) return null; // Don't render non-existing users

	const style = {
		left: x,
		top: y,
	}
	return (
		<div className='rt-user' style={style}>
			<div className='avatar'><img src={avatar || DEFAULT_AVATAR} title={name} alt={name} /></div>
			{avatar ? null : <div className='title'>{name}</div>}
		</div>
	);
};


export default User;
