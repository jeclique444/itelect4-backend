# ITELECT4 Backend - Peer Tutoring API

[![CI](https://github.com/jeclique444/itelect4-backend/actions/workflows/ci.yml/badge.svg)](https://github.com/jeclique444/itelect4-backend/actions/workflows/ci.yml)

A robust REST API built with Express and TypeScript, powering a Peer Tutoring Platform. It handles user authentication, tutoring session management, and integrates with Google's Gemini AI to provide automated reviews for session plans.

## 🔗 Live URLs

*   **Live Backend API:** [https://itelect4-backend-neon.vercel.app](https://itelect4-backend-neon.vercel.app)
*   **Live Frontend App:** [https://itelect4-project-two.vercel.app](https://itelect4-project-two.vercel.app)
*   **Frontend Repository:** [https://github.com/jeclique444/itelect4-project](https://github.com/jeclique444/itelect4-project)

## 🏗️ Architecture

```mermaid
flowchart LR
  fe["itelect4-project<br/>React + Vite on Vercel"]
  be["itelect4-backend<br/>Express on Vercel"]
  db[("MongoDB Atlas")]
  ai["Gemini API"]
  
  fe -- "fetch + Bearer token" --> be
  be -- "Mongoose" --> db
  be -- "GEMINI_API_KEY" --> ai