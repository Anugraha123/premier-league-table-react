import React from 'react';
import Container from './components/container';
import Table from './components/table';
import ProvideEntities from './provideEntities';

export default () => (
	<ProvideEntities>
		{(store) => (
			<Container>
				<Table
					id='premier-league'
					columns={store.columnsMap}
					data={store.results[store.currentSeason]}
					title={store.seasonNames[store.currentSeason]}
					defaultMode={'desc'}
					handleSort={store.sortList}
					handleSearch={store.searchList}
					renderTitle={() => (
						<select
							onChange={(event) => store.setCurrentSeason(event?.target.value)}
						>
							{
								store.seasonNames.map((season, index) => {
									return <option key={'season-select-'+index} value={index}>{season}</option>
								})
							}
						</select>
					)}
				/>
			</Container>
		)}
	</ProvideEntities>
)

