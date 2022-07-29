const express = require('express')
const router = express.Router()

const states = require('../database/states.json')
const mayoralties1 = require('../database/mayoralties1.json')
const mayoralties2 = require('../database/mayoralties02.json')
const neighborhoods1 = require('../database/neighborhoods01.json')
const neighborhoods2 = require('../database/neighborhoods02.json')

router.route('/states').get((_, res) => {
  try {
    res.send(states.features)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.route('/mayoralties/:id').get((req, res) => {
  try {
    const { id } = req.params
    
    const features = mayoralties1.features.concat(mayoralties2.features)
    const filter = features.filter(({ properties }) => properties.CVE_ENT === id)
    
    res.send(filter)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.route('/neighborhoods/:state').get((req, res) => {
  try {
    let { state } = req.params
    
    if (state === 'Ciudad de México') state = 'DISTRITOFEDERAL'
    
    const parseName = (name) => name.split(" ").join("").toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    
    const features = neighborhoods1.features.concat(neighborhoods2.features)
    const filter = features.filter(({ properties }) => parseName(properties.ST_NAME) === parseName(state))
    
    res.send(filter)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

const fs = require('fs');
router.route('/save').post((_, res) => {
  const coun = 29115
  const part1 = {
    features: neighborhoods.features.slice(0, coun)
  }
  const part2 = {
    features: neighborhoods.features.slice(coun + 1, coun*2)
  }

  const doc1 = JSON.stringify(part2)

  fs.writeFile('parte2.txt', doc1, function (err) {
    if (err) return console.log(err);
    console.log('Hello World > helloworld.txt');
  });

  res.send(neighborhoods.length)
})

module.exports = router