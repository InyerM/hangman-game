
/* Variables */
const wall = document.getElementById('wall')
const ctx = wall.getContext('2d')
const keys = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M']
const keyColor = '#618dd6'
const keyStrokeColor = "lightblue";
const wordsArray = ['BLACK', 'FILL', 'MOUSE', 'CLOWN', 'HAPPY']
const positions = []
const container = document.getElementById('container')
const buttons = container.querySelectorAll('button')
let errors = 0
let word
let hits = 0

const drawBox = (x, y, width, height, letter) => {
  ctx.fillStyle = '#ffffff'
  ctx.strokeStyle = 'gray'
  ctx.fillRect(x, y, width, height)
  ctx.strokeRect(x, y, width, height)

  ctx.fillStyle = "white"
  ctx.fillText(letter, x + width/2-7, y+height/2+5)
}

const drawLetter = (letter, x, y) => {
  ctx.font = "bold 60px courier";
  ctx.fillStyle = "#444444"
  ctx.fillText(letter, x, y)
}

const setBox = () => {
  const width = 70
  const height = 70
  word = wordsArray [Math.floor(Math.random()*wordsArray.length)]
  console.log(word)
  let posX = (wall.width - (word.length * (width + 40))) / 2
  const posY = 300
  for (let i = 0; i < word.length; i++) {
    drawBox(posX, posY, width, height, word[i])
    positions.push({letter : word[i], position : posX})
    posX += 120
  }
}

const drawOne = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 7

  ctx.beginPath()
  ctx.moveTo(wall.width/2 - 100, 250)
  ctx.lineTo(wall.width/2 + 100, 250)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(wall.width/2, 250)
  ctx.lineTo(wall.width/2, 30)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(wall.width/2 - 15, 250)
  ctx.lineTo(wall.width/2, 200)
  ctx.lineTo(wall.width/2 + 15, 250)
  ctx.stroke()
}

const drawTwo = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 7

  ctx.beginPath()
  ctx.moveTo(wall.width/2 - 100, 30)
  ctx.lineTo(wall.width/2 + 100, 30)
  ctx.stroke()


  ctx.beginPath()
  ctx.moveTo(wall.width/2, 60)
  ctx.lineTo(wall.width/2 + 15, 30)
  ctx.stroke()
}

const drawThree = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 30)
  ctx.lineTo(wall.width/2 + 60, 70)
  ctx.stroke()
}

const drawFour = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.arc(wall.width/2 + 60, 70 + 20, 20, 0, Math.PI*2)
  ctx.stroke()
}

const drawFive = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 110)
  ctx.lineTo(wall.width/2 + 60, 170)
  ctx.stroke()
}

const drawSix = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 170)
  ctx.lineTo(wall.width/2 + 40, 200)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 170)
  ctx.lineTo(wall.width/2 + 80, 200)
  ctx.stroke()
}

const drawSeven = () => {
  ctx.strokeStyle = '#3d6191'
  ctx.lineWidth = 4

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 120)
  ctx.lineTo(wall.width/2 + 40, 150)
  ctx.stroke()

  ctx.beginPath()
  ctx.moveTo(wall.width/2 + 60, 120)
  ctx.lineTo(wall.width/2 + 80, 150)
  ctx.stroke()
}

const hideKey = (key) => {
  buttons.forEach((i) => {
    i.innerText === key ? i.classList.toggle('hiden') : null
  })
}

const isCharacterALetter = (char) => {
  return (/[a-zA-Z]/).test(char)
}

const verifyKeyEntered = (target) => {
  let found = false

  positions.forEach(item => {
    if (item.letter === target) {
      drawLetter(target, item.position + 15, 350)
      found = true
      hits++
      return
    }
  })

  hideKey(target)
  
  if (!found) {
    errors++
    errors === 1 ? drawOne() : null
    errors === 2 ? drawTwo() : null
    errors === 3 ? drawThree() : null
    errors === 4 ? drawFour() : null
    errors === 5 ? drawFive() : null
    errors === 6 ? drawSix() : null
    if(errors === 7) {
      drawSeven()
      errors++
    }
  }
  
  if (errors === 8) {
    setTimeout(() => {
      alert('You have lose, try again')
    }, 500)
  }

  if (hits === word.length) {
    setTimeout(() => {
      alert('You have won, congratulations')
    }, 200)
  }
}

setBox()
buttons.forEach(i => {
  i.addEventListener('click', (e) => {
    const target = e.target.innerText
    isCharacterALetter(target) ? verifyKeyEntered(target) : null
  })
})

document.addEventListener('keydown',(e) => {
  isCharacterALetter(e.key) ? verifyKeyEntered(e.key.toUpperCase()) : null
})

document.getElementById('reset').addEventListener('click', () => {
  document.location.reload()
})