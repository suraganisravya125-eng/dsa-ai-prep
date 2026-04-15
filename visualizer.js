// visualizer.js — Step-by-step algorithm visualization engine

let vizSteps = [];
let currentStep = 0;
let autoTimer = null;

function loadAlgo() {
  document.getElementById('vizStage').innerHTML = '<div class="viz-placeholder">Click Visualize to start</div>';
  document.getElementById('vizNav').style.display = 'none';
  document.getElementById('stepInfo').textContent = '';
  vizSteps = [];
  currentStep = 0;
}

function startViz() {
  const algo = document.getElementById('algoSelect').value;
  const rawInput = document.getElementById('vizInput').value;
  const nums = rawInput.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n));

  if (nums.length === 0) {
    document.getElementById('stepInfo').textContent = 'Please enter valid numbers separated by commas.';
    return;
  }

  if (autoTimer) clearInterval(autoTimer);

  if (algo === 'bubble') generateBubbleSteps([...nums]);
  else if (algo === 'binary') generateBinarySteps([...nums].sort((a,b)=>a-b), nums[nums.length-1]);
  else if (algo === 'bfs') generateBFSSteps();
  else if (algo === 'stack') generateStackSteps([...nums]);

  currentStep = 0;
  renderStep();
  document.getElementById('vizNav').style.display = 'flex';
}

// ── Bubble Sort ──
function generateBubbleSteps(arr) {
  vizSteps = [];
  const a = [...arr];
  const sorted = new Set();

  vizSteps.push({ arr: [...a], comparing: [], swapping: [], sorted: [...sorted], info: 'Starting Bubble Sort — we compare adjacent elements and swap if left > right.' });

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      vizSteps.push({ arr: [...a], comparing: [j, j+1], swapping: [], sorted: [...sorted], info: `Comparing a[${j}]=${a[j]} and a[${j+1}]=${a[j+1]}` });
      if (a[j] > a[j+1]) {
        [a[j], a[j+1]] = [a[j+1], a[j]];
        vizSteps.push({ arr: [...a], comparing: [], swapping: [j, j+1], sorted: [...sorted], info: `Swapped! Now a[${j}]=${a[j]}, a[${j+1}]=${a[j+1]}` });
      }
    }
    sorted.add(a.length - 1 - i);
    vizSteps.push({ arr: [...a], comparing: [], swapping: [], sorted: [...sorted], info: `Pass ${i+1} complete. Element ${a[a.length-1-i]} is now in its correct position.` });
  }
  vizSteps.push({ arr: [...a], comparing: [], swapping: [], sorted: new Set(a.map((_,i)=>i)), info: '✓ Array fully sorted! Time: O(n²), Space: O(1)' });
}

// ── Binary Search ──
function generateBinarySteps(arr, target) {
  vizSteps = [];
  const sorted = [...arr].sort((a,b)=>a-b);
  let left = 0, right = sorted.length - 1;
  vizSteps.push({ type:'binary', arr: sorted, left, right, mid:-1, target, info: `Binary Search for target=${target} in sorted array. Start: left=${left}, right=${right}` });

  while (left <= right) {
    const mid = Math.floor((left+right)/2);
    vizSteps.push({ type:'binary', arr: sorted, left, right, mid, target, info: `mid = (${left}+${right})/2 = ${mid}. arr[${mid}]=${sorted[mid]} vs target=${target}` });
    if (sorted[mid] === target) {
      vizSteps.push({ type:'binary', arr: sorted, left, right, mid, target, found: mid, info: `✓ Found target ${target} at index ${mid}!` });
      return;
    } else if (sorted[mid] < target) {
      vizSteps.push({ type:'binary', arr: sorted, left: mid+1, right, mid, target, info: `arr[${mid}]=${sorted[mid]} < ${target} → search RIGHT half` });
      left = mid + 1;
    } else {
      vizSteps.push({ type:'binary', arr: sorted, left, right: mid-1, mid, target, info: `arr[${mid}]=${sorted[mid]} > ${target} → search LEFT half` });
      right = mid - 1;
    }
  }
  vizSteps.push({ type:'binary', arr: sorted, left, right, mid:-1, target, info: `Target ${target} not found in array. Return -1.` });
}

