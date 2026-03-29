---
title: "Build a Personal Website"
pillar: "software-ai"
stage: "builder"
content-type: project
readiness-indicators:
  - "Can type comfortably and navigate a computer file system"
  - "Has completed basic programming exercises (Scratch, simple Python, or similar)"
  - "Understands the concept of files and folders"
  - "Can follow written technical instructions step by step"
learning-objectives:
  - "Write HTML to structure a web page with headings, paragraphs, images, and links"
  - "Write CSS to style a page with colors, fonts, layout, and spacing"
  - "Understand how the internet delivers a web page from a server to a browser"
  - "Deploy a real website to the internet that anyone can visit"
modality: hands-on
duration: "4 sessions, 60 minutes each"
materials:
  - "A computer (Mac, Windows, or Linux)"
  - "A text editor (VS Code — free download at code.visualstudio.com)"
  - "A web browser (Chrome, Firefox, or Safari)"
  - "A free GitHub account (github.com)"
  - "A notebook for sketching your site layout"
  - "A pencil"
safety-level: green
age-range: "9-12"
parent-role: facilitate
---

# Build a Personal Website

## Overview

Every person you admire who works on the internet — every programmer, designer, writer, entrepreneur, scientist — started by building a web page. Not an app. Not a platform. A page. Some text, some images, some colors, some links. That is all a website is at its core.

In this project, you will build your own personal website from scratch. You will write the code by hand — not drag-and-drop, not a template, not a website builder. You will type every line. When you are done, you will deploy it to the real internet, where anyone in the world can visit it by typing in the address.

This is not a toy project. The skills you learn here — HTML and CSS — are the exact same skills used to build every website you have ever visited. Google, Wikipedia, your favorite game's homepage — all HTML and CSS at the foundation.

## What You Will Build

A personal website with three pages:
1. **Home** — who you are, a photo, and what you are interested in
2. **Projects** — a gallery of things you have built, grown, coded, or created
3. **Contact** — how someone can reach you (email only — no phone number, no address)

Each page will have consistent styling — same colors, same fonts, same navigation. It will look like a real website because it will be a real website.

## Session 1: Your First Web Page (60 minutes)

### Setting Up

1. Open VS Code. Create a new folder on your computer called `my-website`.
2. Inside that folder, create a new file called `index.html`. This is your home page. Every website's main page is named `index.html` — that is a convention, not a rule, but follow it.
3. Create two more files: `projects.html` and `contact.html`.
4. Create a folder inside `my-website` called `images`. You will put your photos here later.

Your folder should look like this:
```
my-website/
  index.html
  projects.html
  contact.html
  images/
```

### Writing HTML

HTML stands for HyperText Markup Language. It is not a programming language — it is a markup language. That means it tells the browser what things are (this is a heading, this is a paragraph, this is an image), not what to do. The browser decides how to display them.

Open `index.html` in VS Code and type this exactly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Name - Home</title>
</head>
<body>
    <h1>Hi, I'm [Your Name]</h1>
    <p>I'm [your age] years old and I like building things.</p>
</body>
</html>
```

Replace `[Your Name]` and `[your age]` with your actual name and age.

Save the file. Open it in your web browser (right-click the file, Open With, choose your browser). You should see your heading and paragraph on a white page. It is not pretty yet. That is fine. You just wrote your first web page.

### Understanding the Structure

Every HTML file has the same skeleton:
- `<!DOCTYPE html>` tells the browser this is an HTML5 document
- `<html>` wraps everything
- `<head>` contains information about the page (title, character set) — the browser uses this but does not display it
- `<body>` contains everything visible on the page
- Tags come in pairs: `<h1>` opens a heading, `</h1>` closes it. Everything between them is the heading content.

### Adding More Content

Add these inside the `<body>`, below your paragraph:

```html
    <h2>Things I'm Working On</h2>
    <ul>
        <li>Building a bookshelf in the garage</li>
        <li>Learning to cook pasta from scratch</li>
        <li>This website</li>
    </ul>

    <h2>About This Site</h2>
    <p>I built this website by hand using HTML and CSS. No templates.
    No website builders. Every line of code is mine.</p>
```

Save and refresh your browser. You should see headings, a paragraph, and a bulleted list.

### Adding Navigation

At the top of the `<body>`, above the `<h1>`, add:

```html
    <nav>
        <a href="index.html">Home</a> |
        <a href="projects.html">Projects</a> |
        <a href="contact.html">Contact</a>
    </nav>
```

The `<a>` tag creates a link. The `href` attribute tells the browser where the link goes. Save, refresh, and click the links. They will not show much yet because those pages are empty — but the links work.

### Homework Before Session 2

- Add a photo to your `images/` folder. Name it `me.jpg` or `me.png`.
- Add the image to your page with: `<img src="images/me.jpg" alt="A photo of me">`
- Write the content for `projects.html` and `contact.html`. Copy the HTML skeleton from `index.html` and change the body content. Each page needs the same navigation bar.
- Experiment: try `<h3>`, `<h4>`, `<strong>`, `<em>`, and `<hr>` tags. See what they do.

## Session 2: Making It Look Good with CSS (60 minutes)

### What Is CSS?

CSS stands for Cascading Style Sheets. HTML says what things are. CSS says what they look like. Without CSS, every website would be black text on a white background in Times New Roman. CSS gives you control over colors, fonts, sizes, spacing, and layout.

### Creating a Stylesheet

Create a new file in your `my-website` folder called `style.css`.

In each of your three HTML files, add this line inside the `<head>` section, below the `<title>`:

```html
    <link rel="stylesheet" href="style.css">
