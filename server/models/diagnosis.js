const { Schema, model } = require('mongoose');

const diagnosisSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    document: {
        type: Number,
        require: true,
    },
    diagnosis: Object,
    date: {
        type: Date,
        default: new Date()
    }
}, {
    timestamps: true
});

module.exports = model('Diagnosis', diagnosisSchema);