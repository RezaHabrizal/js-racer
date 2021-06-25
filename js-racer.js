"use strict"
const track = +process.argv[3]
const players = +process.argv[2]

function diceRoll (num, obs) {
  if (obs) return Math.ceil(Math.random() * num)
  return Math.floor(Math.random() * num)
}

function sleep (milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}

function play(players, track) {
  if (players < 2) {
    console.log('Cannot run if players less than 2')
    return
  }
  if (track < 15) {
    console.log('minimum set of this track is 15')
    return
  }

  let racers = []
  let playerName = 'abcdefghijklmnopqrstuvwxyz'
  for (let i = 0 ; i < players ; i++) {
    racers.push({
      name: playerName[i],
      position: 0
    })
  }

  let obstacle = diceRoll(track, true)
  while (!finished(racers, track)) {
    printBoard(racers, track, obstacle)
    sleep(400)
    clearScreen()
    console.log(`beware at track ${obstacle} was an obstacle`)
    for (let i = 0 ; i < racers.length ; i++) {
      racers[i].position += diceRoll(6)
      if (racers[i].position === obstacle) {
        advance(racers[i])
        console.log(`racer ${racers[i].name} hit obstacle so he back to start`)
      }
      if (finished(racers, track)) {
        clearScreen()
        racers[i].position = track
        winner(racers[i].name)
        printBoard(racers, track, obstacle)
        return
      }
    }
  }
}

play(players, track)

function printBoard (racer, track, obs, superPw) {
  for (let i = 0 ; i < racer.length ; i++) {
    printLine(racer[i].name, racer[i].position, track, obs)
  }
}

function printLine (player, pos, track, obs,) {
  let line = []
  for (let i = 0 ; i <= track ; i++) {
    if (i === pos) {
      line.push(player)
    } else if (i === obs) {
      line.push("X")
    } else {
      line.push(" ")
    }
  }
  console.log(line.join("|"))
}

function advance (player) {
  player.position = 0
}

function finished (racers, track) {
  for (let i = 0 ; i < racers.length ; i++) {
    if (racers[i].position >= track) {
      return true
    }
  }
  return false
}

function winner (racer) {
  console.log(`The winner is racer ${racer}`)
}

function clearScreen () {
  // Un-comment this line if you have trouble with console.clear();
  // return process.stdout.write('\033c');
  console.clear();
}
