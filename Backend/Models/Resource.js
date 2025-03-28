import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Ensure unique resource names
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, 'Quantity cannot be negative'], // Prevent negative quantities
    },
    usedQuantity: {
        type: Number,
        default: 0,
        min: [0, 'Used quantity cannot be negative'], // Prevent negative used quantities
    },
    description: {
        type: String,
    },
});

export const Resource = mongoose.model("Resource", resourceSchema);