// ── BFS Graph ──
function generateBFSSteps() {
  const graph = { 'A': ['B','C'], 'B': ['D','E'], 'C': ['F'], 'D': [], 'E': ['F'], 'F': [] };
  const visited = new Set();
  const queue = ['A'];
  const order = [];
  vizSteps = [{ type:'bfs', graph, visited: new Set(), queue: ['A'], order: [], info: 'BFS starting from node A. Queue: [A]' }];

  while (queue.length) {
    const node = queue.shift();
    if (!visited.has(node)) {
      visited.add(node);
      order.push(node);
      for (const neighbor of graph[node]) {
        if (!visited.has(neighbor)) queue.push(neighbor);
      }
      vizSteps.push({ type:'bfs', graph, visited: new Set(visited), queue: [...queue], order: [...order], current: node, info: `Visited ${node}. Queue: [${queue.join(',')}]. BFS Order so far: ${order.join('→')}` });
    }
  }
  vizSteps.push({ type:'bfs', graph, visited, queue: [], order, info: `✓ BFS Complete! Traversal order: ${order.join(' → ')}` });
}

// ── Stack Operations ──
function generateStackSteps(nums) {
  vizSteps = [];
  const stack = [];
  vizSteps.push({ type:'stack', stack: [], op: 'init', info: 'Stack initialized. Empty stack. LIFO: Last In, First Out.' });

  for (let i = 0; i < Math.min(nums.length, 6); i++) {
    stack.push(nums[i]);
    vizSteps.push({ type:'stack', stack: [...stack], op: 'push', val: nums[i], info: `PUSH ${nums[i]} → Stack top is now ${nums[i]}. Size: ${stack.length}` });
  }
  while (stack.length > 0) {
    const popped = stack.pop();
    vizSteps.push({ type:'stack', stack: [...stack], op: 'pop', val: popped, info: `POP → Removed ${popped}. Stack top is now ${stack.length ? stack[stack.length-1] : 'empty'}` });
  }
}

// ── Render current step ──
function renderStep() {
  if (vizSteps.length === 0) return;
  const step = vizSteps[currentStep];
  document.getElementById('stepCounter').textContent = `Step ${currentStep + 1} / ${vizSteps.length}`;
  document.getElementById('stepInfo').textContent = step.info || '';

  const stage = document.getElementById('vizStage');

  if (step.type === 'binary') {
    renderBinaryStep(stage, step);
  } else if (step.type === 'bfs') {
    renderBFSStep(stage, step);
  } else if (step.type === 'stack') {
    renderStackStep(stage, step);
  } else {
    renderBarsStep(stage, step);
  }
}

function renderBarsStep(stage, step) {
  const arr = step.arr;
  const max = Math.max(...arr);
  stage.innerHTML = arr.map((val, i) => {
    let cls = '';
    if (step.swapping && step.swapping.includes(i)) cls = 'swapping';
    else if (step.comparing && step.comparing.includes(i)) cls = 'comparing';
    else if (step.sorted instanceof Set && step.sorted.has(i)) cls = 'sorted';

    const h = Math.round((val / max) * 150);
    return `<div class="viz-bar ${cls}">
      <div class="bar-block" style="height:${h}px"></div>
      <div class="bar-label">${val}</div>
    </div>`;
  }).join('');
}

