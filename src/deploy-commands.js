require('dotenv').config()

const fs = require('fs')
const path = require('path')
const { REST, Routes } = require('discord.js')

const commands = []
const commandsPath = path.join(__dirname, 'commands')

const loadCommands = (dir) => {
    const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)

        if (fs.lstatSync(fullPath).isDirectory()) {
            loadCommands(fullPath)
        } else if (file.endsWith('.js')) {
            const command = require(fullPath)
            commands.push(command.data.toJSON())
        }
    }
}

loadCommands(commandsPath)

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('Deploying commands...')

        await rest.put(
            Routes.applicationGuildCommands(
                process.env.CLIENT_ID,
                process.env.GUILD_ID
            ),
            { body: commands }
        )

        console.log(`${commands.length} command(s) deployed!`)
    } catch (e) {
        console.error(e)
    }
})()