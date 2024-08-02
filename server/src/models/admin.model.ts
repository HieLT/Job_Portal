import {model, Schema} from "mongoose";

export interface IAdmin extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    avatar: string;
    account: Schema.Types.ObjectId;
    is_deleted: false;
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