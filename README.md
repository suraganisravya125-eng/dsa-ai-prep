# 🧠 DSA AI Prep — Smart Interview Coach

> An AI-powered Data Structures & Algorithms preparation platform with practice problems, algorithm visualization, and a mock interview simulator. Built with vanilla HTML/CSS/JS + Claude AI (Anthropic API).

![DSA AI Prep](https://img.shields.io/badge/AI-Powered-7c6dfa?style=for-the-badge)
![Languages](https://img.shields.io/badge/Languages-Python%20%7C%20Java%20%7C%20C%2B%2B-3ecfaf?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-f5a623?style=for-the-badge)

---

## ✨ Features

### 1. 🎯 AI-Powered Practice
- **10 curated DSA problems** across Easy / Medium / Hard difficulties
- Topics: Arrays, Stack, Binary Search, Linked List, Trees, Dynamic Programming, Graphs
- Code templates in **Python, Java, and C++**
- **AI Hint** — nudges you in the right direction without spoiling the answer
- **Code Review** — AI analyzes your code for correctness, complexity, and edge cases
- **Full Solution** — shows optimal solution with explanation and complexity

### 2. 📊 Algorithm Visualizer
- **Bubble Sort** — see comparisons and swaps step-by-step
- **Binary Search** — watch the search range shrink at each step
- **BFS Graph Traversal** — nodes light up as they're visited
- **Stack Operations** — push and pop animated clearly
- Step-by-step navigation + Auto Play mode
- **AI Explanation** — Claude explains any algorithm in interview-friendly language

### 3. 🎤 AI Mock Interview Simulator
- Real interview-style conversation with Claude as your interviewer
- Configure: **Difficulty** (Fresher / Mid / Senior) + **Topic** + **Language**
- AI gives follow-up questions just like a real interviewer
- **Detailed feedback** at the end of every session

---

## 🚀 Quick Start

### Option 1: Open directly in browser
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/dsa-ai-prep.git
cd dsa-ai-prep

# Open the app
open frontend/index.html
# or just double-click frontend/index.html
```

> ⚠️ **Note on API Key**: The Anthropic API requires authentication. For the AI features to work, you need to either:
> - Run through a proxy that injects your API key (recommended for demos)
> - Set up a simple local backend (see `backend/` folder)

### Option 2: Local backend (recommended for full functionality)
```bash
cd backend
pip install -r requirements.txt
# Add your API key to .env
echo "ANTHROPIC_API_KEY=sk-ant-your-key-here" > .env
python server.py
# Then open http://localhost:5000
```

---

## 📁 Project Structure

```
dsa-ai-prep/
├── frontend/
│   ├── index.html        # Main app (single-page)
│   ├── style.css         # Dark theme UI with animations
│   ├── app.js            # Core logic + AI API integration
│   ├── problems.js       # Problem bank (10 problems, 3 languages)
│   └── visualizer.js     # Step-by-step algorithm engine
├── backend/
│   ├── server.py         # Flask proxy server (hides API key)
│   └── requirements.txt  # Python dependencies
├── problems/
│   ├── python/           # Standalone Python problem files
│   ├── java/             # Standalone Java problem files
│   └── cpp/              # Standalone C++ problem files
├── docs/
│   └── architecture.md   # System design explanation
└── README.md
```

---

## 🧩 Problem Bank

| # | Problem | Difficulty | Topic |
|---|---------|-----------|-------|
| 1 | Two Sum | 🟢 Easy | Arrays & Hashing |
| 2 | Valid Parentheses | 🟢 Easy | Stack |
| 3 | Binary Search | 🟢 Easy | Binary Search |
| 4 | Maximum Subarray | 🟡 Medium | Dynamic Programming |
| 5 | Linked List Cycle | 🟡 Medium | Linked List |
| 6 | Lowest Common Ancestor | 🟡 Medium | Binary Tree |
| 7 | Coin Change | 🟡 Medium | Dynamic Programming |
| 8 | Number of Islands | 🟡 Medium | Graph / BFS / DFS |
| 9 | Trapping Rain Water | 🔴 Hard | Two Pointers |
| 10 | Word Ladder | 🔴 Hard | BFS / Graph |

---

## 🤖 AI Integration (Claude API)

This project uses [Anthropic's Claude API](https://docs.anthropic.com) for:

```javascript
// Example API call used in this project
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1000,
    system: 'You are a DSA interview coach...',
    messages: [{ role: 'user', content: 'Give me a hint for Two Sum...' }]
  })
});
```

### AI Features Used:
- **Contextual hints** — problem-aware, code-aware guidance
- **Code analysis** — multi-language review with complexity analysis
- **Conversational interview** — multi-turn dialogue with full history
- **Algorithm explanation** — educational content on demand

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML5, CSS3, JavaScript (ES6+) |
| AI Engine | Anthropic Claude (claude-sonnet-4) |
| Backend (optional) | Python Flask |
| Fonts | JetBrains Mono + Syne (Google Fonts) |
| Deployment | GitHub Pages / Any static host |

---

## 📈 Architecture

```
User ──→ Frontend (HTML/JS)
           │
           ├── Practice Tab ──→ Anthropic Claude API
           │   ├── Get Hint
           │   ├── Review Code
           │   └── Full Solution
           │
           ├── Visualizer Tab ──→ Local JS Engine + Claude API (explain)
           │   ├── Bubble Sort
           │   ├── Binary Search
           │   ├── BFS
           │   └── Stack
           │
           └── Interview Tab ──→ Claude API (multi-turn conversation)
               ├── Configure session
               ├── Real-time dialogue
               └── Performance feedback

## 📄 License

MIT License — free to use, modify, and distribute.
