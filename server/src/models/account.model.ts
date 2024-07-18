import { model, Schema } from "mongoose";

interface IAccount extends Document {
    email: string;
    password?: string;
    role: 'Candidate' | 'Company' | 'Admin';
    company?: Schema.Types.ObjectId;
    candidate?: Schema.Types.ObjectId;
    admin?: Schema.Types.ObjectId;
    socket_id: string;
    verified: boolean;
    verificationToken?: string;
    isGoogleAccount?: boolean; // true if account is created by google
}

const Account = new Schema<IAccount>({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: function() {return !this.isGoogleAccount;}
    },
    role: {
        type: String,
        required: true,
        enum: ['Company', 'Candidate', 'Admin']
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company'
    },
    candidate: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    },
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Administrator'
    },
    socket_id: {type: String},
    verified: {type: Boolean, default: false},
    verificationToken: {type: String},
    isGoogleAccount: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model<IAccount>('Account', Account);