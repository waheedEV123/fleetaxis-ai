# FleetAxis AI — Phase 2
## AI Operating System for Fleet Intelligence

Built by Waheed Syed · FleetAxis Advisory · Powered by Claude

---

## What's included in Phase 2

| Page | Route | Description |
|---|---|---|
| Login | `/login` | Enterprise login with SSO buttons |
| Signup | `/signup` | 4-step onboarding wizard |
| AI Copilot Home | `/dashboard` | Main chat interface with metric cards |
| Projects | `/dashboard/projects` | Client engagement management |
| Data Sources | `/dashboard/data-sources` | 8 file type upload and management |
| Chat API | `/api/chat` | Claude API with web search and usage limits |

---

## Deploy to Vercel

### 1. Push to GitHub
Use GitHub Desktop or the GitHub web editor (press `.` in your repo) to upload all files maintaining the folder structure:
```
src/
  app/
    dashboard/
    login/
    signup/
    api/
    components/
package.json
next.config.js
.nvmrc
```

### 2. Connect to Vercel
- Go to `vercel.com` → Add New Project → Import `fleetaxis-ai`
- Framework: **Next.js** (auto-detected)
- Root Directory: `fleetaxis` (if folder was uploaded as subfolder) or blank
- Click Deploy

### 3. Environment Variables
Go to Vercel → Settings → Environment Variables → Add:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | `sk-ant-...` from console.anthropic.com |

### 4. Redeploy
Deployments → ⋯ → Redeploy

---

## Login credentials (change before sharing with clients)

| Username | Password | Role |
|---|---|---|
| waheed | fleetaxis2024 | Admin |
| client1 | demo1234 | Client |

To add clients: edit `src/app/login/page.js` and `src/app/signup/page.js`

---

## Pages coming in Phase 3

- Reports Center (PDF, Excel, PowerPoint export)
- Fleet Health Score /100
- Benchmarking Module
- Admin Dashboard (Customer management, MRR, usage analytics)
- Knowledge Base
- Notifications

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15.3.6 |
| UI | React 19.1.4 + inline styles |
| AI | Anthropic Claude claude-sonnet-4-5 |
| Web Search | Anthropic web_search tool |
| File parsing | SheetJS (xlsx) |
| Fonts | Sora + JetBrains Mono |
| Deployment | Vercel |

---

## Folder structure

```
src/
  app/
    components/
      DashboardLayout.js     ← Sidebar navigation shared component
    dashboard/
      page.js                ← AI Copilot home chat
      data-sources/
        page.js              ← Data Sources file management
      projects/
        page.js              ← Projects management
    api/
      chat/
        route.js             ← Claude API with web search
    login/
      page.js                ← Login screen
    signup/
      page.js                ← 4-step signup wizard
    layout.js                ← Root layout
    globals.css              ← Global styles and fonts
    page.js                  ← Root redirect to login
```

---

## Contact
Waheed Syed · FleetAxis Advisory · waheed@fleetaxis.com
