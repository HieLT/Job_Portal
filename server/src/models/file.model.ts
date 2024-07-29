import { model, Schema, Document } from "mongoose";

export interface IFile extends Document {
    file_name: string;
    file_url: string;
    type: string;
}

const File = new Schema<IFile>({
    file_name: { type: String, required: true },
    file_url: { type: String, required: true },
    type: { type: String, required: true }
});

export default model<IFile>('File', File);
