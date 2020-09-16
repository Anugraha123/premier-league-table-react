export default () => ({
	sortList: ({
		arr,
		by = 'point',
		mode = 'desc'
	}) => {
		let data = arr.slice();

		if (mode === 'asc') {
			data.sort((a, b) => a[by] - b[by]);
		} else {
			data.sort((a, b) => b[by] - a[by]);
		}


		return data;
	},

	searchList: ({arr, query = '', by = 'team'}) => {
		const regexpQuery = new RegExp(`${query.toLowerCase()}`)

		return arr.filter((item) => {
			return regexpQuery.test((item[by]).toLowerCase());
		})
	}
})