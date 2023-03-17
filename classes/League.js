export default class League {
    constructor(name, teams, config = {}) {
        this.name = name
        this.setup(config)
        this.setupTeams(teams)
        this.matches = []
        this.matchDaySchedule = []
        this.scores = []
        this.teams.shuffle()
    }

    setup(config = {}) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }

    setupTeams(teams) {
        this.teams = []
        for (let team of teams) {
            let teamObj = this.customizeTeam(team)

            this.teams.push(teamObj)
        }
    }

    customizeTeam(team) {
        return {
            name: team,
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        }
    }

    createSchedule() {

        for (let i = 0; i < this.config.rounds; i++) {
            const round = this.createRound()

            if (i % 2 === 1) {
                this.swapTeams(round)
            }
            this.matchDaySchedule = this.matchDaySchedule.concat(round)
        }
    }


    swapTeams(round) {
        for (const matchesDay of round) {
            for (const match of matchesDay) {
                const localTeam = match.home
                match.home = match.away
                match.away = localTeam
            }
        }
    }

    createRound() {
        const round = []
        this.initSchedule(round)
        this.setLocalTeams(round)
        this.setAwayTeams(round)
        this.fixLastTeamAlwaysAway(round)
        return round
    }

    getNumberOfMatchDays() {
        if (this.teams.length % 2 === 0) {
            return this.teams.length - 1
        } else {
            return this.teams.length
        }
    }

    getTeamNamesForSchedule() {
        let teamNames = this.teams.map(team => team.name)
        if (this.teams.length % 2 === 1) {
            teamNames.push(null)
        }

        return teamNames
    }

    initSchedule(round) {

        let teamNames = this.getTeamNamesForSchedule()
        const numberOfMatchDays = this.getNumberOfMatchDays()
        const numberOfMatchesPerMatchDay = teamNames.length / 2

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchesDay = []
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = { home: "home", away: "away" }
                matchesDay.push(match)
            }

            round.push(matchesDay)
        }
    }

    setLocalTeams(round) {
        let teamNames = this.getTeamNamesForSchedule()
        let teamIndex = 0
        let teamIndexMaxValue = teamNames.length - 1 - 1

        round.forEach(matchesDay => {
            matchesDay.forEach(match => {
                match.home = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > teamIndexMaxValue) {
                    teamIndex = 0
                }
            })
        })
    }

    setAwayTeams(round) {
        let teamNames = this.getTeamNamesForSchedule()
        let teamIndexMaxValue = teamNames.length - 1 - 1
        let teamIndex = teamIndexMaxValue

        round.forEach(matchesDay => {
            matchesDay.forEach((match, indexMatch) => {
                if (indexMatch === 0) {
                    match.away = teamNames[teamNames.length - 1]
                } else {
                    match.away = teamNames[teamIndex]
                    teamIndex--
                }

                if (teamIndex < 0) {
                    teamIndex = teamIndexMaxValue
                }
            })
        })
    }

    fixLastTeamAlwaysAway(round) {
        round.forEach((matchesDay, indexMatchDay) => {
            matchesDay.forEach((match, matchIndex) => {
                if (matchIndex === 0 && indexMatchDay % 2 === 1) {
                    const homeTeam = match.home
                    match.home = match.away
                    match.away = homeTeam
                }
            })
        })
    }

    startSimulation() {
        this.summaries = []
        for (const matchesDay of this.matchDaySchedule) {
            const matchesDaySummaries = {
                results: [],
                standings: undefined
            }
            for (const match of matchesDay) {
                if (match.home === null || match.away === null) {
                    continue
                }
                const result = this.play(match)
                this.updateTeams(result)

                matchesDaySummaries.results.push(result)
            }
            this.summaries.push(matchesDaySummaries)
        }
    }

    play(match) {
        throw new Error("play method is not implemented in child class")
    }

    updateTeams(result) {
        throw new Error("updateTeams method is not implemented in child class")
    }
}



