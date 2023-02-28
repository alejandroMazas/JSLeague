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

    createSchedule() {
        this.initSchedule()
        this.setLocalTeams()
        this.setAwayTeams()
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

    setLocalTeams() {
        let teamIndex = 0
        let teamIndexMaxValue = this.teams.length - 1 - 1

        let teamNames = this.teams.map(function (value) {
            return value.name
        })

        this.matchDaySchedule.forEach(matchesDay => {
            matchesDay.forEach(match => {
                match.home = teamNames[teamIndex]
                teamIndex++
                if (teamIndex > teamIndexMaxValue) {
                    teamIndex = 0
                }
            })
        })
    }

    setAwayTeams() {
        let teamNames = this.teams.map(team => team.name)
        let teamIndexMaxValue = this.teams.length - 1 - 1
        let teamIndex = teamIndexMaxValue

        this.matchDaySchedule.forEach(matchesDay => {
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

    fixLastTeamAlwaysAway() {
        this.matchDaySchedule.forEach((matchesDay, indexMatchDay) => {
            matchesDay.forEach((match, matchIndex) => {
                if (matchIndex === 0 && indexMatchDay % 2 === 1) {
                    const homeTeam = match.home
                    match.home = match.away
                    match.away = match.home
                }
            })
        })
    }
}

