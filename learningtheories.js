const pairs = [
  ['Behaviourism','A quiz with instant feedback, digital flashcards, or a skills drill.'],
  ['Cognitivism','A structured lecture with analogies, a mind map, or a "think-aloud" problem.'],
  ['Constructivism','A group project to solve a real-world case study, a debate, or building a portfolio.'],
  ['Connectivism','Working in teams to curate a list of online resources, contributing to a class blog, or building a professional learning network.']
]

const leftCol = document.getElementById('leftCol')
const rightCol = document.getElementById('rightCol')
const againBtn = document.getElementById('againBtn')

let selectedLeft = null
let selectedRight = null
let matched = new Set()

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5) }

function createBox(text, side, index) {
  const box = document.createElement('div')
  box.className = 'box'
  box.textContent = text
  box.dataset.index = index
  box.dataset.side = side
  box.addEventListener('click', () => handleClick(box))
  return box
}

function handleClick(box) {
  if (box.classList.contains('matched')) return
  const side = box.dataset.side
  const idx = Number(box.dataset.index)
  if (side === 'left') {
    if (selectedLeft) selectedLeft.classList.remove('selected')
    selectedLeft = box
    box.classList.add('selected')
  } else {
    if (selectedRight) selectedRight.classList.remove('selected')
    selectedRight = box
    box.classList.add('selected')
  }
  if (selectedLeft && selectedRight) checkPair()
}

function checkPair() {
  const li = Number(selectedLeft.dataset.index)
  const ri = Number(selectedRight.dataset.index)
  if (li === ri) {
    const cc = 'c' + (li + 1)
    selectedLeft.classList.remove('selected')
    selectedRight.classList.remove('selected')
    selectedLeft.classList.add('matched', cc)
    selectedRight.classList.add('matched', cc)
    matched.add(li)
  } else {
    selectedLeft.classList.remove('selected')
    selectedRight.classList.remove('selected')
  }
  selectedLeft = null
  selectedRight = null
  if (matched.size === pairs.length) {
    againBtn.disabled = false
    startConfetti()
  }
}

function startConfetti() {
  const colors = ['var(--c1)','var(--c2)','var(--c3)','var(--c4)']
  for (let i = 0; i < 60; i++) {
    const c = document.createElement('div')
    c.className = 'confetti'
    c.style.left = Math.random() * 100 + '%'
    c.style.background = colors[Math.floor(Math.random() * colors.length)]
    c.style.animationDelay = Math.random() * 0.5 + 's'
    document.body.appendChild(c)
    setTimeout(() => c.remove(), 2000)
  }
}

function initGame() {
  leftCol.innerHTML = ''
  rightCol.innerHTML = ''
  leftCol.className = 'column left'
  rightCol.className = 'column right'
  matched.clear()
  selectedLeft = null
  selectedRight = null
  againBtn.disabled = true
  const shuffledLeft = shuffle(pairs.map((p,i) => ({text:p[0],index:i})))
  const shuffledRight = shuffle(pairs.map((p,i) => ({text:p[1],index:i})))
  shuffledLeft.forEach(item => leftCol.appendChild(createBox(item.text,'left',item.index)))
  shuffledRight.forEach(item => rightCol.appendChild(createBox(item.text,'right',item.index)))
}

againBtn.addEventListener('click', initGame)
initGame()