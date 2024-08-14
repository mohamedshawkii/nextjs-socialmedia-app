import Post from "../../../../lib/models/Post";
import { connectToDB } from "../../../../lib/mongodb/mongoose";
import User from "../../../../lib/models/User"
import { writeFile } from "fs/promises";

export const POST = async (req) => {

    const path = require('path')
    const currentWorkingDirectory = process.cwd()

    try {
        await connectToDB();
        const data = await req.formData()

        let postPhoto =  data.get('postPhoto')

        const bytes = await postPhoto.arrayBuffer()
        const buffer = Buffer.from(bytes)

        const postPhotoPath = path.join(
            currentWorkingDirectory,
            "public",
            "uploads",
            postPhoto.name
        )

        await writeFile(postPhotoPath, buffer)

        postPhoto = `/uploads/${postPhoto.name}`

       const NewPost = await Post.create({
        creator: data.get("creatorId"),
        caption: data.get("caption"),
        tag: data.get('tag'),
        postPhoto: postPhoto,
       });

       await NewPost.save()

       await User.findByIdAndUpdate(
        data.get("creatorId"),
        {$push: {posts: NewPost._id}},
        {new:true, useFindAndModify:false}
       )
       return new Response(JSON.stringify(NewPost), {status: 200})
    } catch (error) {
        console.error(error)
        return new Response('Faild to create a new Post', {status: 500})
    }
};
