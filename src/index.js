require('dotenv').config()

const { Client, GatewayIntentBits, Collection } = require('discord.js')
const connectDB = require('./config/db')
const commandHandler = require('./handlers/commandHandler')
const logger = require('./utils/logger')('API')
const handleError = require('./utils/handleError')

const league_bot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
})

commandHandler(league_bot)

league_bot.once('clientReady', () => {
    logger.info('Client connected to server.', {
        type: 'SYSTEM',
    })
})

league_bot.on('messageCreate', (message) => {
    if (message.author.bot) return

    logger.info(message.content, {
        type: 'MESSAGE',
        user: message.author.displayName,
        channel: message.channel?.name || 'Direct Message',
    })
})

league_bot.on('voiceStateUpdate', (oldState, newState) => {

    const user = newState.member?.displayName || newState.member?.user.tag;

    // LEAVE (or move out of a channel)
    if (oldState.channel && (!newState.channel || oldState.channel.id !== newState.channel.id)) {
        logger.info('', {
            type: 'VOICE_LEAVE',
            channel: oldState.channel.name,
            user: newState.member?.displayName,
        });
    }

    // JOIN (or move into a channel)
    if (newState.channel && (!oldState.channel || oldState.channel.id !== newState.channel.id)) {
        logger.info('', {
            type: 'VOICE_JOIN',
            channel: newState.channel.name,
            user: newState.member?.displayName,
        });
    }
});

league_bot.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand()) return

    const command = league_bot.commands.get(interaction.commandName)

    if (!command) return

    logger.info('', {
        type: 'COMMAND',
        channel: interaction.channel?.name || 'Direct Message',
        user: interaction.user.displayName,
        command: interaction.commandName,
    })

    try {
        await command.execute(interaction)
    } catch (e) {
        await handleError(e, logger)
        await interaction.reply({ content: 'Error executing command.', ephemeral: true })
    }
});

(async () => {
    try {
        logger.info('Attempting to connect to database...', {
            type: 'SYSTEM',
        })
        await connectDB()
        logger.info('Database connection successful.', {
            type: 'SYSTEM'
        })
    } catch (e) {
        await handleError(e, logger, true)
    }
    try {
        logger.info('Attempting to connect to server...', {
            type: 'SYSTEM',
        })
        await league_bot.login(process.env.DISCORD_TOKEN)
    } catch (e) {
        await handleError(e, logger, true)
    }
})()