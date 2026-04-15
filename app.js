// app.js — Main application logic + Anthropic AI integration

const API_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-sonnet-4-20250514';

// ── State ──
let selectedProblem = null;
let interviewHistory = [];
let interviewActive = false;

// ── Tab Navigation ──
function showTab(name) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`tab-${name}`).classList.add('active');
  event.target.classList.add('active');
}

// ── Problem List ──
function renderProblems(filter = 'all') {
  const list = document.getElementById('problemList');
  const filtered = filter === 'all' ? PROBLEMS : PROBLEMS.filter(p => p.difficulty === filter);
  list.innerHTML = filtered.map(p => `
    <div class="problem-item" id="pi-${p.id}" onclick="selectProblem(${p.id})">
      <div>
        <div class="problem-name">${p.name}</div>
        <div class="problem-topic">${p.topic}</div>
      </div>
      <div class="diff-dot ${p.difficulty}"></div>
    </div>
  `).join('');
}

function filterProblems(diff, btn) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  renderProblems(diff);
}

function selectProblem(id) {
  selectedProblem = PROBLEMS.find(p => p.id === id);
  document.querySelectorAll('.problem-item').forEach(el => el.classList.remove('active'));
  const el = document.getElementById(`pi-${id}`);
  if (el) el.classList.add('active');

  document.getElementById('problemTitle').textContent = selectedProblem.name;
  document.getElementById('problemDesc').textContent = selectedProblem.description + '\n\nExample: ' + selectedProblem.examples;

  const badge = document.getElementById('diffBadge');
  badge.textContent = selectedProblem.difficulty;
  badge.className = `diff-badge ${selectedProblem.difficulty}`;

  document.getElementById('topicTags').innerHTML = selectedProblem.tags.map(t => `<span class="topic-tag">${t}</span>`).join('');

  updateTemplate();
  document.getElementById('aiOutput').classList.add('hidden');
}

function updateTemplate() {
  if (!selectedProblem) return;
  const lang = document.getElementById('langSelect').value;
  document.getElementById('codeEditor').value = selectedProblem.templates[lang] || '// No template for this language';
}

// ── AI API Call ──
async function callAI(messages, systemPrompt = '') {
  const overlay = document.getElementById('loadingOverlay');
  overlay.classList.remove('hidden');

  try {
    const body = {
      model: MODEL,
      max_tokens: 1000,
      messages
    };
    if (systemPrompt) body.system = systemPrompt;

    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    if (data.error) throw new Error(data.error.message);
    return data.content.map(b => b.text || '').join('');
  } catch (err) {
    return `Error: ${err.message}. Make sure you are running this app through a proxy or have your API key configured.`;
  } finally {
    overlay.classList.add('hidden');
  }
}

// ── Practice: Get AI Hint ──
async function getAIHint() {
  if (!selectedProblem) { alert('Please select a problem first!'); return; }
  const lang = document.getElementById('langSelect').value;
  const code = document.getElementById('codeEditor').value;

  const response = await callAI([{
    role: 'user',
    content: `I'm solving "${selectedProblem.name}" (${selectedProblem.difficulty}) in ${lang}.

Problem: ${selectedProblem.description}

My current code:
${code}

Give me a HINT only (not the full solution). Guide me with:
1. The key insight or approach to use
2. What data structure would help
3. A gentle nudge on the next step

Keep it concise and educational. Don't reveal the complete solution.`
  }], 'You are a helpful DSA interview coach. Give hints that guide thinking without giving away answers.');

  showAIOutput(response);
}

// ── Practice: Review Code ──
async function reviewCode() {
  if (!selectedProblem) { alert('Please select a problem first!'); return; }
  const lang = document.getElementById('langSelect').value;
  const code = document.getElementById('codeEditor').value;

  document.getElementById('loadingText').textContent = 'Reviewing your code...';

  const response = await callAI([{
    role: 'user',
    content: `Review my ${lang} solution for "${selectedProblem.name}":

${code}

Please provide:
1. ✓ What's correct / good approach
2. ✗ Issues or bugs (if any)
3. Time & Space complexity analysis
4. Suggested improvements
5. Edge cases to consider`
  }], 'You are an expert code reviewer specializing in DSA and interview preparation. Be constructive and educational.');

  showAIOutput(response);
}

