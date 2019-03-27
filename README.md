Welcome to the MYtinerary App. A travel app built using the MERN stack with Material UI.

Heroku Deployment Link : https://guarded-sands-60894.herokuapp.com/

<p>You will need to create a .env file in your root folder with the following info : </p>
<pre><code>
MONGO_URI = "YOUR_OWN_MONGO_URI"
SECRET_OR_KEY = "YOUR_OWN_SECRET"
googleClientID = "YOUR_GOOGLECLIENTID_SECRET"
googleClientSecret = "YOUR_GOOGLECLIENT_SECRET"
</code></pre>

Quick Start

# Install dependencies for server

npm install

# Install dependencies for client

npm run client-install

# Run the client & server with concurrently

npm run dev

# Run the Express server only

npm run server

# Run the React client only

npm run client

# Server runs on http://localhost:5000 and client on http://localhost:3000
