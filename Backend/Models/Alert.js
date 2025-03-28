import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema({
    emergencyType: String,
    severity: String,
    location: String,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Alert = mongoose.model('Alert', alertSchema);

export default Alert;
