const mongoose =  require('mongoose')

const leaguePlayerSchema = new mongoose.Schema(
    {
        player: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'player',
            required: true,
        },
        league: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'league',
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['paid', 'unpaid', 'not paying'],
            required: true,
        },
        finalPlacement: {
            type: Number,
            required: false,
        },
    }    
)