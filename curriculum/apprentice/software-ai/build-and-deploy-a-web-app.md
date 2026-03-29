---
title: "Build and Deploy a Web Application"
pillar: "software-ai"
stage: "apprentice"
content-type: project
readiness-indicators:
  - "Has built at least one static website with HTML, CSS, and basic JavaScript"
  - "Has written programs in at least one language (Python, JavaScript, or similar)"
  - "Can use a terminal or command line for basic operations (navigating directories, running commands)"
  - "Understands variables, functions, loops, and conditionals"
learning-objectives:
  - "Build a full-stack web application with a frontend, backend, and database"
  - "Understand the client-server model — how browsers and servers communicate"
  - "Deploy an application to the internet where real users can access it"
  - "Iterate based on real user feedback"
modality: hands-on
duration: "6-8 weeks (5-10 hours per week)"
materials:
  - "A computer with Node.js installed (nodejs.org)"
  - "VS Code or another text editor"
  - "A GitHub account"
  - "A free-tier account on a hosting platform (Vercel, Railway, or Render)"
  - "A notebook for planning and architecture sketches"
safety-level: green
age-range: "13-15"
parent-role: observe
---

# Build and Deploy a Web Application

## Overview

A static website shows the same thing to everyone. A web application does things — it takes input, processes it, stores data, and returns results. When you log into anything, search for anything, post anything, or save anything online, you are using a web application.

In this project, you are going to build one. Not a tutorial that you follow line by line. A real application that solves a real problem for real people. You will pick the problem. You will design the solution. You will write the code. You will deploy it. And then you will hand it to someone, watch them use it, and find out what you got right and what you got wrong.

This is the hardest project in the software pillar so far. It requires you to hold a complex system in your head — frontend talking to backend talking to database — and make all three work together. There will be days when nothing works and you cannot figure out why. That is normal. Professional developers spend a significant portion of their time debugging. The ability to sit with a broken system, think clearly, and find the problem is the defining skill of software engineering.

## Phase 1: Choose Your Problem (Week 1)

### What to Build

The most common mistake is choosing a project that is too big. Your first web application should be small, useful, and completable in 6 weeks. Here are some ideas:

**Personal tools:**
- A reading tracker — log books you have read, rate them, see your history
- A workout logger — record exercises, sets, reps, and track progress over time
- A recipe box — save recipes, search by ingredient, scale serving sizes
- A study flashcard app — create cards, quiz yourself, track what you know

**Tools for others:**
- A family chore tracker — assign chores, mark them done, see who did what
- A neighborhood tool library — neighbors list tools they own and request to borrow
- A team schedule coordinator — input availability, find times that work for everyone
- A community bulletin board — post and browse local events or requests

Pick something you or someone you know would actually use. If you would not use it yourself, you will lose motivation by week three.

### The One-Page Spec

Before writing any code, write a one-page specification:

1. **Problem:** What problem does this solve? (One sentence.)
2. **Users:** Who will use it? (Be specific.)
3. **Core features:** What does it do? (List 3-5 features maximum. Resist the urge to add more.)
4. **Data:** What does it need to store? (Users? Items? Records? Dates?)
5. **Pages/screens:** Sketch the main pages. What does each one show?

Example spec for a reading tracker:
> **Problem:** I want to remember what I have read and whether I liked it.
> **Users:** Me, and maybe my friends.
> **Core features:** Add a book (title, author, date finished, rating). View all books. Filter by rating. Delete a book.
> **Data:** Books (title, author, date, rating, notes).
> **Pages:** Home (list of all books), Add Book (form), Book Detail (single book view).

This is your blueprint. Everything you build for the next six weeks serves this spec. When you are tempted to add features, ask: "Is this in the spec?" If not, write it on a "future features" list and ignore it until after launch.

## Phase 2: Learn the Stack (Week 2)

### How Web Applications Work

When you visit a web app, here is what happens:

