# TIE clone (https://takeiteasyengineers.com/)

<code>git clone https://github.com/Siddu-06-0405/tie.git</code>

<b>cd into the project folder and then run the following commands</b>

<code>npm install</code>

<code>npm run dev</code>

## Create a .env file in the backend folder
in .env <br>
PORT=5001 <br>
NODE_ENV=development <br>
MONGO_DB_URI="your mongodb connection url" <br>
<br>
to run in production mode <br>
in .env <br>
<code>npm run build</code>
PORT=5001 <br>
NODE_ENV=production <br>
MONGO_DB_URI="your mongodb connection url" <br>
<code> cd backend && node server.js </code>

<b>Now, open a new terminal and run the following command.</b>

<code>node backend/server.js</code>
