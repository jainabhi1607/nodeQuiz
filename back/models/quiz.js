import { Schema,model } from "mongoose";

const quizSchema = new Schema({
    question:{
        type : String,
        require: true,
    },
    options:{
        type: String,
        require: true,
    },
    answer:{
        type: String,
        require: true,
    }
})

const Quiz = model("quiz",quizSchema)
export default Quiz