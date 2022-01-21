// Entry point for our bot

// First configures dotenv
// Then it loads client.js which initializes, logs in, and exports the client 
// Afterwards it loads up all the commands/handlers as defined in commands.js

export * from './configure-environment.js';

import client from './client.js';
import commands from './commands/commands.js';

import { subscriptions } from './music/subscription.js'

// This block makes it so command names (keys inside commands.js) are mapped to their respective 'execute' function 
client.on('interactionCreate', async (interaction) => {
    if (interaction.isCommand() && commands[interaction.commandName]) {
        await commands[interaction.commandName].execute(interaction);
    }
})

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log('The bot is ready to listen to commands');
});

// Heroku Cycling
process.on('SIGTERM', async () => {
    subscriptions.forEach((subscription) => {
        await subscription.lastTextChannel.send("Daily Heroku restart cycle occurred (bot is restarting), queue will be lost")
        subscription.terminate();
    })
    console.log(`Process ${process.pid} received a SIGTERM signal`)
    process.exit(0)
  })