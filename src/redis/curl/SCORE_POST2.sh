#!/bin/bash

# Player 2
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player2", "playerName": "Bob", "score": 2000}'
