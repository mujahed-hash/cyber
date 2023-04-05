const multer = require('multer');
const path = require('path');
const Jobpost = require('../database/models/jobpost')
const Applyjob = require('../database/models/applyjobs');
exports.getAppliedJob = async (req,res)=>{
    const appliedjob = await (await Applyjob.find().sort({createdAt: 'desc'}).populate('jobpost')).reverse();
    res.send(appliedjob)
}
exports.postApplyJob = async (req, res) => {
      try{
        const { fullname, availibity, email, phone } = req.body;
        const jobpostId = req.params.jobpostId;
      
        // Check if the job post exists
        const jobPostExists = await Jobpost.exists({ _id: jobpostId });
        if (!jobPostExists) {
          return res.status(404).json({ message: 'Job post not found' });
        }
      
        // Create a new job application
        const file = req.file;
        if (!file) return res.status(400).send('No file in the request');
        const fileName = file.filename;
        const basePath = `${req.protocol}://${req.get('host')}/uploads/`;

        const application = new Applyjob({
          fullname,
          availibity,
          email,
          phone,
          resume: `${basePath}${fileName}`,
          jobpost: jobpostId,
        });
      
        // Save the application to the database
        await application.save();
      
        // Send a response to the client
        res.json({ message: 'Application submitted successfully', application });
      }
      catch(error){
        console.error(error);
        console.log('server error')
      }
}