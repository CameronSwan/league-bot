const mongoose =  require('mongoose')

const tradeOfferSchema = new mongoose.Schema(
    {
        originalOffer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tradeOffer',
            required: false,
        },
        counterOffer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'tradeOffer',
            required: false,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'player',
            required: true,
        },
        datePosted: {
            type: Date,
            required: true,
        },
        status: {
            type: String,
            enum: ['posted', 'complete', 'cancelled', 'accepted', 'rejected'],
        },
        cards: {
            type: [mongoose.Schema.Types.ObjectId],
            default: [],
            required: true,
        },
    }    
)