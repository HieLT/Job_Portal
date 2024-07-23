import {model, Schema, Document} from "mongoose";

export interface ICompany extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
    logo: string;
    description: string;
    location: string;
    phone: string;
    website_url: string;
    founded_year: string;
    headcount: number;
    jobs: Schema.Types.ObjectId[];
    account: Schema.Types.ObjectId;
    is_deleted: boolean;
};

const Company = new Schema<ICompany>({
    name: {
        type: String,
        required: true
    },
    logo: {type: String},
    description: {type: String},
    location: {type: String},
    phone: {type: String},
    website_url: {type: String},
    founded_year: {type: String},
    headcount: {type: Number},
    jobs: [{
        type: Schema.Types.ObjectId,
        ref: 'Job'
    }],
    account: {
        type: Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    is_deleted: {type: Boolean}
}, {
    timestamps: true
});

export default model<ICompany>('Company', Company);