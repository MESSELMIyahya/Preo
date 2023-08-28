import { Schema, model, models } from "mongoose";



const postSchema = new Schema<PostSchemaType>({
    Author:{
        Id:{required:true,type:String},
        Image:{required:true,type:String},
        Tag:{required:true,type:String},
        Name:{required:true,type:String}
    },
    Text:{required:true,type:String},
    Date:{required:true,type:String},
    Likes:[{
        type:String
    }]
});

const postModel = models.Post || model('Post',postSchema);

export default postModel ;