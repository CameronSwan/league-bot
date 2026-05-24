const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('register')
        .setDescription('Register as a player.'),

    async execute(interaction) {
        const existing = await Player.findOne({ discordId: discordId, isDeleted: false })
        if (existing) {
            return interaction.reply({
                content: 'You are already registered.',
                ephemeral: true,
            })
        }

        const Player = require('../models/Player')
        const discordId = interaction.user.id

        const player = await Player.create({
            discordId,
            firstName: interaction.user.username,
            admin: false,
            contactInfo: [],
            infractions: [],
        })

        return interaction.reply({
            content: `Registered successfully! Welcome ${player.firstName}`,
            ephemeral: true,
        })
    }
}