import React from 'react';
import ReactDOM from 'react-dom';
import useStyles from './teamModal.styles';

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
