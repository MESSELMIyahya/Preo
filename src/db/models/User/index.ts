import { Schema, model, models } from "mongoose";


const UserSchema = new Schema<UserSchemaType>({

    Desq:{
        required:true,
        type:String
    },
    Email:{
        required:true,
        type:String
    },
    Image:{
        required:true,
        type:String
    },
    Name:{
        required:true,
        type:String
    },
    Posts:[
        {
            type:String
        }
    ],
    Password:{
        required:true,
        type:String
    },
    Tag:{
        required:true,
        type:String
    },
    Follow:[
        {   require:true,
            type:String
        }
    ],   
    Followers:[
        {   require:true,
            type:String
        }
    ]

},{timestamps:true});


const userModel = models.User || model('User',UserSchema);

export default userModel ;