```

This tells the browser to load your CSS file and apply its rules to the page.

### Writing Your First Styles

Open `style.css` and type:

```css
body {
    font-family: Georgia, serif;
    max-width: 700px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f5f5f5;
    color: #333333;
    line-height: 1.6;
}

h1 {
    color: #1a1a2e;
    border-bottom: 2px solid #e94560;
    padding-bottom: 10px;
}

h2 {
    color: #16213e;
}

nav {
    background-color: #1a1a2e;
    padding: 15px;
    margin-bottom: 30px;
    border-radius: 5px;
}

nav a {
    color: #e94560;
    text-decoration: none;
    font-weight: bold;
    margin-right: 15px;
}

nav a:hover {
    color: #ffffff;
}

img {
    max-width: 100%;
    border-radius: 8px;
    margin: 20px 0;
}
```

Save both files. Refresh your browser. Your page should look dramatically different — a centered layout with a dark navigation bar, custom colors, and proper spacing.

### Understanding CSS

Each CSS rule has a **selector** (what to style) and **declarations** (how to style it):

```css
h1 {                          /* selector: all h1 elements */
    color: #1a1a2e;           /* declaration: text color */
    border-bottom: 2px solid; /* declaration: a line under it */
}
```

Colors in CSS can be written as names (`red`, `blue`) or hex codes (`#e94560`). Hex codes give you precise control. Search "CSS color picker" online to find colors you like.

### Make It Yours

Change the colors, fonts, and spacing. This is your website — it should reflect your style. Try:
- Different background colors
- A different font (change `Georgia` to `Verdana`, `Helvetica`, `Courier`, or any font name)
- Different text sizes: `font-size: 18px;`
- Different spacing: `padding: 40px;` or `margin-bottom: 50px;`

Every time you make a change, save and refresh. See what happens. If something breaks, undo your last change.

## Session 3: Projects Page and Layout (60 minutes)

### Building the Projects Gallery

Open `projects.html`. In the body, create a grid of your projects. For each project, use this structure:

```html
    <div class="project-card">
        <h3>Bookshelf Build</h3>
        <p>A three-shelf bookshelf made from pine lumber. Built with hand tools,
        finished with Danish oil. Took four sessions in the garage.</p>
    </div>
```

Create 3-4 project cards. Include anything you have made — not just coding projects. A garden, a recipe, a drawing, a catapult, a fort. Every real thing you have built counts.

### Styling the Cards

Add to your `style.css`:

```css
.project-card {
    background-color: #ffffff;
    border: 1px solid #dddddd;
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
}

.project-card h3 {
    color: #e94560;
    margin-top: 0;
}
```

The `.project-card` selector targets any element with `class="project-card"`. Classes let you style specific elements without affecting all elements of the same type.

### The Contact Page

Open `contact.html`. Keep this simple:

```html
    <h1>Contact Me</h1>
    <p>Want to say hi or ask about a project?</p>
    <p>Email me at: <a href="mailto:your@email.com">your@email.com</a></p>
```

Do not put your home address, phone number, or school name on a public website. Email is sufficient.

## Session 4: Deploy to the Internet (60 minutes)

### How the Internet Works (5 minutes)

When someone visits a website, their browser sends a request to a server — a computer that is always on and always connected to the internet. The server finds the HTML file, sends it back, and the browser displays it.

Right now, your website only exists on your computer. To put it on the internet, you need a server. You are going to use GitHub Pages — a free service that hosts static websites.

### Deploying with GitHub Pages

**Step 1:** Go to github.com and sign in (or create a free account).

**Step 2:** Create a new repository. Name it `your-username.github.io` (replacing `your-username` with your actual GitHub username). Check "Public." Click "Create repository."

**Step 3:** Upload your files. Click "uploading an existing file." Drag all your files and folders (`index.html`, `projects.html`, `contact.html`, `style.css`, `images/` folder) into the upload area. Write a commit message: "First version of my personal website." Click "Commit changes."

**Step 4:** Wait 1-2 minutes, then visit `https://your-username.github.io` in your browser.

Your website is live. Anyone in the world can see it.

### Share It

Send the URL to a family member, a friend, or a teacher. Ask them to visit on their phone — does it look okay on a small screen? (It should, because of the `max-width` and responsive image rules you set in CSS.)

## Success Criteria

- The website has three pages (Home, Projects, Contact) with working navigation between them
- All pages share a consistent style via a single CSS file
- The site includes at least one image
- The HTML is hand-written (not generated by a tool)
- The site is deployed and accessible at a public URL
- The student can explain what HTML does versus what CSS does
- The student can change a color, font, or layout element and predict the result before refreshing

## Going Deeper

- **Add a fourth page.** A blog, a reading list, a page about your family — whatever interests you. More pages means more practice.
- **Learn Flexbox.** Search "CSS Flexbox guide" online. Flexbox lets you create side-by-side layouts (like two project cards in a row). It is the most important CSS layout tool.
- **View source on your favorite website.** Right-click any page, click "View Page Source." You will see HTML and CSS — the same languages you just learned. It will be much more complex, but the building blocks are identical.
- **Add JavaScript.** Create a file called `script.js`. JavaScript makes pages interactive — buttons that do things, content that changes, animations. Start with: `alert("Hello, world!");` and link it with `<script src="script.js"></script>` at the bottom of your `<body>`.