1. Your browser (the **client**) sends a request to a **server**: "Give me the page at this URL."
2. The server receives the request, does some work (often involving reading from or writing to a **database**), and sends back a response — usually HTML, JSON data, or both.
3. Your browser receives the response and displays it.

This is the **client-server model**, and it is the foundation of everything on the internet.

You need three layers:
- **Frontend** (what the user sees): HTML, CSS, JavaScript — renders in the browser
- **Backend** (the logic): A server that handles requests, processes data, and talks to the database
- **Database** (the storage): Where data lives permanently

### Your Tech Stack

For this project, use:

- **Frontend:** HTML + CSS + vanilla JavaScript (no frameworks yet — learn the fundamentals)
- **Backend:** Node.js with Express (a lightweight web framework)
- **Database:** SQLite (a file-based database — no setup required)
- **Deployment:** Vercel, Railway, or Render (all have free tiers)

This is a simple, battle-tested stack. Professional developers use more complex tools, but the principles are identical.

### Setup

Open your terminal and run:

```bash
mkdir my-app
cd my-app
npm init -y
npm install express better-sqlite3
```

This creates a project folder, initializes it as a Node.js project, and installs Express (the web server) and better-sqlite3 (the database driver).

Create this file structure:

```
my-app/
  server.js         (your backend code)
  database.js       (database setup and queries)
  public/           (frontend files)
    index.html
    style.css
    app.js
  data/
    app.db           (created automatically by SQLite)
```

## Phase 3: Build (Weeks 3-5)

### Start with the Data Model

Before writing any UI, define your database tables. For the reading tracker:

```javascript
// database.js
const Database = require('better-sqlite3');
const db = new Database('./data/app.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    date_finished TEXT,
    rating INTEGER CHECK(rating >= 1 AND rating <= 5),
    notes TEXT,
    created_at TEXT DEFAULT (datetime('now'))
  )
`);

module.exports = db;
```

The data model is the skeleton of your application. Get it right and everything else flows from it. Get it wrong and you will be rewriting code constantly.

### Build the API

Your server needs endpoints — URLs that the frontend can call to read and write data.

```javascript
// server.js
const express = require('express');
const db = require('./database');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Get all books
app.get('/api/books', (req, res) => {
  const books = db.prepare('SELECT * FROM books ORDER BY created_at DESC').all();
  res.json(books);
});

// Add a book
app.post('/api/books', (req, res) => {
  const { title, author, date_finished, rating, notes } = req.body;
  const result = db.prepare(
    'INSERT INTO books (title, author, date_finished, rating, notes) VALUES (?, ?, ?, ?, ?)'
  ).run(title, author, date_finished, rating, notes);
  res.json({ id: result.lastInsertRowid });
});

// Delete a book
app.delete('/api/books/:id', (req, res) => {
  db.prepare('DELETE FROM books WHERE id = ?').run(req.params.id);
  res.json({ success: true });
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
```

Test each endpoint before building the frontend. Use your browser for GET requests (visit `http://localhost:3000/api/books`). Use a tool like `curl` in the terminal for POST and DELETE.

### Build the Frontend

Now connect the UI to the API. Your `public/app.js` will fetch data from the server and render it in the browser:

```javascript
// Load and display all books
async function loadBooks() {
  const response = await fetch('/api/books');
  const books = await response.json();
  const list = document.getElementById('book-list');
  list.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book-card';
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>${book.author} — ${'★'.repeat(book.rating)}</p>
      <button onclick="deleteBook(${book.id})">Remove</button>
    `;
    list.appendChild(div);
  });
}

