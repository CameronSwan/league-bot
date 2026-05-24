const mongoose = require('mongoose')
const Player = require('../models/Player')

const isValidId = (id) => {
    return mongoose.Types.ObjectId.isValid(id)
}

const createPlayer = async (req, res) => {
    try {
        const player = await Player.create(req.body)
        return res.status(201).json(player)
    } catch (e) {
        return res.status(400).json({ error: e.message })
    }
}

const getPlayer = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid Player Id.' })
    
    try {
        const player = await Player.findOne({ _id: id, isDeleted: false })
        if (!player) return res.status(404).json({ error: 'Player Not Found.'})
        return res.status(200).json(player)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

const getPlayers = async (req, res) => {
    try {
        const players = await Player.find({ isDeleted: false })
        return res.status(200).json(players)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

// Update
const updatePlayer = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid Player Id.' })

    try {
        const player = await Player.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
        if (!player) return res.status(404).json({ error: 'Player Not Found.' })
        return res.status(200).json(player)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

// Delete (Soft)
const deletePlayer = async (req, res) => {
    const { id } = req.params
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid Player Id.' })

    try {
        const player = await Player.findOneAndUpdate(
            {
                _id: id,
                isDeleted: false,
            },
            {
                isDeleted: true,
                deletedAt: new Date()
            },
            {
                new: true,
            }
        )
        if (!player) return res.status(404).json({ error: 'Player Not Found.' })
        return res.status(200).json(player)
    } catch (e) {
        return res.status(500).json({ error: e.message })
    }
}

module.exports = {
    createPlayer,
    getPlayer,
    getPlayers,
    updatePlayer,
    deletePlayer,
}