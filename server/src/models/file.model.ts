import mongoose from "mongoose";

interface IFile extends mongoose.Document {
    file_name: string;
    data: Buffer;
    content_type: string;
}

const File = new mongoose.Schema<IFile>({
    file_name: String,
    data: Buffer,
    content_type: String
});

export default mongoose.model<IFile>('File', File);