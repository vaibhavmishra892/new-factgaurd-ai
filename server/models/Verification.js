
import mongoose from 'mongoose';

const verificationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false
    },
    claim: {
        type: String,
        required: true
    },
    status: {
        type: String, // VERIFIED, CONTRADICTED, INCONCLUSIVE
        required: true
    },
    confidence: {
        type: String
    },
    explanation: {
        type: Object // Store the full explanation object
    },
    sources: {
        type: Array // Store sources array
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
