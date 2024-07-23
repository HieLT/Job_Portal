import {model, Schema} from "mongoose";

export interface ICategory extends Document {
    _id: Schema.Types.ObjectId;
    name: string;
};

const Category = new Schema<ICategory>({
    name: {type: String}
}, {
    timestamps: true
});

export default model<ICategory>("Category", Category);