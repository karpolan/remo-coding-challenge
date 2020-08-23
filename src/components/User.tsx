import * as React from 'react';
import { DEFAULT_AVATAR } from './consts';


interface IUserProps {
	x: number;
	y: number;
	name?: string;
	avatar?: string;
	index?: number;
}

/**
 * Renders single User at specific position
 */
const User: React.FC<IUserProps> = ({ x, y, name, avatar, index }) => {
	if (!name) return null; // Don't render non-existing users

	const style = {
		left: x,
		top: y,
	}
	return (
		<div className='rt-user' style={style}>
			<div className='avatar'><img src={avatar || DEFAULT_AVATAR} title={name} /></div>
			<div className='title'>{name}</div>
		</div>
	);
};


export default User;
