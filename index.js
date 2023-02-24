class League {
    constructor(name, teams, config = {}) {
        this.name = name
        this.teams = teams

        this.setup(config)
        this.matches = []
        this.matchSchedule = []
        this.scores = []
    }

    setup(config = {}) {
        const defaultConfig = { rounds: 1 }
        this.config = Object.assign(defaultConfig, config)
    }
}

class FootbalLeague extends League {
    constructor(name, teams, config) {
        super(name, teams, rounds)
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
}


class Team {
    constructor(teamName, wins, losses) {
        this.teamName = teamName
        this.wins = wins
        this.losses = losses
    }

}

