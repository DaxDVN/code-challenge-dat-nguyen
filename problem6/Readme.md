# Live Scoreboard Update Module

## Purpose

This module handles the logic and security rules for updating user scores and refreshing the **Top 10** scoreboard in real time.

---

## Features

### Core Features

Validate user authorization via secure token.
Validate the action type before processing.
Fetch and update the user's score.
Recalculate and update the Top 10 scoreboard if necessary.
Emit real-time scoreboard updates to all connected clients via Socket.IO if the leaderboard changes.

### Supporting Features

- Rate limiting to prevent abuse.
- Audit log for tracking all score changes.

---

## Technologies Used

- Node.js
- Express.js
- TypeScript
- MongoDB
- Socket.IO

## API Endpoint

Method URL Description
PUT /score Update user's score
GET /score-board Get the current scoreboard

## Input

| Field      | Type   | Description                       |
| ---------- | ------ | --------------------------------- |
| userId     | string | ID of the user                    |
| actionType | number | Type of the action                |
| scoreAdd   | number | Points to add to the user's score |

_Request body example_

```json
{
  "userId": "user123",
  "actionType": 1,
  "scoreAdd": 10
}
```

---

## Output

| Field        | Type    | Description                |
| ------------ | ------- | -------------------------- |
| success      | boolean | Status of the score update |
| message      | string  | Description of the result  |
| currentScore | number  | User's updated score       |

_Response example_

```json
{
  "success": true,
  "message": "Score updated!",
  "currentScore": 10
}
```

Real-time Mechanism
This module uses Socket.IO to push real-time updates to all connected clients whenever the Top 10 scoreboard changes.

Socket Events
Event Name Direction Payload Description
scoreboard_update Server -> Client { top10: string[] } Broadcasts the updated Top 10 scoreboard to all clients

_Response example_

{
"top10": ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"]
}

---

## Main Processing Flow

Main Processing Flow
User completes an action, triggering an API request to update the score.
Backend validates the user’s authorization token.
Action type is validated to ensure it’s eligible for scoring.
Current user score is fetched and updated with the new points.
System checks if the updated score affects the Top 10 leaderboard.
If the Top 10 changes, the new leaderboard is saved and a scoreboard_update event is broadcast to all connected clients via Socket.IO.
Rate limiting is applied to prevent excessive requests.
All changes are logged for auditing.
Response is sent back to the user with the result and whether the ranking changed.

---

## Notes

This module supports real-time notifications using Socket.IO.
All connected clients will receive automatic updates when the Top 10 changes.
The system can be extended to support reconnection handling and client-side event processing.

## Improvement Suggestions

Cache Top 10 leaderboard: Store the Top 10 leaderboard in Redis or in-memory cache to avoid querying the database on every update or request.

Configurable action scores: Define scores for each action (actionType) in a configuration file or a separate database table to allow easy adjustments without changing the code.

Request security enhancement: Add request signature mechanisms to ensure data integrity and prevent tampering, especially for score updates.

Handle Socket.IO reconnection: When a client reconnects after disconnection, immediately send the latest Top 10 leaderboard to ensure the client has the most up-to-date data.