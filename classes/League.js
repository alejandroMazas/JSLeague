export default class League {
    constructor(name, teams, config = {}) {
        this.name = name
        this.setup(config)
        this.setupTeams(teams)
        this.matches = []
        this.matchSchedule = []
        this.scores = []
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

    initSchedule() {
        this.matchDaySchedule = []
        const numberOfMatchDays = this.teams.length - 1
        const numberOfMatchesPerMatchDay = this.teams.length / 2

        for (let i = 0; i < numberOfMatchDays; i++) {
            const matchesDay = []
            for (let j = 0; j < numberOfMatchesPerMatchDay; j++) {
                const match = { home: "home", away: "away" }
                matchesDay.push(match)
            }

            this.matchDaySchedule.push(matchesDay)
        }
    }

}