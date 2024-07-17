import {model, Schema} from "mongoose";

interface IJob extends Document {
    title: string;
    description: string;
    type: string;
    salary: number | string;
    number_of_recuirement: number;
    position: string;
    status: string;
    expired_at: Date;
    experience_required: string;
    company_id: Schema.Types.ObjectId;
    applied_candidates: Schema.Types.ObjectId[];
    category_id: Schema.Types.ObjectId;
    is_deleted: boolean;
};

const Job = new Schema<IJob>({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    salary: {
        type: Number || String,
        required: true
    },
    number_of_recuirement: {
        type: Number,
        required: true
    },
    position: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    },
    expired_at: {
        type: Date,
        required: true
    },
    experience_required: {
        type: String,
    },
    company_id: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    applied_candidates: [{
        type: Schema.Types.ObjectId,
        ref: 'Candidate'
    }],
    category_id: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    is_deleted: {type: Boolean}
}, {
    timestamps: true
});

export default model<IJob>('Job', Job);