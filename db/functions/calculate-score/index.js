// calculate-score.js
// Supabase Edge Function for calculating personality test scores

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  try {
    const { answers, meta } = await req.json();
    
    // Simple scoring algorithm (to be expanded)
    const score = {
      C: 0, // Coding
      P: 0, // Problem Solving
      A: 0, // Architecture
      L: 0, // Learning
      M: 0, // Mindset
      total: 0
    };
    
    // Calculate scores based on answers
    for (const answer of answers) {
      // This is a simplified example - in reality, you would have a more complex algorithm
      if (answer.value >= 1 && answer.value <= 5) {
        // For Likert scale questions
        score.P += answer.value * 10; // Example calculation
        score.L += answer.value * 8;
        score.A += answer.value * 6;
        score.M += answer.value * 7;
        score.C += answer.value * 9;
      } else {
        // For SJT questions
        if (answer.value === "협의 후 조정") {
          score.A += 20;
          score.M += 15;
        } else if (answer.value === "팀장에게 escalation") {
          score.M -= 10;
          score.A += 5;
        } else if (answer.value === "무리해서라도 시도") {
          score.C += 25;
          score.M += 10;
          score.L += 15;
        } else if (answer.value.includes("git push --force")) {
          score.M -= 20;
          score.A -= 15;
        }
      }
    }
    
    // Normalize scores (0-100 range)
    Object.keys(score).forEach(key => {
      if (key !== 'total') {
        score[key as keyof typeof score] = Math.min(100, Math.max(0, score[key as keyof typeof score]));
      }
    });
    
    // Calculate total
    const total = (score.C + score.P + score.A + score.L + score.M) / 5;
    score.total = Math.round(total);
    
    // Determine archetype based on scores
    let archetype = "전략가형 🧠";
    if (score.C > 80 && score.L > 80) {
      archetype = "코드 장인형 🔨";
    } else if (score.A > 80 && score.P > 80) {
      archetype = "전략가형 🧠";
    } else if (score.M > 80) {
      archetype = "팀워크 리더형 🤝";
    } else if (score.L > 90) {
      archetype = "성장 곡선형 🚀";
    }
    
    return new Response(
      JSON.stringify({ score, archetype }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
});