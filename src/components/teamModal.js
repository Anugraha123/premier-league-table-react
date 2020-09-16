import React from 'react';
import ReactDOM from 'react-dom';
import {createUseStyles} from 'react-jss'

const useStyles = createUseStyles({
	backdrop: {
		position: 'fixed',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		background: 'rgba(0, 0, 0, .8)',
		zIndex: 10,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},

	paper: {
		position: 'relative',
		height: '98vh',
		maxHeight: '100vh',
		maxWidth: '100vw',
		width: 900,
		backgroundColor: 'rgba(0,0,0,.8)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		color: '#fff',
		boxShadow: '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',

		'& .clear-icon': {
			position: 'absolute',
			right: 12,
			top: 12,
			cursor: 'pointer'
		},

		'& iframe': {
			border: 'none'
		},

		'& .banner': {
			height: 193,
			width: '100%',
			position: 'absolute',
			background: 'white',
			bottom: '3.5%',
			pointerEvents: 'none',
			touchAction: 'none'
		}
	}
})

export default ({team}) => {
	const [open, setOpen] = React.useState(true);
	const classes = useStyles();

	if (open) {
		return (
			<div
				className={classes.backdrop}
				onClick={() => {
					setOpen(false)
				}}
			>
				<div className={classes.paper}>
					<i
						className='clear-icon'
						onClick={() => {
							setOpen(false)
						}}
					>
						clear
					</i>

					<iframe
						id="if1"
						width="92%"
						height="92%"
						src={`https://www.premierleague.com/search?term=${team}`}
					/>
				</div>
			</div>
		)
	}

	return null;
}

export const loadComponent = (Component) => {
	return ReactDOM.render(
		React.createElement(Component),
		document.getElementById('glb-modal')
	);
};
