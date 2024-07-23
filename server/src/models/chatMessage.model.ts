import mongoose, { Schema, model, Document } from 'mongoose';

export interface IChatMessage extends Document {
    _id: Schema.Types.ObjectId;
    participants: mongoose.Types.ObjectId[];
    messages: {
        to: mongoose.Types.ObjectId;
        from: mongoose.Types.ObjectId;
        type: 'Text' | 'Media' | 'Document' | 'Link' | 'Image';
        created_at: Date;
        text?: string;
        file?: string;
    }[];
    createdAt: Date;
}

const chatMessage = new Schema<IChatMessage>({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: "Account",
        required: true
    }],
    messages: [{
        to: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        from: {
            type: Schema.Types.ObjectId,
            ref: "Account",
            required: true
        },
        type: {
            type: String,
            enum: ['Text', 'Media', 'Document', 'Link', 'Image'],
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
        text: { type: String },
        file: { type: String }
    }]
}, {
    timestamps: true
});

export default model<IChatMessage>("ChatMessage", chatMessage);
