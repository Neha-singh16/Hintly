(function(){"use strict";const i={PROBLEM_CONTEXT:"CM_PROBLEM_CONTEXT",GET_LATEST_CONTEXT:"CM_GET_LATEST_CONTEXT",LATEST_CONTEXT_RESPONSE:"CM_LATEST_CONTEXT_RESPONSE",GENERATE_HINT:"CM_GENERATE_HINT",HINT_RESPONSE:"CM_HINT_RESPONSE"};function p(e,o,s){const n=e.site==="leetcode"?"LeetCode":"GeeksforGeeks",a=e.description.slice(0,600),t=o?.trim()||"No notes provided.";return`You are Code Mentor AI, a friendly but sharp DSA (Data Structures & Algorithms) mentor. Your job is to help students understand problems clearly without spoiling the solution.

**Problem Details:**
- Site: ${n}
- Title: ${e.title}
- Difficulty: ${e.difficulty}
- Description: ${a}

**User's Current Progress:**
${t}

---

Respond in Markdown with EXACT sections below. Make your answer complete and detailed. Use bullets and structure for clarity.
`+{basic:`
**Hint Level: BEGINNER (Explain Like I'm 5)**

Your response MUST include these sections in this order:

💡 **Main Idea:**
[Very simple explanation - 1 sentence a 5-year-old would understand]

📝 **How It Works:**
• [Simple point 1 - use everyday language]
• [Simple point 2]
• [Simple point 3]

🔧 **Steps to Solve:**
1. [First action in simple terms]
2. [Second action]
3. [Third action]

⚠️ **Common Mistakes:**
• [Beginner mistake 1]
• [Beginner mistake 2]

💻 **Pseudo-code Sketch:**
\`\`\`
Simple pseudocode (5-10 lines, use simple variable names)
\`\`\`

FORBIDDEN: Complex jargon, big words, technical terms. Make it FUN and simple!`,intermediate:`
**Hint Level: INTERMEDIATE (Algorithm & Data Structure Focus)**

Your response MUST include these sections in this order:

💡 **Main Idea:**
[Core algorithm or data structure approach - 1 sentence]

📝 **Key Insights:**
• [Why this approach works]
• [What data structure to use]
• [Time complexity benefit]

🔧 **Steps to Solve:**
1. [First step]
2. [Second step]
3. [Third step]
4. [Handle edge cases]
5. [Return result]

⚠️ **Common Mistakes:**
• [Algorithm pitfall]
• [Edge case to watch]

💻 **Pseudo-code Sketch:**
\`\`\`
Detailed pseudocode (10-15 lines)
Include variable names and logic flow
\`\`\`

FOCUS: Algorithm choice, data structure, and why it's efficient.`,advanced:`
**Hint Level: ADVANCED (Complexity & Optimization)**

Your response MUST include these sections in this order:

💡 **Main Idea:**
[Optimal algorithm with complexity analysis - 1 sentence]

📝 **Approach:**
• [Algorithm name and why]
• [Time Complexity: O(...) with explanation]
• [Space Complexity: O(...) with explanation]

🔧 **Steps to Solve:**
1. [Initialize]
2. [Process]
3. [Optimize edge cases]
4. [Return]
5. [Verify constraints]
6. [Consider follow-ups]

⚠️ **Edge Cases:**
• [Tricky edge case 1]
• [Tricky edge case 2]

💻 **Pseudo-code Sketch:**
\`\`\`
Optimized pseudocode (12-15 lines)
Show the most efficient approach
\`\`\`

FOCUS: Time/space complexity, edge cases, follow-up optimizations.`}[s]+`

---

**IMPORTANT RULES:**
- NEVER mention the word "prompt" or repeat the full problem statement
- Keep bullets clear and detailed
- Pseudo-code should NOT be full code, just logic outline
- Make each section complete and thorough
- Use emojis only where specified above
- Make the response scannable with proper formatting`}class u{constructor(o="http://localhost:11434/api/generate",s="deepseek-coder:latest"){this.endpoint=o,this.model=s}async generateHint(o,s,n="basic"){const a=p(o,s||"",n);try{const t=await fetch(this.endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:this.model,prompt:a,stream:!1,options:{temperature:.5,num_predict:500,top_k:40,top_p:.9,stop:[`
---`,"User:","Problem:"]}})});if(!t.ok){let l="";try{const d=await t.json();l=JSON.stringify(d,null,2)}catch{try{l=await t.text()}catch{l="(no error details available)"}}throw new Error(`AI server responded with status ${t.status} (${t.statusText}):
${l}`)}const r=await t.json();if(!r.response)throw new Error("No response received from AI server. Response data: "+JSON.stringify(r));return r.response.trim()}catch(t){throw t instanceof TypeError&&t.message.includes("fetch")?new Error(`Cannot connect to local AI server at ${this.endpoint}. Please ensure:
1. Ollama is running (try: ollama serve)
2. CORS is enabled (set OLLAMA_ORIGINS=*)
3. The server is accessible at ${this.endpoint}
Original error: ${t.message}`):t}}}let c=null;const h=new u;chrome.runtime.onMessage.addListener((e,o,s)=>{if(e.type===i.PROBLEM_CONTEXT)return c=e.payload,chrome.storage.local.set({latestContext:e.payload}),!0;if(e.type===i.GET_LATEST_CONTEXT)if(c)s({type:i.LATEST_CONTEXT_RESPONSE,payload:c});else return chrome.storage.local.get("latestContext",n=>{s({type:i.LATEST_CONTEXT_RESPONSE,payload:n.latestContext||null})}),!0;if(e.type===i.GENERATE_HINT){const{context:n,userNotes:a,hintLevel:t}=e.payload;return h.generateHint(n,a,t||"basic").then(r=>{s({type:i.HINT_RESPONSE,payload:{hint:r}})}).catch(r=>{s({type:i.HINT_RESPONSE,payload:{error:r.message}})}),!0}return!0}),chrome.tabs.onActivated.addListener(async e=>{try{const o=await chrome.tabs.get(e.tabId);o.url&&(o.url.includes("leetcode.com")||o.url.includes("geeksforgeeks.org"))&&await chrome.scripting.executeScript({target:{tabId:e.tabId},files:["content.js"]})}catch(o){console.log("Could not inject content script:",o)}})})();
