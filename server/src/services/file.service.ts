import fileModel, {IFile} from "../models/file.model";

class FileService {
    async createFile(file: IFile) : Promise<IFile> {
        try {
            const newFile = new fileModel(file);
            await newFile.save();
            return newFile;
        }
        catch(error) {
            throw error;
        }
    }
}

export default new FileService();