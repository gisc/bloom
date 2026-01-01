const correct = ['Authenticity','Alignment','Holistic','Future-Oriented','Feedback','Judgement']
const distractors = ['Engagement','Relevance','Motivation']
const allItems = [...correct, ...distractors].sort(() => Math.random() - 0.5)

const grid = document.getElementById('grid')
const testBtn = document.getElementById('testBtn')

let selected = new Set()
let correctSelected = new Set()
let tested = false

function createBox(text) {
  const box = document.createElement('div')
  box.className = 'box'
  box.textContent = text
  box.dataset.text = text
  box.addEventListener('click', () => handleClick(text))
  return box
}

function handleClick(text) {
  if (selected.has(text)) {
    selected.delete(text)
    correctSelected.delete(text)
  } else if (selected.size < 6) {
    selected.add(text)
    if (correct.includes(text)) correctSelected.add(text)
  }
  updateUI()
}

function updateUI() {
  // recount correct selected in case of deselect
  correctSelected.clear()
  selected.forEach(s => { if (correct.includes(s)) correctSelected.add(s) })
  document.querySelectorAll('.box').forEach(box => {
    const t = box.dataset.text
    box.classList.remove('selected','correct','incorrect')
    if (selected.has(t)) {
      if (tested) {
        box.classList.add(correct.includes(t) ? 'correct' : 'incorrect')
      } else {
        box.classList.add('selected')
      }
    }
  })
  const ok = correctSelected.size === 6 && selected.size === 6
  testBtn.disabled = selected.size !== 6
}

function startRain() {
  const colors = ['#22c55e','#ef4444','#f59e0b','#3b82f6','#8b5cf6','#ec4899']
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

function testClicked() {
  tested = true
  updateUI()
  if (correctSelected.size === 6) startRain()
}

function resetGame() {
  selected.clear(); correctSelected.clear(); tested = false
  const shuffled = [...allItems].sort(() => Math.random() - 0.5)
  grid.innerHTML = ''
  shuffled.forEach(item => grid.appendChild(createBox(item)))
  testBtn.textContent = 'Test'
  updateUI()
}

testBtn.addEventListener('click', () => {
  if (testBtn.textContent === 'Again') {
    resetGame()
  } else {
    testClicked()
    testBtn.textContent = 'Again'
  }
})

resetGame()