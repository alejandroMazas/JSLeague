import teams from "./teams.js"

import FootbalLeague from "./classes/FootballLeague.js"

const miLiga = new FootbalLeague("ProfessionalLeague", teams, { rounds: 2 })
console.log(miLiga.teams)

miLiga.createSchedule()
console.log(miLiga.matchDaySchedule)