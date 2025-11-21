#!/bin/bash

# Player 3
curl -X POST http://localhost:3000/api/score \
  -H "Content-Type: application/json" \
  -d '{"playerId": "player3", "playerName": "Charlie", "score": 1200}'
