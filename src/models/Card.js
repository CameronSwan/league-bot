const mongoose =  require('mongoose')

const cardSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'leaguePlayer',
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        scryfallLink: {
            type: String,
            required: true,
        },
        tradeLocked: {
            type: Boolean,
            default: false,
            required: true,
        }
    }
)