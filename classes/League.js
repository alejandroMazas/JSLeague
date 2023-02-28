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
        this.initSchedule()
        this.setLocalTeams()
        this.setAwayTeams()
        this.fixLastTeamAlwaysAway()
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
            teamNames.push("Descanso")
        }

        return teamNames
    }

    initSchedule() {
        this.matchDaySchedule = []
        let teamNames = this.getTeamNamesForSchedule()
        const numberOfMatchDays = this.getNumberOfMatchDays()
        const numberOfMatchesPerMatchDay = teamNames.length / 2

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
        let teamNames = this.getTeamNamesForSchedule()
        let teamIndex = 0
        let teamIndexMaxValue = teamNames.length - 1 - 1

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
        let teamNames = this.getTeamNamesForSchedule()
        let teamIndexMaxValue = teamNames.length - 1 - 1
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
                    match.away = homeTeam
                }
            })
        })
    }
}

