import teams from "./teams.js"

import FootbalLeague from "./classes/FootballLeague.js"

const miLiga = new FootbalLeague("ProfessionalLeague", teams, { rounds: 1 })

miLiga.createSchedule()
miLiga.matchDaySchedule.forEach((matchesDay, matchesDayIndex) => {
    console.log(`Jornada ${matchesDayIndex + 1}`)
    matchesDay.forEach(match => {
        if (match.home === null || match.away === null) {
            const waitingTeam = match.home || match.away
            console.log(`${waitingTeam} Descansa`)
        } else console.log(`${match.home} vs ${match.away}`)
    })
    console.log("----------------------------------------")
})
miLiga.startSimulation()

miLiga.summaries.forEach((summary, matchesDayIndex) => {
    console.log(`Jornada ${matchesDayIndex + 1}`)
    summary.results.forEach(result => {
        console.log(`${result.homeTeamName} ${result.homeGoals} - ${result.awayTeamName} ${result.awayGoals}`)
        console.log("")
    })
})
console.table(miLiga.teams)

const totalGoals = miLiga.teams.reduce((acc, current) => {
    acc += current.goalsFor
    return acc
}, 0)
console.log(`Se han marcado ${totalGoals} goles a favor en total`)

const totalPoints = miLiga.teams.reduce((acc, current) => {
    acc += current.points
    return acc
}, 0)
console.log(`Se han ganado ${totalGoals} puntos en total`)


const metricsObj = {
    goalsFor: 0,
    points: 0,
    diffGoals: 0
}

const metrics = miLiga.teams.reduce((acc, current) => {
    metricsObj.goalsFor += current.goalsFor
    metricsObj.points += current.points
    metricsObj.diffGoals += (current.goalsFor - current.goalsAgainst)
    return metricsObj
}, metricsObj)

console.log(metrics)