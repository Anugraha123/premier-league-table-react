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
		return self.distributePoints(data.rounds);
	},

	// distributing points of each individual teams
	distributePoints: (rounds) => {
		let teams = {}

		rounds.forEach(({matches}) => {
			matches.forEach((match) => {
				let teamAScore = +match.score.ft[0];
				let teamBScore = +match.score.ft[1];
				let teamAName = self.trimFC(match.team1);
				let teamBName = self.trimFC(match.team2);
				const AWon = teamAScore > teamBScore;
				const BWon = teamBScore > teamAScore;
				const isDrawn = teamAScore === teamBScore;

				if (!teams[teamAName]) {
					teams[teamAName] = {...teamDefaultData}
				}

				if (!teams[teamBName]) {
					teams[teamBName] = {...teamDefaultData}
				}

				if (AWon) {
					teams[teamAName].won++;
					teams[teamAName].point += 3;
					teams[teamBName].lost++;

					teams[teamAName].notations = teams[teamAName].notations.concat('W')
					teams[teamBName].notations = teams[teamBName].notations.concat('L')
				}

				if (BWon) {
					teams[teamBName].won++;
					teams[teamBName].point += 3;
					teams[teamAName].lost++;

					teams[teamBName].notations = teams[teamBName].notations.concat('W')
					teams[teamAName].notations = teams[teamAName].notations.concat('L')
				}

				if (isDrawn) {
					teams[teamBName].drawn++;
					teams[teamAName].drawn++;
					teams[teamAName].point += 1;
					teams[teamBName].point += 1;

					teams[teamBName].notations = teams[teamBName].notations.concat('D')
					teams[teamAName].notations = teams[teamAName].notations.concat('D')
				}

				teams[teamAName].goalFor += teamAScore
				teams[teamBName].goalFor += teamBScore
				teams[teamAName].goalAgainst += teamBScore
				teams[teamBName].goalAgainst += teamAScore
				teams[teamAName].goalDifference = teams[teamAName].goalFor - teams[teamAName].goalAgainst
				teams[teamBName].goalDifference = teams[teamBName].goalFor - teams[teamBName].goalAgainst
			})
		})

		// sort it desc
		const sortedList = self.sortList({
			arr: Object.entries(teams).map((team) => {
				return {
					team: team[0],
					...team[1]
				}
			})
		});

		// add position and return
		return sortedList.map((team, index) => ({
			...team,
			pos: index + 1
		}));
	}
})