loadBooks();
```

Build incrementally. Get one feature working completely before starting the next. The order should be:
1. Display data (read from database, show in browser)
2. Add data (form submission, write to database)
3. Delete data
4. Filter or search
5. Polish (styling, error handling, loading states)

### The Debugging Mindset

When something breaks (and it will), follow this process:

1. **Read the error message.** It usually tells you exactly what is wrong and which line to look at.
2. **Check the browser console** (F12 or right-click, Inspect, Console tab). Frontend errors appear here.
3. **Check the terminal** where your server is running. Backend errors appear here.
4. **Add console.log() statements** to trace data flow. "Is the data reaching the server? Is the query running? Is the response coming back?"
5. **Isolate the problem.** Is it the frontend, the backend, or the database? Test each layer independently.
6. **Search the error message.** Copy-paste the exact error into a search engine. Someone has encountered it before.

Do not guess randomly. Do not change code hoping something will work. Diagnose first, then fix.

## Phase 4: Deploy (Week 6)

### Going Live

Your app runs on your computer at `localhost:3000`. That means only you can use it. To put it on the internet, you need to deploy it to a server that is always on.

**Using Railway (recommended for beginners):**
1. Push your code to a GitHub repository
2. Sign up at railway.app with your GitHub account
3. Create a new project and connect your GitHub repo
4. Railway detects it is a Node.js app and deploys automatically
5. It gives you a public URL like `my-app.up.railway.app`

**Important:** Your SQLite database file must be in a directory that persists between deploys. For production apps, you would use a hosted database (PostgreSQL, MySQL). For this project, SQLite on Railway works for small-scale use.

### Testing in Production

Visit your live URL. Does everything work? Test every feature:
- Add data. Does it save?
- Refresh the page. Is the data still there?
- Delete data. Does it disappear?
- Open it on your phone. Does the layout work?

Fix any issues before sharing.

## Phase 5: Get Feedback (Weeks 7-8)

### Real Users

Share your app with 3-5 people who fit your user description. Do not explain how to use it — just give them the URL and watch. Note:
- Where do they get confused?
- What do they try to do that does not work?
- What do they say they wish it did?

This is user testing. It is humbling. Features you thought were obvious will confuse people. Things you thought were secondary will turn out to be the most wanted. This is normal and this is the point.

### Iterate

Pick the top 2-3 pieces of feedback and implement them. Deploy the updates. Tell your testers. This cycle — build, deploy, get feedback, improve — is the core loop of software development. It never ends.

## Success Criteria

- The application has a working frontend, backend, and database
- Users can create, read, and delete data through the browser
- The app is deployed and accessible at a public URL
- At least 3 people outside the student's family have used the application
- The student received feedback and implemented at least one change based on it
- The student can explain how a request flows from the browser through the server to the database and back
- The student can identify and describe at least two bugs they encountered and how they fixed them

## Common Pitfalls

- **Building too many features before testing any.** Get one feature working end-to-end before starting the next. A working app with one feature is infinitely better than a broken app with five.
- **Ignoring error handling.** What happens if someone submits an empty form? If the database is not reachable? If the URL is wrong? Handle errors gracefully — show a message, do not crash.
- **Not using version control.** Commit to Git after every working feature. If you break something, you can go back. Without version control, you are building without a safety net.
- **Getting stuck for hours without asking for help.** If you have spent more than 30 minutes on the same bug, describe the problem out loud (to a person, a rubber duck, or a written note). If that does not solve it, search online. If that does not solve it, ask a mentor or a programming community.
- **Comparing to professional apps.** Instagram has thousands of engineers. You are one person. Your app will not look like Instagram. It will look like a well-built tool made by one determined person, and that is exactly what it should look like.

## Going Deeper

- **Add user authentication.** Let users create accounts and log in. This is the next major step in web development. Research session-based authentication or JSON Web Tokens (JWT).
- **Switch to PostgreSQL.** Replace SQLite with a hosted PostgreSQL database. This is what production applications use. Services like Supabase or Neon offer free tiers.
- **Learn a frontend framework.** React, Vue, or Svelte — pick one and rebuild your frontend. Frameworks make complex UIs manageable but add complexity. Only learn one after you understand vanilla JavaScript well.
- **Read *The Pragmatic Programmer* by Hunt and Thomas.** The best book on the craft and mindset of software development. It will change how you think about code.
