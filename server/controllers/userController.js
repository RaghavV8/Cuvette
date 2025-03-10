const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");

//EXTRA FUNCTIONALITY FOR ADMIN ROLE NOT NEEDED RIGHT NOW

// load all the users
exports.allUsers = async (req, res, next) => {
    //enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await User.find({}).estimatedDocumentCount();
    try {
        const users = await User.find().sort({ createdAt: -1 }).select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize)

        res.status(200).json({
            success: true,
            users,
            page: Math.ceil(count / pageSize),
            count
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//show single user 
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//edit user
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        return next(error);
    }
}

//delete User
exports.deleteUser =  async(req,res,next) =>{
    try {
//  Reason for Using findbyIdandRemove and findByIDand Delete from StackOverflow
//   I got the reason findByIdAndRemove returns the deleted document & findByIdAndDelete does not return. 
// If we want the deleted document then we can use findByIdAndRemove otherwise can use findByIdAndDelete.
// Recommend:- If don't want to get the deleted document then have to use findByIdAndDelete because it's fast cause does not return the document.

       const user = await User.findByIdAndRemove(req.params.id);
       res.status(200).json({
        success:true,
        message: "user deleted"
       })
       next();
    } catch (error) {
        return next(error);
    }
}

//jobs history
exports.createUserJobsHistory=  async(req,res,next) =>{
    const {title, description, salary, location} = req.body;
    try {
       const currentUser = await User.findOne({_id:req.user._id});
       if(!currentUser){
        return next(new ErrorResponse("You must log in", 401));
       }else{
            const addJobHistory = {
                title,
                description,
                salary,
                location,
                user: req.user._id
            }
            currentUser.jobHistory.push(addJobHistory);
            await currentUser.save();
       }
       res.status(200).json({
        success:true,
        currentUser
       })
       next();

    } catch (error) {
        return next(error);
    }
}