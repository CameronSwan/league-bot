const mongoose =  require('mongoose')

const matchPlayerSchema = new mongoose.Schema(
    {
        player: {
            type: mongoose.Schema.Types.ObjectId,
            reuired: true,
        },
        match: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        result: {
            type: String,
            enum: ['win', 'loss', 'draw'],
            required: true,
        },
        pointOverride: {
            type: Number,
            required: false,
        },
        overrideReason: {
            type: String,
            required: false,
        }
    }    
)