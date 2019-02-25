#Full Stack Chat Task (FRONTEND)
Description In this task, you need to create a chatroom web app which allow multiple users login/send message/receive message simultaneously. 
The task is to create a chat client and server application. Create separate projects for server and client, and submit your solution as GitHub repository links. Detailed requirements follow. 

##Client 
1. Has two pages landing page (shown when not connected to the server) and chat 
(shown only when connected to the server).
2. Landing page has a box to enter nickname, a button to connect, and also displays feedback like 'Failed to connect. Nickname already taken.', 'Server unavailable.' or 'Disconnected by the server due to inactivity.'.
3. Chat page displays messages from the server together with the sender's nickname (but no messages from before the user's current session started), a box to enter a message, a button to send it, and a button to disconnect from the server.
4. Does not have any inactivity timeouts.
5. Should display landing page if it's disconnected from the server.

UI/UX 
1. Feel free to design/define your own UI and UX 

## How to
1. check out the repo
2. `npm install` in project directory
3. `npm start` to start dev-server on `http://localhost:9000`

The server application, of course, has to be already running at this point
