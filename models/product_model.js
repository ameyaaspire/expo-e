var mongoose = require('mongoose');
module.exports = mongoose.model('product', {
    Price : {type : Number},
    product:{type:String},
    supplier:{type:String}
});