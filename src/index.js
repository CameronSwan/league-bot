require('dotenv').config()

const { Client, GatewayIntentBits, Collection } = require('discord.js')
const connectDB = require('./config/db')
const commandHandler = require('./handlers/commandHandler')
const logger = require('./utils/logger')

const league_bot = new Client({
    intents: [GatewayIntentBits.Guilds]
})

commandHandler(league_bot)

league_bot.once('clientReady', () => {
    logger.info(`Logged in as ${league_bot.user.tag}`)
})

league_bot.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = league_bot.commands.get(interaction.commandName)

    if (!command) return

    logger.info(`${command.commandName}`)

    try {
        await command.execute(interaction)
    } catch (e) {
        logger.error(e)
        await interaction.reply({ content: 'Error executing command.', ephemeral: true })
    }
})

(async () => {
    await connectDB()
    await league_bot.login(process.env.DISCORD_TOKEN)
})()