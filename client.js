
// Import the necessary discord.js classes
import { Client, Intents } from 'discord.js'

// Create a new client instance and give it the intents that we need for this bot
const client = new Client({ intents: [Intents.FLAGS.GUILDS, "GUILD_MESSAGES", 'GUILD_VOICE_STATES'], partials: ["CHANNEL"] });

// Login to Discord with the client's token
await client.login(process.env.BOT_TOKEN);

export default client;