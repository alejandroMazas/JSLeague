class League {
    constructor(name, teams,) {
        this.name = name
        this.teams = teams
        this.rounds = rounds
        this.matches = []
        this.matchSchedule = []
        this.scores = []
    }
}

class FootbalLeague extends League {
    constructor(name, teams, rounds = 1, pointsPerWin = 3, pointsPerLose = 0, pointsPerDraw = 1) {
        super(name, teams, rounds)
        this.pointsPerWin = pointsPerWin
        this.pointsPerDraw = pointsPerDraw
        this.pointsPerLose = pointsPerLose

    }
}


class Team {
    constructor(teamName, wins, losses) {
        this.teamName = teamName
        this.wins = wins
        this.losses = losses
    }

}