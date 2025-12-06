const bloomLevels = {
  1: [
    'Choose','Copy','Define','Duplicate','Find','How','Identify','Label','List','Listen','Locate','Match','Memorise','Name','Observe','Omit','Quote','Read','Recall','Recite','Record','Relate','Repeat','Retell','Select','Show','Spell','State','Tell','Trace','What','When','Where','Which','Who','Why','Write'
  ],
  2: [
    'Ask','Cite','Classify','Compare','Contrast','Demonstrate','Discuss','Estimate','Explain','Express','Extend','Generalise','Give examples','Illustrate','Indicate','Infer','Interpret','Match','Observe','Outline','Paraphrase','Predict','Purpose','Relate','Rephrase','Report','Restate','Review','Rewrite','Show','Summarise','Translate'
  ],
  3: [
    'Act','Adapt','Administer','Apply','Build','Calculate','Change','Choose','Compute','Construct','Demonstrate','Develop','Discover','Dramatise','Employ','Experiment','Identify','Interview','Link','List','Make use of','Manipulate','Model','Modify','Operate','Organise','Paint','Plan','Practice','Prepare','Produce','Relate','Schedule','Select','Show','Simulate','Sketch','Solve','Teach','Transfer','Use','Write'
  ],
  4: [
    'Analyse','Appraise','Arrange','Assumption','Breakdown','Categorise','Cause and effect','Choose','Classify','Combine','Compare','Conclusion','Connect','Contrast','Correlate','Criticise','Deduce','Detect','Diagram','Differentiate','Discriminate','Dissect','Distinction','Distinguish','Divide','Examine','Experiment','Explain','Focus','Function','Group','Highlight','Identify','Illustrate','Infer','Inspect','Investigate','Isolate','List','Motive','Omit','Order','Point out','Prioritize','Question','Rank','Relationships','Research','Separate','Simplify','Survey','Take part in','Test for','Theme'
  ],
  5: [
    'Adapt','Add to','Build','Change','Choose','Combine','Compile','Compose','Construct','Convert','Create','Delete','Design','Develop','Devise','Discuss','Elaborate','Estimate','Formulate','Group','Happen','Hypothesise','Imagine','Improve','Innovate','Integrate','Invent','Make up','Maximise','Minimise','Model','Modify','Original','Originate','Plan','Predict','Produce','Propose','Reframe','Reorganise','Role play','Solution','Solve','Speculate','Substitute','Suppose','Tabulate','Test','Theorise','Transform','Visualise','Write'
  ],
  6: [
    'Agree','Appraise','Argue','Assess','Award','Bad','Choose','Compare','Conclude','Consider','Convince','Criteria','Criticise','Debate','Decide','Deduct','Defend','Determine','Disprove','Dispute','Effective','Estimate','Evaluate','Give reasons','Good','Grade','Importance','Influence','Interpret','Judge','Justify','Mark','Measure','Opinion','Perceive','Persuade','Prioritise','Prove','Rate','Recommend','Rule on','Select','Support','Value','Verify','Weigh'
  ]
}

const verbBox = document.getElementById('verbBox')
const buttons = Array.from(document.querySelectorAll('.level-btn'))
const anotherBtn = document.getElementById('anotherBtn')
const levelListEl = document.getElementById('levelList')

let currentVerb = null
let currentLevel = null
let locked = false

function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)] }

function resetUI() {
  verbBox.classList.remove('correct','wrong')
  buttons.forEach(b => { b.classList.remove('correct','wrong'); b.disabled = false })
  locked = false
}

function nextVerb() {
  resetUI()
  currentLevel = randomItem([1,2,3,4,5,6])
  currentVerb = randomItem(bloomLevels[currentLevel])
  verbBox.textContent = currentVerb
  levelListEl.innerHTML = ''
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, s => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[s]))
}

function renderLevelList(level) {
  const verbs = bloomLevels[level]
  const rendered = verbs.map(v => v === currentVerb ? `<span class="current-verb">${escapeHtml(v)}</span>` : escapeHtml(v)).join(', ')
  levelListEl.innerHTML = `<span class="level-title">Level ${level}:</span> ${rendered}`
}

function handleChoice(level) {
  if (locked) return
  locked = true
  const correctBtn = buttons.find(b => Number(b.dataset.level) === currentLevel)
  const clickedBtn = buttons.find(b => Number(b.dataset.level) === level)
  renderLevelList(currentLevel)
  if (level === currentLevel) {
    verbBox.classList.add('correct')
    correctBtn.classList.add('correct')
  } else {
    verbBox.classList.add('wrong')
    clickedBtn.classList.add('wrong')
    correctBtn.classList.add('correct')
  }
  buttons.forEach(b => b.disabled = true)
}

buttons.forEach(b => b.addEventListener('click', () => handleChoice(Number(b.dataset.level))))
anotherBtn.addEventListener('click', nextVerb)

nextVerb()
