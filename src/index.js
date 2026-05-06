require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');
const connectDB = require('./config/db');

const league_bot = new Client({
  intents: [GatewayIntentBits.Guilds]
});

league_bot.once('clientReady', () => {
  console.log(`Logged in as ${league_bot.user.tag}`);
});

league_bot.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'ping') {
    await interaction.reply('Pong!');
  }
});

(async () => {
  await connectDB();
  await league_bot.login(process.env.DISCORD_TOKEN);
})();