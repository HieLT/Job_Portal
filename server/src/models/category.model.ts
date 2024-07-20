import {model, Schema} from "mongoose";

interface ICatergory extends Document {
    name: string;
};

const Catergory = new Schema<ICatergory>({
    name: {type: String}
}, {
    timestamps: true
});

export default model<ICatergory>("Catergory", Catergory);