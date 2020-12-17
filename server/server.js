var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

mongoose.connect("mongodb://localhost:27017/teetung", {useNewUrlParser: true}).then(console.log(`mongo connected`)).catch(err => {throw err});

app.use(cors());
app.use(express.json());
//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// path
app.use(express.static(path.join(__dirname, '../teetung-admin')));


app.get('/api/getAuthUser', (req,res) => {
    res.json({
        email: 'testuser@gmail.com',
        password: '12345',
        status: '1'
    })
})

// app.post('/getAuthUserDetail', (req, res) => {
//     res.send({ status: req.body });
// })

// operations start----------------------------------------------------------
var signIn = require("./operations/signIn");
var collections = require('./operations/collections');
var products = require('./operations/products');
var cart = require('./operations/cart');


//Avtar------------------------------------------------------------------
var pages = require('./operations/pages');
var checkoutformoptions = require('./operations/cehckoutformoption');
var generalpreference = require('./operations/generalpreference');
var onlinestore = require('./operations/onlineStoreSetting');
var tracking = require('./operations/TrackingSetting');
var account = require('./operations/accounts');

var checkout = require('./operations/checkout');

var order = require('./operations/order');
// operations end------------------------------------------------------------


// API requests start---------------------------------------------------------
app.post("/getAuthUserDetail", signIn.checkAuthDetail);

// collections routes
app.post('/addCollection', collections.addCollection);
app.post('/getCollections',collections.getCollections);
app.post('/getCollectionById/:id',collections.getCollectionById);

// products
app.post('/saveProduct', products.addProduct);
app.post('/getProductsList', products.getProductsList);
app.post('/searchproduct',products.searchproduct);
    // -- 07-09-2019
app.get('/product-detail/:id', products.getProductDetail);
app.get('/getproducthome',products.getProductsHome)
app.get('/getproductshop/:pageno',products.getProductsShop)
app.get('/getproductcount',products.getProductsCount)
app.post('/getvariantdetails/', products.getProductsVariantData)
// app.post('/searchproduct', products.searchproduct);
app.post('/getsimilarproducts', products.getProductSimilar);
//Avtar----------------------------------------------------------------
app.post('/getpages', pages.getPages);
app.post('/getpagesbyId/:slug', pages.getPagesById);

app.post('/updatecheckoutformoptions/:id',checkoutformoptions.updateOption);
app.post('/getallcheckoutformoptions/',checkoutformoptions.getAllOption);

app.post('/updategeneralpreference/:id',generalpreference.updateOption);
app.post('/getallgeneralpreference/',generalpreference.getAllOption);

app.post('/updateonlinestore/:id', onlinestore.updateOption);
app.post('/getallonlinestore/', onlinestore.getAllOption);
app.post('/updatetracking/:id', tracking.updateOption);
app.post('/getalltracking/', tracking.getAllOption);

app.post('/getusers/', account.getUsers);
app.post('/createusers/', account.createUser);
app.post('/deleteusers/:id', account.deleteUser);

app.post('/addtocart/',cart.addCart);
app.get('/removefromcart/:id',cart.removefromcart);
app.post('/updatecart/:id',cart.updatecart);
app.get('/getcart/:key',cart.getcart);
app.post('/getcartcount/',cart.getcartcount);


app.post('/checkout', checkout.createUser);

app.post('/placeorder', order.createUser);
app.post('/get_order_by_payment_status', order.getorderbypaymentstatus);

app.post('/get_order_by_customer_data', order.getorderbyotherdata);

app.post('/get_order', order.getorders);
// API requests end-----------------------------------------------------------


const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`App is running on: ${port}`)
});