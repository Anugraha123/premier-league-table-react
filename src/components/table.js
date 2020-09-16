import React from 'react';
import useStyles from './table.styles';
import Legend from './legend';

const handleShowTeamModal = (team) => {
	import('./teamModal').then((Modal) => {
		return Modal.loadComponent(
			() => <Modal.default team={team} />
		)
	})
}

export default ({renderTitle, columns, data, id, title, handleSort, handleSearch, defaultMode}) => {
	const [tableData, setTableData] = React.useState(data);
	const [sortMode, setSortMode] = React.useState(defaultMode);
	const [searchQuery, setSearchQuery] = React.useState('');
	const classes = useStyles();

	React.useEffect(() => {
		setTableData(data)
		setSortMode(defaultMode)
	}, [data])

	React.useEffect(() => {
		if (searchQuery) {
			let filteredData = data;
			filteredData = handleSearch({arr: filteredData, query: searchQuery})
			setTableData(filteredData);
		} else {
			setTableData(data);
		}
	}, [searchQuery, data])

	const handleSortToggle = (field) => () => {
		let sortedData = tableData
		let mode = sortMode === 'asc' ? 'desc' : 'asc'

		setSortMode(mode)

		sortedData = handleSort({
			arr: sortedData,
			by: field,
			mode
		})

		setTableData(sortedData)
	}

	return (
		<>
			<section className={classes.header}>
				{renderTitle && renderTitle()}

				<div className='searchbar'>
					<input
						type='text'
						value={searchQuery}
						placeholder='Search by name'
						onChange={(event) => setSearchQuery(event.target.value)}
					/>

					<i className='icon'>
						search
					</i>
				</div>
			</section>

			<section style={{overflow: 'auto'}}>
			<table className={`${classes.table} ${searchQuery ? '' : 'mode-' + sortMode}`}>
				<thead>
					<tr>
						{
							columns.map(({title, sort, field, define}, index) => {
								return (
									<th key={title+index} title={define}>
										{
											sort ? (
												<button
													onClick={handleSortToggle(field)}
												>
													<i>
														{sortMode === 'asc' ? 'arrow_upward' : 'arrow_downward'}
													</i>

													{title}
												</button>
											) : title
										}
									</th>
								)
							})
						}
					</tr>
				</thead>

				<tbody>
					{
						tableData.map(({
							team,
							pos,
							notations,
							won,
							drawn,
							lost,
							goalFor,
							goalAgainst,
							goalDifference,
							point
						}, index) => {
							return (
								<tr key={`tbody-${id}-${index}`}>
									<td>
										{pos}
									</td>

									<td className='team'>
										<button
											onClick={() => handleShowTeamModal(team)}
										>
											{team}
										</button>
									</td>

									<td>
										{notations.length}
									</td>

									<td>
										{won}
									</td>

									<td>
										{drawn}
									</td>

									<td>
										{lost}
									</td>

									<td>
										{goalFor}
									</td>

									<td>
										{goalAgainst}
									</td>

									<td>
										{goalDifference}
									</td>

									<td>
										<b>{point}</b>
									</td>

									<td>
										{notations.slice(Math.max(notations.length - 5, 1)).map((item, idx) => {
											return (
												<span
													key={`last-five-${index}-${idx}`}
													className={`${classes.lastFiveTag} ${item.toLowerCase()}`}
												>
													{item}
												</span>
											)
										})}
									</td>
								</tr>
							)
						})
					}
				</tbody>
			</table>
			</section>

			{(searchQuery && tableData.length === 0) &&
				<h1 className={classes.emptyTag}>No Result</h1>
			}

			<div className={classes.footer}>
				<Legend />
			</div>
		</>
	);
}
