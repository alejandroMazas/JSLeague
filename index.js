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
console.log(miLiga.teams)
