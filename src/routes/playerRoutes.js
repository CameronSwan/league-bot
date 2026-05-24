const express = require('express')
const router = express.Router()
const { createPlayer, getPlayer, getPlayers, updatePlayer, deletePlayer } = require('../controllers/playerController')

router.post('/', createPlayer)
router.get('/:id', getPlayer)
router.get('/', getPlayers)
router.put('/:id', updatePlayer)
router.delete('/:id', deletePlayer)

module.exports = router