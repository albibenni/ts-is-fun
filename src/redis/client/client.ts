import { z } from "zod/v4";

const LeaderboardUpdateSchema = z.object({
  type: z.literal("SCORE_UPDATE"),
  playerId: z.string(),
  playerName: z.string(),
  score: z.number(),
  leaderboard: z.array(z.string()),
});

type LeaderboardUpdate = z.infer<typeof LeaderboardUpdateSchema>;

const ws = new WebSocket("ws://localhost:3000");

ws.onopen = () => console.log("Connected to leaderboard");

ws.onmessage = (event: MessageEvent<string>) => {
  const data: LeaderboardUpdate = LeaderboardUpdateSchema.parse(
    JSON.parse(event.data),
  );
  console.log("Update:", data);
  // Update UI here
};

ws.onerror = (error) => console.error("WebSocket error:", error);
