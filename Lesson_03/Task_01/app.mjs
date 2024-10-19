// Задача 1. Розробити додаток з такими маршрутами:
// Маршрут Що повертає
// season - повертає пору року
// day - повертає поточний день
// time - повертає час дня (ранок, обід, вечеря)


import express from 'express'
import timeFinder from './TimeFinder.mjs'
const app = express()
const port = 3000



app.get('/season', (req, res) => {
    res.send({ season: timeFinder.getSeason() })
})

app.get('/day', (req, res) => {
    res.send({ day: timeFinder.getDayOfWeek() })
});

app.get('/time', (req, res) => {
    res.send({ time: timeFinder.getTimeOfDay() })
})


app.listen(port, () => {
    console.log(`Сервер працює на порту ${port}`)
})
