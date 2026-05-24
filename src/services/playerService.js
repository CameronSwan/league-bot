const mongoose = require('mongoose')
const Player = require('../models/Player')

const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

const getPlayerByDiscordId = async (discordId) => {

}

const createPlayer = async ({
    firstName,
    lasteName = null,
    discordId,
    contactInfo = []
}) => {
    const existingPlayer = await getPlayerByDiscordId(playerData.discordId)
    if (existingPlayer) return existingPlayer

    return await Player.create({
        firstName,
        lastName,
        discordId,
        contactInfo,
    })
}

const getPlayers = async () => {
    return await Player.find({ isDeleted: false })
}

const getPlayerById = async (id) => {

}

const updatePlayer = async (id, playerData) => {

}

const deletePlayer = async (id) => {

}

module.exports = {
    createPlayer,
    getPlayers,
    getPlayerById,
    getPlayerByDiscordId,
    updatePlayer,
    deletePlayer,
}