import React from 'react';
import {observer} from 'mobx-react';
import Container from './components/container';
import leagueStore from './entities/index';

const store = leagueStore.create({});

class ProvideEntities extends React.Component {
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

		return this.props.children(store);
	}
}

export default observer(ProvideEntities);