// ── Practice: Full Solution ──
async function getFullSolution() {
  if (!selectedProblem) { alert('Please select a problem first!'); return; }
  const lang = document.getElementById('langSelect').value;

  document.getElementById('loadingText').textContent = 'Generating optimal solution...';

  const response = await callAI([{
    role: 'user',
    content: `Show the optimal solution for "${selectedProblem.name}" in ${lang}.

Include:
1. Complete, clean, commented code
2. Time complexity: O(?)
3. Space complexity: O(?)
4. Brief explanation of the approach
5. Why this is better than brute force`
  }], 'You are a senior software engineer providing clean, well-commented DSA solutions.');

  showAIOutput(response);
}

function showAIOutput(text) {
  document.getElementById('aiText').textContent = text;
  document.getElementById('aiOutput').classList.remove('hidden');
}

function closeAI() {
  document.getElementById('aiOutput').classList.add('hidden');
}

// ── Visualizer: AI Explain ──
async function explainAlgo() {
  const algo = document.getElementById('algoSelect').value;
  const algoNames = { bubble: 'Bubble Sort', binary: 'Binary Search', bfs: 'BFS (Breadth-First Search)', stack: 'Stack Operations' };

  document.getElementById('loadingText').textContent = 'Generating AI explanation...';

  const response = await callAI([{
    role: 'user',
    content: `Explain ${algoNames[algo]} for a student preparing for interviews. Cover:
1. Core concept in simple words
2. Step-by-step how it works
3. Time & Space complexity with reasoning
4. Real-world use cases
5. Common interview questions about this algorithm
6. Tips to remember it easily

Keep it friendly and easy to understand.`
  }], 'You are a DSA tutor explaining concepts clearly for interview preparation.');

  const vizAI = document.getElementById('vizAI');
  document.getElementById('vizAIText').textContent = response;
  vizAI.classList.remove('hidden');
}

// ── Mock Interview ──
async function startInterview() {
  const diff = document.getElementById('intDiff').value;
  const topic = document.getElementById('intTopic').value;
  const lang = document.getElementById('intLang').value;

  document.getElementById('loadingText').textContent = 'Preparing your interview...';

  const diffMap = { entry: 'entry-level fresher', mid: 'mid-level 2 years experience', senior: 'senior developer' };
  const topicMap = { arrays: 'Arrays & Strings', trees: 'Trees & Graphs', dp: 'Dynamic Programming', mixed: 'Mixed DSA topics' };

  const systemPrompt = `You are a technical interviewer at a top tech company.
Conduct a realistic ${diffMap[diff]} DSA interview focused on ${topicMap[topic]}.
The candidate will code in ${lang}.
- Start with a greeting and introduce yourself
- Ask one DSA problem at a time
- Respond naturally as an interviewer would
- Give follow-up questions if answers are incomplete
- Be encouraging but professional
- After the interview ends, give detailed feedback`;

  interviewHistory = [];
  const greeting = await callAI([{
    role: 'user',
    content: 'Start the interview. Greet me, briefly introduce yourself, then give me my first DSA problem.'
  }], systemPrompt);

  interviewHistory = [
    { role: 'user', content: 'Start the interview.' },
    { role: 'assistant', content: greeting }
  ];
  interviewActive = true;
  interviewActive_system = systemPrompt;

  document.getElementById('interviewSetup').classList.add('hidden');
  document.getElementById('interviewChat').classList.remove('hidden');
  addChatMessage('ai', greeting);
}

async function sendAnswer() {
  const input = document.getElementById('chatInput');
  const answer = input.value.trim();
  if (!answer) return;

  input.value = '';
  addChatMessage('user', answer);

  interviewHistory.push({ role: 'user', content: answer });
  document.getElementById('loadingText').textContent = 'Interviewer is responding...';

  const response = await callAI(interviewHistory, interviewActive_system);
  interviewHistory.push({ role: 'assistant', content: response });
  addChatMessage('ai', response);
}

async function endInterview() {
  interviewHistory.push({ role: 'user', content: 'Please end the interview and give me detailed feedback on my performance.' });

  document.getElementById('loadingText').textContent = 'Generating feedback...';
  const feedback = await callAI(interviewHistory, interviewActive_system);
  addChatMessage('ai', feedback);
  document.getElementById('chatInput').disabled = true;
  document.querySelector('.chat-input-row .btn-primary').disabled = true;
}

function addChatMessage(role, text) {
  const container = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `
    <div class="msg-avatar ${role}">${role === 'ai' ? 'AI' : 'Me'}</div>
    <div class="msg-bubble ${role}">${text.replace(/\n/g, '<br/>')}</div>
  `;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  renderProblems();
  // Sync lang selectors
  document.getElementById('globalLang').addEventListener('change', function () {
    document.getElementById('langSelect').value = this.value;
    document.getElementById('intLang').value = this.value;
    updateTemplate();
  });
});

let interviewActive_system = '';
