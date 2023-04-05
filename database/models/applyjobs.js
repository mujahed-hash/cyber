const mongoose = require('mongoose');

const applyjobSchema = mongoose.Schema({

    fullname:{
        type:String
    },
    availibity:{
        type:String
    },
    email:{
        type:String
    },
    phone:{
        type:String
    },
    resume:{
        type:String
    },
    dateCreated:{
        type:Date,
        default:Date.now
    },
    jobpost: { type: mongoose.Schema.Types.ObjectId, ref: 'Jobpost', required: true },

});
applyjobSchema.virtual('id').get(function(){
    return this._id.toHexString();
});

applyjobSchema.set('toJSON',{
    virtuals: true,
});
module.exports = mongoose.model('Applyjob', applyjobSchema);