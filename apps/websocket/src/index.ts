import { WebSocketServer } from 'ws';
import { prisma } from '@repo/db';

const wss = new WebSocketServer({ port: 8080 });

console.log("🚀 WebSocket Server started on port 8080");

wss.on('connection', async (ws) => {
  console.log('➕ New client connected');

  try {
    // 1. Generate Random User Details
    const randomId = Math.floor(Math.random() * 10000);
    const username = `User_${randomId}`;
    const password = `pass_${Math.random().toString(36).substring(7)}`;

    console.log(`📝 Creating user: ${username}...`);

    // 2. Insert into Database
    const newUser = await prisma.user.create({
      data: {
        username,
        password
      }
    });

    console.log(`✅ Success! Created User ID: `);

    // 3. Send confirmation to client
    ws.send(JSON.stringify({
      status: 'success',
      message: `User created`,
      user: newUser
    }));

  } catch (error) {
    console.error("❌ Database Error:", error);
    ws.send(JSON.stringify({ status: 'error', message: 'Failed to create user' }));
  }

  ws.on('close', () => {
    console.log('➖ Client disconnected');
  });
});