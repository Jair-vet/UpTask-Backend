import mongoose, {Schema, Document, Types} from "mongoose";

// typeScript
export interface ITask extends Document {
    name: string
    description: string
    project: Types.ObjectId
}

// Mongoose
const TaskSchema: Schema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    description: {
        type: String,
        require: true,
        trim: true,
    },
    project: {
        type: Types.ObjectId,
        ref: 'Project'
    }
}, {timestamps: true})

const Task = mongoose.model<ITask>('Task', TaskSchema)
export default Task