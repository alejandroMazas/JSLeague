import teams from "./teams.js"

import FootbalLeague from "./classes/FootballLeague.js"

const miLiga = new FootbalLeague("ProfessionalLeague", teams, { rounds: 3 })
console.log(miLiga.teams)

miLiga.createSchedule()
miLiga.matchDaySchedule.forEach((matchesDay, matchesDayIndex) => {
    console.log(`Jornada ${matchesDayIndex + 1}`)
    matchesDay.forEach((match) => {
        console.log(`${match.home} vs ${match.away}`)
    })
    console.log("----------------------------------------")
})
