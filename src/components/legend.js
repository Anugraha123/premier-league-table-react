import React from 'react';
import useStyles, {colors} from './table.styles';

const LegendSvg = ({color}) => {
	return (
		<svg width="3" height="16">
			<rect
				width="3"
				height="16"
				fill={color}
			/>
		</svg>
	)
}


export default () => {
	const classes = useStyles();

	return (
		<>
			<div className='legend-wrapper'>
				<p><b>Qualification/Relegation</b></p>

				<div>
					<LegendSvg color={colors.green} /> UEFA Champions League group stage
				</div>

				<div>
					<LegendSvg color={colors.red} /> Relegation
				</div>
			</div>

			<div className='legend-wrapper'>
				<p><b>Last Five Matches</b></p>

				<div>
					<span
						className={`${classes.lastFiveTag} w small`}
					>
						W
					</span> Win
				</div>

				<div>
					<span
						className={`${classes.lastFiveTag} d small`}
					>
						D
					</span> Drawn
				</div>

				<div>
					<span
						className={`${classes.lastFiveTag} l small`}
					>
						L
					</span> Lose
				</div>
			</div>
		</>
	)
}