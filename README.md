# Discord DiceDealer

Dice dealer is a bot rolling dices. Its is intended to 
be used for D&D and WH games.

## Installation

This was tested on Linux and will probably fail to run on other OS.

You will need the Node.js.

Clone this repo:

`git clone https://github.com/JaredSpb/discord-dice-dealer`

Install deps

`npm install`

Register a new application using (Discord developer portal)[https://discord.com/developers/applications].
Note the Application ID, we will need this later. Move to the `Bot` page, toggle the 
'Message Content Intent' checkbox. Click 'Reset Token' button, save the token provided 
into the `key.txt` in the bot's root dir. 

Run the bot with `node index.js`.

Invite the bot to your channel using the https://discordapp.com/api/oauth2/authorize?scope=bot&client_id=%YOUR_BOT_APPLICATION_ID% link (replace the `%YOUR_BOT_APPLICATION_ID%` with the registered application id).

Land the `!help` message to read help on bot usage.
