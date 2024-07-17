import {model, Schema} from "mongoose";

interface IAdmin extends Document {
    name: string;
    avatar: string;
    account: Schema.Types.ObjectId;
};

const Admin = new Schema<IAdmin>({
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    }
}, {
    timestamps: true
});

export default model<IAdmin>('Administrator', Admin);