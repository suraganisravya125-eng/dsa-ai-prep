# Architecture — DSA AI Prep

## System Overview

```
┌─────────────────────────────────────────────────┐
│                   FRONTEND                       │
│  index.html + style.css + app.js                │
│                                                  │
│  ┌──────────┐ ┌────────────┐ ┌───────────────┐  │
│  │ Practice │ │ Visualizer │ │ Mock Interview │  │
│  │  Tab     │ │   Tab      │ │     Tab        │  │
│  └────┬─────┘ └─────┬──────┘ └───────┬───────┘  │
└───────┼─────────────┼────────────────┼───────────┘
        │             │                │
        ▼             ▼                ▼
┌─────────────────────────────────────────────────┐
│              Anthropic Claude API                │
│         claude-sonnet-4-20250514                 │
│                                                  │
│  • Hint generation (prompt engineering)         │
│  • Code review (multi-language)                 │
│  • Algorithm explanation                        │
│  • Multi-turn interview simulation              │
└─────────────────────────────────────────────────┘
```

## Key Design Decisions

### 1. No Framework — Pure Vanilla JS
Keeps it simple, fast to load, and easy to explain in interviews.

### 2. Client-side Visualization Engine
The visualizer (visualizer.js) generates all steps locally — no API calls needed.
This demonstrates algorithmic thinking, not just API usage.

### 3. Stateful Interview via History Array
The mock interview maintains full conversation history and passes it
with every API call — demonstrating understanding of stateless APIs.

### 4. Prompt Engineering
Each feature uses carefully crafted system + user prompts:
- Hints: explicitly restricted from giving full solutions
- Code review: structured output format requested
- Interview: persona + difficulty + topic injected into system prompt

## Complexity Analysis of Visualized Algorithms

| Algorithm | Time | Space | Notes |
|-----------|------|-------|-------|
| Bubble Sort | O(n²) | O(1) | In-place, stable |
| Binary Search | O(log n) | O(1) | Requires sorted array |
| BFS | O(V+E) | O(V) | Queue-based |
| Stack Ops | O(1) | O(n) | LIFO structure |
