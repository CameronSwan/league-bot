const fs = require('fs')
const path = require('path')

module.exports = (league_bot) => {
    league_bot.commands = new Map()

    const commandsPath = path.join(__dirname, '../commands')

    const loadCommands = (dir) => {
        const files = fs.readdirSync(dir)

    for (const file of files) {
        const fullPath = path.join(dir, file)

        if (fs.lstatSync(fullPath).isDirectory()) {
            loadCommands(fullPath)
        } else if (file.endsWith('.js')) {
            const command = require(fullPath)

            league_bot.commands.set(command.data.name, command)
        }
        }
    }

    loadCommands(commandsPath);
}