import {types} from 'mobx-state-tree';
import normalize from './normalize';
import sort from './sort';

export const Model = types
	.model('LeagueModel', {
		results: types.array(types.frozen()),
		raw: types.array(types.frozen()),
		currentSeason: 0
	})
	.actions(sort)
	.actions(normalize)
	.actions((self) => ({
		fetchAndPopulate: async () => {
			let response

			try {
				response = await fetch(self.endpoint);

				if (!response.ok) {
					throw new Error("HTTP error " + response.status);
				} else {
					response = await response.json();
					await self.populate(response);
					self.setRaw(response);
					self.setCurrentSeason(response.length - 1)
				}
			} catch (error) {
				console.error('error while fetching', error)
			}

			return self.results
		},

		setCurrentSeason(value = 0) {
			self.currentSeason = +value;
		},

		setRaw(data) {
			self.raw = data;
		},

		populate: async (list) => {
			list.map((data) => {
				const normalizedData = self.normalize(data);

				self.results.push(normalizedData)
			})
		}
	}))
	.views((self) => ({
		get seasonNames() {
			return self.raw.map((data) => data.name).reverse()
		},

		get columnsMap() {
			return  [
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
					title: 'Form', field: 'lfive', define: 'Last five matches'
				},
			]
		},

		get endpoint() {
			return 'http://localhost:8080/premier-league'
		}
	}))

export default Model;
