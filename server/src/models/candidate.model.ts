import {model, Schema} from "mongoose";

export interface ICandidate extends Document {
    _id: Schema.Types.ObjectId;
    first_name: string;
    last_name: string;
    birth: Date;
    phone: string;
    avatar: string;
    gender: 'Male' | 'Female' | 'Other';
    bio: string;
    profile_description: string;
    resume_path: Schema.Types.ObjectId[];
    account: Schema.Types.ObjectId,
    is_deleted: boolean;
};

const Candidate = new Schema<ICandidate>({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    birth: {
        type: Date
    },
    phone: {
        type: String
    },
    avatar: {type: String},
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    bio: {
        type: String
    },
    profile_description: {
        type: String
    },
    resume_path: [{
        type: Schema.Types.ObjectId,
        ref: 'File'
    }],
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model<ICandidate>('Candidate', Candidate);