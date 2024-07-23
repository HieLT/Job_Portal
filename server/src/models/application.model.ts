import {model, Schema, Document} from "mongoose";

export interface IApplication extends Document {
    _id: Schema.Types.ObjectId;
    job_id: Schema.Types.ObjectId;
    candidate_id: Schema.Types.ObjectId;
    resume_path: string;
    cover_letter_path: string;
    seen_at: Date;
    downloaded_at: Date;
    is_deleted: boolean;
}

const Application = new Schema<IApplication>({
    job_id: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    candidate_id: {
        type: Schema.Types.ObjectId,
        ref: 'Candidate',
        required: true
    },
    resume_path: {
        type: String,
        required: true
    },
    cover_letter_path: {
        type: String,
        required: true
    },
    seen_at: {
        type: Date
    },
    downloaded_at: {
        type: Date
    },
    is_deleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

export default model<IApplication>("Application", Application);