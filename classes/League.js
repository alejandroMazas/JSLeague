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

}