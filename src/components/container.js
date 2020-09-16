import React from 'react';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
	root: {
		width: '100%',
		margin: '0 auto',
		backgroundColor: '#fff',
		height: '100vh',
		overflow: 'auto',
		display: 'grid',
		'grid-template-rows': 'auto 1fr auto',
		overflow: 'hidden',

		'@media (min-width: 1024px)': {
			'&': {
				width: 1024,
				height: '100vh',
				boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)'
			}
		}
	}
})

export default ({children}) => {
	const classes = useStyles()

	return (
		<div className={classes.root}>{children}</div>
	);
};
