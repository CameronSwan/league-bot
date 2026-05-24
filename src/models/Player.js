const mongoose =  require('mongoose')

const contactSchema = new mongoose.Schema(
    {
        contactType: {
            type: String,
            enum: ['discord', 'email', 'phone', 'other'],
            required: true,
        },
        contactInfo: {
            type: String,
            required: true,
        },
        isPrimary: {
            type: Boolean,
            default: false,
        },
    }
)

const infractionSchema = new mongoose.Schema(
    {
        infractionType: {
            type: String,
            enum: ['trade', 'match', 'league', 'server'],
            required: true,
        },
        infractionDetails: {
            type: String,
            required: true,
        },
        severity: {
            type: String,
            enum: ['minor', 'major', 'critical'],
            required: true,
        },
        penalty: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const playerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
        },
        discordId: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        admin: {
            type: Boolean,
            default: false,
        },
        contactInfo: {
            type: [contactSchema],
            default: [],
        },
        infractions: {
            type: [infractionSchema],
            default: [],
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

module.exports = mongoose.model('Player', playerSchema)