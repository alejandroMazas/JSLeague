import League from "./League.js"
export default class FootbalLeague extends League {
    constructor(name, teams, config) {
        super(name, teams, config)
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

