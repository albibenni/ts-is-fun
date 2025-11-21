#!/bin/bash

# Update Player 1's score
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player1", "playerName": "Alice", "score": 2500}'
