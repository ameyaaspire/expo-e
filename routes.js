var controller = require('./controller.js');


module.exports = function(app) {
    
    // path for getting the price of the product
    app.get('/api/price/:supplier/:product', function(req, res) {
        controller.getProductPrice(req, res);
    });

    //path for getting the supplier list
    app.get('/api/suppliers/', function(req, res) {
        controller.getSupplierList(req, res);
    });

    //path for getting the products for a given supplier
    app.get('/api/products/:supplier', function(req, res) {
        console.log(JSON.stringify(req.params.supplier));
        controller.getProductList(req, res);   
    });

    //path for laoding the home page
    app.get('/',function(req, res){
        res.sendFile(__dirname+'/public/index.html');
    });
};