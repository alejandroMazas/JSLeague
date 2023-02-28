import teams from "./teams.js"

import FootbalLeague from "./classes/FootballLeague.js"

const miLiga = new FootbalLeague("ProfessionalLeague", teams)
console.log(miLiga.teams)

miLiga.createSchedule()
console.log(miLiga.matchDaySchedule)