const teams = [
    "Duke",
    "Shelly",
    "Caleb",
    "Lo Wang"
]

class League {
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
            let teamObj = this.customizeTeam(teams)
            let teamObj = {
                name: team,
                matchesWon: 0,
                matchesDraw: 0,
                matchesLost: 0
            }
            this.teams.push(teamObj)
        }
    }

    customizeTeam(teams) {
        return {
            name: team,
            matchesWon: 0,
            matchesDraw: 0,
            matchesLost: 0
        }
    }

}

class FootbalLeague extends League {
    constructor(name, teams, config) {
        super(name, teams,)
    }

    setup(config = {}) {
        const defaultConfig = {
            rounds: 1,
            pointsPerWin: 3,
            pointsPerDraw: 1,
            pointsPerLose: 0
        }

        this.config = Object.assign(defaultConfig, config)
    }

    customizeTeam(teamName) {
        const teamObj = super.customizeTeam(teamName)

        return {
            ...teamObj,
            points: 0,
            goalsFor: 0,
            goalsAgainst: 0
        }
    }
}

const miLiga = new FootbalLeague("ProfessionalLeague", teams)
console.log(miLiga.teams)

