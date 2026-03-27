import Comment from "../models/comment.model.js";

// ADD COMMENT
export const addComment = async (req,res)=>{
  try{

    if(!req.user){
      return res.status(401).json("Login required");
    }

    const comment = await Comment.create({
      text:req.body.text,
      video:req.body.video,
      user:req.user._id   
    });

    res.json(comment);

  }catch(err){
    console.log(err);
    res.status(500).json(err.message);
  }
};

//  GET COMMENTS
export const getComments = async (req,res)=>{

try{

const comments = await Comment
.find({video:req.params.videoId})
.populate("user","username");

res.json(comments);

}catch(err){
res.status(500).json(err.message);
}

};

// DELETE COMMENT
export const deleteComment = async (req,res)=>{

try{

const comment = await Comment.findById(req.params.id)

if(!comment){
return res.status(404).json("Comment not found")
}


if(comment.user.toString() !== req.user._id.toString()){
  return res.status(403).json("Not allowed")
}

await comment.deleteOne()

res.json("Comment deleted")

}catch(err){
res.status(500).json(err.message);
}

};

//  UPDATE COMMENT
export const updateComment = async (req,res)=>{

try{

const comment = await Comment.findByIdAndUpdate(
req.params.id,
{text:req.body.text},
{new:true}
);

res.json(comment);

}catch(err){
res.status(500).json(err.message);
}

};