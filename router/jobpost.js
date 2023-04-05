const express = require('express');
const router = express.Router();
const jobpostController = require('../controllers/jobpost')
const Jobpost = require('../database/models/jobpost');



router.get('/', jobpostController.getJobpost);
router.get('/:id', async (req,res)=>{
    const jobpost = await Jobpost.findById(req.params.id);

    if(!jobpost){
        return res.status(500).json({messaage:"Jobpost with the given ID is not found"})
    }
    else{
        res.status(200).send(jobpost);
    }
})
router.post('/',jobpostController.postJobpost);

router.delete('/:id', (req,res)=>{
     Jobpost.findByIdAndRemove(req.params.id).then( jobpost =>{
       if(jobpost){
           res.status(201).json({status: "success", message: "jobpost is deleted successfully"});   
          }
          else{
           return res.status(404).json({error: 'could not find jobpost'})
          }
     }).catch(err=>{
         return res.status(400).json({error:err});
     });
});

router.put('/:id',(req,res,next)=>{
    Jobpost.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, jobposts)=>{

        if(err){
            res.status(500).json({error:err})
        }
        else{
            res.send(jobposts)
        }
    }
    )
})
router.get('/get/count', async (req,res)=>{
    const jobpostCount = await Jobpost.countDocuments();

    if(!jobpostCount) return res.status(404).json('No jobposts')

    res.send({
      jobpostCount: jobpostCount
    });
});
module.exports = router;