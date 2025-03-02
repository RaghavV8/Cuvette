const JobType = require("../models/jobTypeModel");
const Job =  require("../models/jobModel")
const ErrorResponse = require("../utils/errorResponse");
const mongoose = require("mongoose");

//create job category 
exports.createJob = async(req,res,next)=>{
    try {
        const job = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user.id
        });
        res.status(201).json({
            success:true,
            job
        })
    } catch (error) {
       next(error); 
    }
}

//single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id);
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

//update job by id.
exports.updateJob= async (req, res, next) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, {new: true}).populate('jobType', 'jobTypename').populate('user', 'firstName', 'lastName');
        res.status(200).json({
            success: true,
            job
        })
    } catch (error) {
        next(error);
    }
}

exports.showJobs = async (req, res, next) => {
    const mongoose = require("mongoose");

    // Enable search
    const keyword = req.query.keyword
        ? { title: { $regex: req.query.keyword, $options: "i" } }
        : {};

    // Filter jobs by category IDs
    let ids = [];
    const jobTypeCategory = await JobType.find({}, { _id: 1 });
    jobTypeCategory.forEach(cat => ids.push(cat._id));

    let cat = req.query.cat ? req.query.cat.trim() : "";
    let categ = mongoose.Types.ObjectId.isValid(cat) ? new mongoose.Types.ObjectId(cat) : ids;

    // Jobs by location
    let locations = [];
    const jobByLocation = await Job.find({}, { location: 1 });
    jobByLocation.forEach(val => locations.push(val.location));
    let setUniqueLocation = [...new Set(locations)];

    let location = req.query.location ? req.query.location.trim() : "";
    let locationFilter = location ? { location: { $regex: `^${location}$`, $options: "i" } } : {};

    // Enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;
    const count = await Job.countDocuments({ ...keyword, jobType: { $in: categ }, ...locationFilter });

    try {
        const jobs = await Job.find({ ...keyword, jobType: { $in: categ }, ...locationFilter })
            .sort({ createdAt: -1 }) // createdAt : -1 means this is to display jobs by descending order of date uploaded
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocation
        });
    } catch (error) {
        next(error);
    }
};
