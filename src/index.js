require('dotenv').config();

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const connectDB = require('./config/db');
const commandHandler = require('./handlers/commandHandler');

const league_bot = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// Load commands
commandHandler(client);

league_bot.once('ready', () => {
  console.log(`Logged in as ${league_bot.user.tag}`);
});

// Handle interactions
league_bot.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  const command = league_bot.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Error executing command.', ephemeral: true });
  }
});

// Start bot
(async () => {
  await connectDB();
  await league_bot.login(process.env.DISCORD_TOKEN);
})();