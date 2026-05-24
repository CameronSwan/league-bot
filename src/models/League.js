const mongoose =  require('mongoose')

const leagueSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            default: function() {
                return `TEST_NAME_TO_BE_CHANGED` // TODO - Create A Funciton To Generate Default League Name.
            }
        },
        paymentTotal: {
            type: Number,
            default: 0.00,
            min: 0.00,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        isDeleted: {
            type: Boolean,
            default: false,
            index: true,
        },
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
)