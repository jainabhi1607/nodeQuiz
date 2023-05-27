import mongoose from "mongoose";

const connection = mongoose.connect(`mongodb+srv://abhidevphp2:abhidev76_8YT@ster.5kooszz.mongodb.net/?retryWrites=true&w=majority`,{
    useNewUrlParser: true,
    useUniFiedTopology: true,
})
export default connection;