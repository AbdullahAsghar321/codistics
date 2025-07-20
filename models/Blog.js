import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {  
        type: String,
        required: true, 
        unique: true
    },
    excerpt : {
        type: String,
        required: true
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    date :{
        type: Date,
        default: Date.now
    },
    category:{
        type: String,
        required: true
    },
    image : {
        type: String,
        required: true
    }

})

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
export default Blog;