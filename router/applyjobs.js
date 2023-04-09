const express = require('express');
const router = express.Router();
const applyjobsController = require('../controllers/applyjobs')
const Jobpost = require('../database/models/jobpost');
const Applyjob = require('../database/models/applyjobs');
const multer = require('multer');
const path = require('path');
const { Router } = require('express');
const upload = multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        callback(null, './uploads/');
      },
      filename: (req, file, callback) => {
        const ext = path.extname(file.originalname);
        callback(null, Date.now() + ext);
      },
    }),
  });

router.post('/apply/:jobpostId',  upload.single('resume'), applyjobsController.postApplyJob )  
router.get('/appliedjobs', applyjobsController.getAppliedJob );
router.get('/appliedjobs/:id', async (req,res)=>{
    const appliedjob = await Applyjob.findById(req.params.id).populate('jobpost');

    if(!appliedjob){
        return res.status(500).json({messaage:"Jobpost with the given ID is not found"})
    }
    else{
        res.status(200).send(appliedjob);
    }
});

router.delete('/appliedjobs/:id', (req,res)=>{
  Applyjob.findByIdAndRemove(req.params.id).then(appliedjob =>{
    if(appliedjob){
        res.status(201).json({status: "success", message: "appliedjob is deleted successfully"});   
       }
       else{
        return res.status(404).json({error: 'could not find appliedjob'})
       }
  }).catch(err=>{
      return res.status(400).json({error:err});
  });
});
module.exports = router;