const mongoose =  require('mongoose')

const matchSchema = new mongoose.Schema(
    {
        league: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
        status: {
            type: String,
            enum: ['scheduled', 'complete', 'confirmed', 'incomplete'],
            required: true,
        },
        week: {
            type: Number,
            required: true,
        },
    }    
)