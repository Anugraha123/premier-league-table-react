import React from 'react';
import {observer} from 'mobx-react';
import Container from './components/container';
import Table from './components/table';
import store from './entities/index';

const columns = [
	{
		title: 'Pos', field: 'pos', define: 'Position'
	},
	{
		title: 'Team', field: 'team', define: 'Team name'
	},
	{
		title: 'Played', field: 'pld', define: 'Game played'
	},
	{
		title: 'Won', field: 'won', define: 'Won'
	},
	{
		title: 'Drawn', field: 'drawn', define: 'Drawn'
	},
	{
		title: 'Lost', field: 'lost', define: 'Lose'
	},
	{
		title: 'GF', field: 'gf', define: 'Goal for'
	},
	{
		title: 'GA', field: 'ga', define: 'Goal against'
	},
	{
		title: 'GD', field: 'gd', define: 'Goal difference'
	},
	{
		title: 'Points', field: 'point', sort: true, define: 'Total points'
	},
	{
		title: 'Last 5',
		field: 'lfive',
		define: 'Last five matches'
	},
]

class AppWrapper extends React.Component {
	state = {
		loading: true
	}

	async componentDidMount() {
		try {
			await store.fetchAndPopulate();
		} finally {
			this.setState({
				loading: false
			})
		}
	}

	render() {
		if (this.state.loading) {
			return <Container>Loading . . .</Container>
		}

		return this.props.children;
	}
}

export default observer(() => {
	const [currentSeason, setCurrentSeason] = React.useState(store.results.length);

	const handleChange = (event) => {
		setCurrentSeason(event.target.value)
	}

	return (
		<AppWrapper>
			<Container>
				<Table
					id='premier-league'
					columns={columns}
					data={store.results[currentSeason]}
					title={store.seasonNames[currentSeason]}
					defaultMode={'desc'}
					handleSort={store.sortList}
					handleSearch={store.searchList}
					renderTitle={() => {
						return (
							<select
								onChange={handleChange}
							>
								{
									store.seasonNames.map((season, index) => {
										return <option key={'season-select-'+index} value={index}>{season}</option>
									})
								}
							</select>
						)
					}}
				/>
			</Container>
		</AppWrapper>
	)
});
