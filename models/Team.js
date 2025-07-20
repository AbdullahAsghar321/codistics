import mongoose from "mongoose";

const team = mongoose.Schema({
    name :{
        type: String,
        required: true,
        unique: true
    },
    role :{
        type: String,
        required: true,
        enum: ['admin', 'member', 'guest'],
        default: 'member'
    },
    description : {
        type: String,
        required: true,
        maxlength: 500
    },
    skills : {
        type: [String],
        required: true,
        validate: {
            validator: function(v) {
                return v.length > 0;
            },
            message: 'At least one skill is required.'
        }
    }


}, {timestamps:  true});

const Team = mongoose.model("Team", team);
export default Team;