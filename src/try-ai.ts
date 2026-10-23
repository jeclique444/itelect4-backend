import "dotenv/config";
import { reviewSession } from "./ai/gemini";

// npm run try-ai. One real request to Gemini from your terminal -- the same
// function POST /api/ai calls, with no Express, no token and no database.
async function tryAi() {
  const review = await reviewSession(
    "A 2-hour study session for ITELECT4 covering React Router and " +
      "protected routes. I'll re-read the lecture for 30 minutes, then " +
      "rebuild the login flow from scratch, then test it in Postman.",
  );
  console.log(JSON.stringify(review, null, 2));
}

tryAi().catch((err: unknown) => {
  console.error("Gemini call failed:", err);
  process.exit(1);
});