import {createUseStyles} from 'react-jss'

export const colors = {
	green: '#2a8e45',
	red: '#ea4335',
	lightgrey: '#d0d6d5',
	darkorange: '#fa7b17'
}

const qualificationAndRelegationStyles = {
	content: '""',
	height: '100%',
	width: 4,
	position: 'absolute',
	left: 0,
	top: 0
}

const useStyles = createUseStyles({
	tableWrapper: {
		overflow: 'auto'
	},

	table: {
		width: '100%',
		border: 'none',
		borderCollapse: 'collapse',
		backgroundColor: '#fff',
		position: 'relative',

		'&.mode-desc tbody': {
			'& tr:nth-child(-n+4)': {
				'& td:first-child': {
					position: 'relative',

					'&::after': {
						...qualificationAndRelegationStyles,
						backgroundColor: colors.green
					}
				}
			},

			'& tr:nth-last-child(-n+3)': {
				'& td:first-child': {
					position: 'relative',

					'&::after': {
						...qualificationAndRelegationStyles,
						backgroundColor: colors.red
					}
				}
			}
		},

		'&.mode-asc tbody': {
			'& tr:nth-child(-n+3)': {
				'& td:first-child': {
					position: 'relative',

					'&::after': {
						...qualificationAndRelegationStyles,
						backgroundColor: colors.red
					}
				}
			},

			'& tr:nth-last-child(-n+4)': {
				'& td:first-child': {
					position: 'relative',

					'&::after': {
						...qualificationAndRelegationStyles,
						backgroundColor: colors.green
					}
				}
			}
		},

		'& tr:last-child': {
			'& td': {
				borderBottom: 0,
			},
		},

		'& td, & th': {
			padding: '10px 0',
			borderBottom: '1px solid #f1eded',

			'&:not(:nth-child(2))': {
				textAlign: 'center'
			},

			'& button': {
				backgroundColor: 'transparent',
				border: 'none',
				outline: 'none',
				cursor: 'pointer',
				display: 'inline-flex',
				alignItems: 'center',

				'& i': {
					fontSize: 18,
					marginRight: 2
				}
			}
		},

		'& td': {
			'& button': {
				textDecoration: 'underline'
			}
		},

		'& th': {
			backgroundColor: '#d0d6d5',
			backgroundColor: '#d0d6d5',
			position: 'sticky',
			zIndex: 1,
			top: 0,
			fontWeight: 400,

			'& button': {
				fontWeight: 700,
			}
		}
	},

	header: {
		height: 86,
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#3f1052',
		padding: '0 10px',
		color: '#fff',

		'& input, & select': {
			outline: 'none'
		},

		'& select': {
			padding: 6,
			fontSize: 18,
			fontWeight: 700
		},

		'& .searchbar': {
			display: 'flex',
			alignItems: 'center',

			'& input': {
				height: 30,
				padding: '0 6px'
			},

			'& i': {
				marginLeft: 4
			}
		}
	},

	footer: {
		height: 'auto',
		padding: '12px',
		borderTop: '1px solid #f1eded',
		display: 'flex',

		'& .legend-wrapper': {
			fontSize: 12,
			marginRight: 42,

			'& p': {
				marginBottom: 2
			},

			'& > *': {
				display: 'flex',
				alignItems: 'center',

				'& > *': {
					margin: 4
				}
			}
		}
	},

	lastFiveTag: {
		height: 18,
		width: 18,
		fontSize: 10,
		display: 'inline-flex',
		alignItems: 'center',
		justifyContent: 'center',
		fontWeight: 600,
		marginRight: 2,

		'&.w': {
			backgroundColor: colors.green,
			color: '#fff'
		},

		'&.d': {
			backgroundColor: colors.lightgrey,
		},

		'&.l': {
			backgroundColor: colors.red,
			color: '#fff'
		},

		'&.small': {
			height: 14,
			width: 14,
			fontSize: 9
		}
	},

	emptyTag: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%)'
	}
})

export default useStyles;
