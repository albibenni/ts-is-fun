import express, { type Request, type Response } from "express";
import { WebSocketServer, WebSocket } from "ws";
import { createClient } from "redis";

const app = express();

const PORT = 3000;
const server = app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Attach WebSocket server to the HTTP server created by Express
const wss: WebSocketServer = new WebSocketServer({ server });
app.use(express.json());
app.use(express.static("public"));

// Type for our message structure
interface LeaderboardUpdate {
  type: "SCORE_UPDATE";
  playerId: string;
  playerName: string;
  score: number;
  leaderboard: string[];
}

// Redis clients
const client = createClient({ url: "redis://localhost:6379" });
const subscriber = client.duplicate();

// Track connected clients
const clients = new Set<WebSocket>();

// Connect to Redis
await client.connect();
await subscriber.connect();
console.log("Redis connected");

// WebSocket connection handling
wss.on("connection", (ws: WebSocket) => {
  clients.add(ws);
  console.log("Client connected. Total:", clients.size);

  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected. Total:", clients.size);
  });
});

// Subscribe to Redis channel
await subscriber.subscribe("leaderboard:updates", (message: string) => {
  console.log("Broadcasting update to", clients.size, "clients");

  clients.forEach((ws) => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(message);
    }
  });
});

// API endpoint to submit score
app.post("/api/score", (req: Request, res: Response) => {
  void (async () => {
    try {
      const { playerId, playerName, score } = req.body as {
        playerId?: string;
        playerName?: string;
        score?: number;
      };

      if (!playerId || !playerName || typeof score !== "number") {
        res.status(400).json({ error: "Invalid input" });
        return;
      }

      // Update leaderboard
      await client.zAdd("leaderboard", { score, value: playerId });

      // Store player name (hash)
      await client.hSet(`player:${playerId}`, "name", playerName);

      // Get top 10 with scores
      const top10 = await client.zRangeWithScores("leaderboard", 0, 9, {
        REV: true,
      });

      // Publish update
      const update: LeaderboardUpdate = {
        type: "SCORE_UPDATE",
        playerId,
        playerName,
        score,
        leaderboard: top10.map((item) => `${item.value}:${item.score}`),
      };

      await client.publish("leaderboard:updates", JSON.stringify(update));

      res.json({ success: true });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  })();
});

// Get current leaderboard
app.get("/api/leaderboard", (_req: Request, res: Response) => {
  void (async () => {
    try {
      const top10 = await client.zRangeWithScores("leaderboard", 0, 9, {
        REV: true,
      });

      // Get player names
      const leaderboard = await Promise.all(
        top10.map(async (item) => {
          const name = await client.hGet(`player:${item.value}`, "name");
          return {
            playerId: item.value,
            playerName: name || "Unknown",
            score: item.score,
          };
        }),
      );

      res.json(leaderboard);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  })();
});
