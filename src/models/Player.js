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
            required: true,
        },
    }, {_id: false}
)

const infractionSchema = new mongoose.Schema(
    {
        infractionType: {
            type: String,
            enum: ['trade', 'match', 'league', 'server'],
            required: true,
        },
        infractionDetauls: {
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
            required: false,
        }
    }, {_id: false}
)

const playerSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: false,
        },
        admin: {
            type: Boolean,
            required: true,
        },
        contactInfo: {
            type: [contactSchema],
            default: [],
            required: true,
        },
        infractions: {
            type: [infractionSchema],
            default: [],
            required: true
        }
    }
)