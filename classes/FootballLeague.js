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

    play(match) {
        const homeGoals = this.generateGoals()
        const awayGoals = this.generateGoals()
        return {
            homeTeamName: match.home,
            homeGoals,
            awayTeamName: match.away,
            awayGoals
        }
    }

    generateGoals(max = 10) {
        return Math.floor(Math.random() * max)
    }

    updateTeams(result) {
        console.log(result);
        const homeTeam = this.teams.find(team => team.name === result.homeTeamName)
        const awayTeam = this.teams.find(team => team.name === result.awayTeamName)

        homeTeam.goalsAgainst += result.awayGoals
        awayTeam.goalsFor += result.awayGoals

        if (result.homeGoals > result.awayGoals) {
            homeTeam.matchesWon++
            homeTeam.points += this.config.pointsPerWin
            awayTeam.points += this.config.pointsPerLose
        } else if (result.homeGoals < result.awayGoals) {
            awayTeam.matchesWon++
            awayTeam.points += this.config.pointsPerWin
            homeTeam.points += this.config.pointsPerLose
        } else {
            homeTeam.matchesDraw++
            awayTeam.matchesDraw++
            homeTeam.points += this.config.pointsPerDraw
            awayTeam.points += this.config.pointsPerDraw
        }
    }
}