function renderBinaryStep(stage, step) {
  const arr = step.arr;
  stage.innerHTML = `<div style="display:flex;gap:8px;flex-wrap:wrap;justify-content:center;">` +
    arr.map((val, i) => {
      let bg = 'rgba(255,255,255,0.05)';
      let border = '1px solid rgba(255,255,255,0.1)';
      let color = '#9090aa';
      if (i === step.found) { bg='rgba(62,207,175,0.25)'; border='2px solid #3ecfaf'; color='#3ecfaf'; }
      else if (i === step.mid) { bg='rgba(124,109,250,0.25)'; border='2px solid #7c6dfa'; color='#7c6dfa'; }
      else if (i >= step.left && i <= step.right) { bg='rgba(245,166,35,0.1)'; border='1px solid #f5a623'; color='#e8e8f0'; }
      return `<div style="padding:12px 16px;border-radius:8px;background:${bg};border:${border};color:${color};font-family:'JetBrains Mono',monospace;font-size:0.85rem;text-align:center;">
        <div style="font-size:0.7rem;margin-bottom:4px;opacity:0.6">[${i}]</div>${val}</div>`;
    }).join('') + `</div>
    <div style="display:flex;gap:16px;margin-top:1rem;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9090aa;">
      <span style="color:#f5a623">■ Search range</span>
      <span style="color:#7c6dfa">■ mid</span>
      <span style="color:#3ecfaf">■ found</span>
    </div>`;
}

function renderBFSStep(stage, step) {
  const nodes = Object.keys(step.graph);
  stage.innerHTML = `<div style="display:flex;gap:12px;flex-wrap:wrap;justify-content:center;align-items:center;">` +
    nodes.map(n => {
      let bg = 'rgba(255,255,255,0.05)', border = '1px solid rgba(255,255,255,0.1)', color='#9090aa';
      if (step.current === n) { bg='rgba(124,109,250,0.3)'; border='2px solid #7c6dfa'; color='#7c6dfa'; }
      else if (step.visited && step.visited.has(n)) { bg='rgba(62,207,175,0.2)'; border='1px solid #3ecfaf'; color='#3ecfaf'; }
      else if (step.queue && step.queue.includes(n)) { bg='rgba(245,166,35,0.15)'; border='1px solid #f5a623'; color='#f5a623'; }
      const neighbors = step.graph[n].join(',');
      return `<div style="padding:16px;border-radius:10px;background:${bg};border:${border};text-align:center;min-width:64px;">
        <div style="font-size:1.2rem;font-weight:600;color:${color}">${n}</div>
        <div style="font-size:0.65rem;color:#9090aa;margin-top:4px">→ ${neighbors || 'leaf'}</div>
      </div>`;
    }).join('') + `</div>
    <div style="margin-top:1rem;font-size:0.75rem;font-family:'JetBrains Mono',monospace;color:#9090aa;display:flex;gap:16px;">
      <span style="color:#7c6dfa">■ current</span>
      <span style="color:#3ecfaf">■ visited</span>
      <span style="color:#f5a623">■ in queue</span>
    </div>`;
}

function renderStackStep(stage, step) {
  stage.innerHTML = `<div style="display:flex;flex-direction:column-reverse;gap:4px;min-height:160px;justify-content:flex-start;align-items:center;">` +
    (step.stack.length === 0
      ? `<div style="color:#9090aa;font-size:0.85rem;font-family:'JetBrains Mono',monospace">[ empty stack ]</div>`
      : step.stack.map((val, i) => {
          const isTop = i === step.stack.length - 1;
          return `<div style="padding:10px 28px;border-radius:6px;background:${isTop ? 'rgba(124,109,250,0.3)' : 'rgba(255,255,255,0.06)'};border:1px solid ${isTop ? '#7c6dfa' : 'rgba(255,255,255,0.1)'};font-family:'JetBrains Mono',monospace;font-size:0.9rem;color:${isTop ? '#7c6dfa' : '#e8e8f0'};width:120px;text-align:center;position:relative;">
            ${val}${isTop ? '<span style="position:absolute;right:8px;font-size:0.6rem;color:#7c6dfa;top:50%;transform:translateY(-50%)">← top</span>' : ''}
          </div>`;
        }).join('')
    ) + `</div>`;
}

function prevStep() {
  if (currentStep > 0) { currentStep--; renderStep(); }
}

function nextStep() {
  if (currentStep < vizSteps.length - 1) { currentStep++; renderStep(); }
}

function autoPlay() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; return; }
  autoTimer = setInterval(() => {
    if (currentStep < vizSteps.length - 1) { currentStep++; renderStep(); }
    else { clearInterval(autoTimer); autoTimer = null; }
  }, 900);
}
