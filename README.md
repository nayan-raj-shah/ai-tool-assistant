# AI Tool Assistant

AI-powered chat application with streaming responses and tool calling.

---

## 🛠 Requirements

- Node.js 18+
- PostgreSQL (local or cloud)
- npm / pnpm

---

## 🚀 Setup

### 1. Clone the repository

```bash
git clone https://github.com/nayan-raj-shah/ai-tool-assistant
cd ai-tool-assistant

2. Install dependencies
npm install

🔑 Environment Variables

Create a .env.local file in the project root:

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/db_name

# Auth
NEXTAUTH_SECRET=your-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# GROQ AI
GROQ_API_KEY=your-groq-key
Only one AI provider key is required.

🗄 Database Setup
npm run db:push

▶️ Run the App
npm run dev


Open:

http://localhost:3000

✅ Verify Setup

Try one of the following prompts:

What's the weather in Berlin?
Show AAPL stock price
When is the next F1 race?