var Product = require('./models/product_model');
var Supplier = require('./models/supplier_model');
module.exports = {
    getProductPrice:function(req,res){
         Product.findOne({
            supplier: req.params.supplier,
            product: req.params.product
        }, function(err, product) {
            if (err) {
                res.send({success:false,message:err});
            } else {
                res.json({success:true,product:product});
            }
        });
    },
    getSupplierList:function(req, res){
        Supplier.find({}, function(err, suppliers) {
            if (err) {
                res.send({success:false,message:err});
            } else {
                res.json({success:true,suppliers:suppliers});
            }
        });
    },
    getProductList:function(req, res){
        Product.find({
            supplier: req.params.supplier,
        }, function(err, products) {
            if (err) {
                res.send({success:false,message:err});
            } else {
                res.json({success:true,products:products});
            }
        });
    }

};