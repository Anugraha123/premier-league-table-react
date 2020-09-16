import {types} from 'mobx-state-tree';
import normalize from './normalize';
import sort from './sort';

const endpoint = 'http://localhost:8080/premier-league'

export const Model = types
	.model('LeagueModel', {
		results: types.array(types.frozen()),
		raw: types.array(types.frozen())
	})
	.actions(sort)
	.actions(normalize)
	.actions((self) => ({
		fetchAndPopulate: async () => {
			let response

			try {
				response = await fetch(endpoint);

				if (!response.ok) {
					throw new Error("HTTP error " + response.status);
				} else {
					response = await response.json();
					self.populate(response);
					self.setRaw(response);
				}
			} catch (error) {
				console.error('error while fetching', error)
			}

			return self.results
		},

		setRaw(data) {
			self.raw = data;
		},

		setResults(data) {
			self.results = data;
		},

		populate: (list) => {
			list.map((data) => {
				const normalizedData = self.normalize(data);

				self.setResults([
					normalizedData,
					...self.results
				]);
			})

			return self.results;
		}
	}))
	.views((self) => ({
		get seasonNames() {
			return self.raw.map((data) => data.name).reverse()
		}
	}))

export default Model.create({});
