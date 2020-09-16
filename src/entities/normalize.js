let teamDefaultData = {
	won: 0,
	drawn: 0,
	lost: 0,
	goalFor: 0,
	goalAgainst: 0,
	goalDifference: 0,
	point: 0,
	notations: []
}

export default (self) => ({
	trimFC(str) {
		var clubName = str;
		var lastIndex = clubName.lastIndexOf(" ");
		clubName = clubName.substring(0, lastIndex);

		return clubName
	},

	// where data is normalized
	normalize: (data) => {
		const matchBoard = self.matchBoard(data.rounds);

		return self.distributePoints(matchBoard);
	},

	matchBoard: (rounds) => {
		const roundWithMatchTable = []

		rounds.forEach(({matches}) => {
			const matchTable = [];

			matches.forEach((match) => {


				matchTable.push({
					teamA: {
						name: self.trimFC(match.team1),
						score: match.score.ft[0]
					},
					teamB: {
						name: self.trimFC(match.team2),
						score: match.score.ft[1]
					}
				})
			})

			roundWithMatchTable.push(matchTable);
		})

		return roundWithMatchTable
	},

	// distributing points of each individual teams
	distributePoints: (rounds) => {
		const teams = {};

		rounds.forEach((matches) => {
			matches.forEach((match) => {
				let teamAScore = match.teamA.score;
				let teamBScore = match.teamB.score;
				let teamAName = match.teamA.name;
				let teamBName = match.teamB.name;
				const AWon = teamAScore - teamBScore > 0;
				const isDrawn = teamAScore - teamBScore === 0;

				// if not added add team on the list
				if (!teams[teamAName]) {
					teams[teamAName] = Object.assign({}, teamDefaultData)
				}

				if (!teams[teamBName]) {
					teams[teamBName] = Object.assign({}, teamDefaultData)
				}

				// if team A won
				if (AWon) {
					teams[teamAName].won = teams[teamAName].won + 1
					teams[teamBName].lost = teams[teamBName].lost + 1
					teams[teamAName].point = teams[teamAName].point + 3
					teams[teamAName].notations = [
						...teams[teamAName].notations,
						'W'
					]
					teams[teamBName].notations = [
						...teams[teamBName].notations,
						'L'
					]
				} else if (isDrawn) {
					// if drawn
					teams[teamAName].drawn = teams[teamAName].drawn + 1
					teams[teamBName].drawn = teams[teamBName].drawn + 1
					teams[teamAName].point = teams[teamAName].point + 1
					teams[teamBName].point = teams[teamBName].point + 1
					teams[teamAName].notations = [
						...teams[teamAName].notations,
						'D'
					]
					teams[teamBName].notations = [
						...teams[teamBName].notations,
						'D'
					]
				} else {
					// if team B won
					teams[teamAName].lost = teams[teamAName].lost + 1
					teams[teamBName].won = teams[teamBName].won + 1
					teams[teamBName].point = teams[teamBName].point + 3
					teams[teamAName].notations = [
						...teams[teamAName].notations,
						'L'
					]
					teams[teamBName].notations = [
						...teams[teamBName].notations,
						'W'
					]
				}

				// add for and against scores
				teams[teamAName].goalFor = teams[teamAName].goalFor + teamAScore
				teams[teamBName].goalFor = teams[teamBName].goalFor + teamBScore
				teams[teamAName].goalAgainst = teams[teamAName].goalAgainst + teamBScore
				teams[teamBName].goalAgainst = teams[teamBName].goalAgainst + teamAScore
				teams[teamAName].goalDifference = teams[teamAName].goalFor - teams[teamAName].goalAgainst
				teams[teamBName].goalDifference = teams[teamBName].goalFor - teams[teamBName].goalAgainst
			})
		})

		const sortedList = self.sortList({
			arr: Object.entries(teams).map((team) => {
				return {
					team: team[0],
					...team[1]
				}
			})
		});

		return sortedList.map((team, index) => ({
			...team,
			pos: index + 1
		}));
	}
})