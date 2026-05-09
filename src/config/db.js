const mongoose = require('mongoose')
const logger = require('../utils/logger')('DATABASE')

const connectDB = async () => {
    try {
        throw new Error('Cannot connect to database.')
        await mongoose.connect(process.env.MONGO_URI)
    } catch (e) {
        throw e
    }
}

module.exports = connectDB