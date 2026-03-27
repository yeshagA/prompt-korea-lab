# 프롬프트하늘 — Prompt Haneul 🇰🇷

> A Korean-native AI prompt learning platform with structured localization, trusted certification, and an interactive AI playground.

**Team:** Bumblebee &nbsp;|&nbsp; **University:** Woosong University &nbsp;|&nbsp; **Department:** AI & Big Data &nbsp;|&nbsp; **Date:** 2026-03-26

---

## 📌 Table of Contents

- [About the Project](#about-the-project)
- [Core Features](#core-features)
- [System Architecture](#system-architecture)
- [Tech Stack](#tech-stack)
- [Team Members](#team-members)
- [Getting Started](#getting-started)
- [Development Schedule](#development-schedule)
- [Future Scope](#future-scope)

---

## 📖 About the Project

Most AI learning platforms available today are simply translated from English — they are not truly built for Korean users. **Prompt Haneul (프롬프트하늘)** solves this by building a Korea-native AI prompt learning platform from the ground up.

### Problem We Are Solving

| Problem | Our Solution |
|---|---|
| Content is translated but not properly localized | Structured Localization Pipeline with QA review |
| No Korea-native product experience | Korean-first UX design and onboarding |
| Certificates lack real-world credibility | Trusted Certification System with public verification |
| No integration with AI learning tools | Prompt Playground powered by OpenAI API |

---

## ✨ Core Features

### Must-Have Features
| Feature | Description |
|---|---|
| 🔐 User Authentication | Sign up / sign in with Google or Naver OAuth |
| 🛡️ System Security & Access Control | Role-based access for students, reviewers, admins, employers |
| 📚 Learning Content Management | Structured AI prompt learning modules |
| 🌐 Localization Management System | English → Korean translation pipeline with review & QA |
| 🇰🇷 Korean Product Experience | Personalized learning paths and local onboarding |
| 🏅 Certification System | Certificate generation with public verification and revocation |
| 📈 Progress Tracking | Track user learning progress across modules |
| 📊 Analytics & Reporting | System performance and user engagement reports |

### Nice-to-Have Features
| Feature | Description |
|---|---|
| 🤖 Prompt Playground | Interactive AI chat powered by OpenAI API |
| 💬 Community & Sharing | Share prompts and learning progress with other users |

---

## 🏗️ System Architecture

The system uses a **Pipeline-Based Modular Architecture** — each feature area runs as its own independent pipeline behind a central API Gateway.

```
Users (Students / Reviewers / Admins / Employers)
        ↓
   Frontend (React.js Web App)
        ↓
     API Gateway
   (Auth · Routing · Validation)
        ↓
┌──────────────────────────────────────────────────┐
│  Learning  │ Localization │ Certification │ Prompt │
│  Pipeline  │  Pipeline    │   Pipeline    │ Playground│
└──────────────────────────────────────────────────┘
        ↓
  Analytics & Feedback Layer
        ↓
       Shared Infrastructure
  (PostgreSQL · Redis · Object Storage · Git)
        ↓
  External Services
  (OpenAI API · OAuth · Email · Monitoring)
```

### Main Data Flows

| Flow | Steps |
|---|---|
| 📝 Localization | English content → Localization pipeline → Review & QA → Published Korean content |
| 🎓 Learning | Korean user → Frontend → Personalized learning path → Learning pipeline |
| 🏅 Certification | Course completion → Certification pipeline → Certificate generation → Public verification |
| 🤖 AI Playground | User prompt → Prompt Playground → OpenAI API → AI response → Saved history |

---

## 🛠️ Tech Stack

### Frontend
| Tool | Purpose |
|---|---|
| React.js | Frontend framework |
| TypeScript | Type-safe development |
| Tailwind CSS | Styling |
| Vite | Build tool and dev server |

### Backend
| Tool | Purpose |
|---|---|
| Python + FastAPI | Backend API framework |
| PostgreSQL | Main database |
| Redis | Caching system |
| Docker | Containerization |

### External Services
| Service | Purpose |
|---|---|
| OpenAI API | AI response generation for Prompt Playground |
| Google / Naver OAuth | User login providers |
| Git (GitHub) | Version control |

---

## 👥 Team Members

| Name | Student ID | Role | Responsibilities |
|---|---|---|---|
| Khan Zesan Ahmed | 202312148 | Leader · Frontend Developer | UI pages, components |
| Firdavs Salokhiddinov | 202312063 | Technical Leader · Backend Developer | Architecture, backend, verification |
| Gandhi Yesha Nilesh | 202312172 | Co-Leader · UX & UI Design | Landing, flow, roadmap |
| Ahmed Tanjir | 202312112 | Unit Tester | Responsive UI, integration |
| Muhammad Ali Naeem | 202430246 | Frontend Developer | Testing, bugs, validation |
| Solmin Hong | 202310638 | UX & UI Design | Visuals, consistency, localization |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed before you begin:

| Tool | Version | Download |
|---|---|---|
| Node.js | v18 or higher | https://nodejs.org |
| Git | Latest | https://git-scm.com |
| VS Code | Latest | https://code.visualstudio.com |

### Installation & Running Locally

**1. Clone the repository**
```bash
git clone https://github.com/yeshagA/prompt-korea-lab.git
cd prompt-korea-lab
```

**2. Install dependencies**
```bash
npm install
```

**3. Start the development server**
```bash
npm run dev
```

**4. Open in your browser**
```
http://localhost:8080
```

The site will hot-reload automatically whenever you save a file. ✅

---

### ⚠️ Team Workflow — Read This Before You Start Working

Every time you sit down to work, follow this order to avoid conflicts:

```bash
# 1. Pull latest changes from GitHub FIRST
git pull

# 2. Install any new packages your teammates may have added
npm install

# 3. Start the dev server
npm run dev

# 4. After your work is done, push your changes
git add .
git commit -m "describe what you changed"
git push
```

> 💡 **Always `git pull` before starting work.** If you skip this and your teammate pushed changes, you will get merge conflicts which are annoying to fix.

---

## 📅 Development Schedule

| Phase | Weeks | Tasks |
|---|---|---|
| 🔍 Planning | Week 1–3 | Requirements analysis, system design, proposal presentation |
| ⚙️ Core Development | Week 4–6 | Login system, learning module, basic backend |
| 🌐 Localization | Week 7–8 | Translation workflow, glossary, review system |
| 🏅 Certification & AI | Week 9–10 | Certificate generation, AI prompt playground integration |
| 🔗 Integration | Week 11–12 | Connect all pipelines, ensure full system works |
| 🧪 Testing | Week 13–14 | Fix bugs, improve performance, validate workflows |
| 🎉 Final | Week 15 | Final testing, demo preparation, presentation |

---

## 🔭 Future Scope

- 🌍 Add support for more languages beyond Korean
- 📱 Develop a mobile application
- 🤖 Introduce advanced AI-based analytics and personalized recommendations
- 🤝 Expand to industry partnerships and onboard real users

---

## 📄 License

This project is an academic prototype developed at **Woosong University** for the AI & Big Data department capstone project.

---

<div align="center">
  Made with ❤️ by Team Bumblebee 🐝 — Woosong University 2026
</div>