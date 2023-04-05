const Jobpost = require('../database/models/jobpost');

exports.getJobpost= async (req,res)=>{
   const jobposts = await Jobpost.find().sort({createdAt: 'desc'});

   res.status(201).send(jobposts);
}

exports.postJobpost = async (req,res)=>{
    try{

        const {jobtitle} = req.body;
        const {location} = req.body;
        const {salary} = req.body;
        const {description} = req.body;
        const createJobpost = new Jobpost({
            jobtitle,
            location,
            salary,
            description 
    
        });
    
       const createdJobpost= await createJobpost.save();
    
       res.status(201).json({
           createJobpost:{
                ...createdJobpost._doc
           }
       })
      

      
}
catch (error) {return res.status(401).json({ success: false, msg: error.message });// console.error(error);} 
}
}