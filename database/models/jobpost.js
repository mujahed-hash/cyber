const mongoose = require('mongoose');

const jobpostSchema = mongoose.Schema({

    jobtitle:{
        type:String
    },
    location:{
        type:String
    },
    salary:{
        type:String
    },
    description:{
        type:String
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
}
, { timestamps: true });
jobpostSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

jobpostSchema.set('toJSON',{
    virtuals: true,
});
jobpostSchema.index({ createdAt: -1 });
module.exports = mongoose.model('Jobpost', jobpostSchema);