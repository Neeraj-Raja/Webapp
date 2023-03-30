var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const methodOverride = require('method-override');
const logger = require("./logger/loggerindex");
const helper = require('./config/helper')
//const SDC = require('statsd-client');
app.use(bodyParser.json());

const userRoutes = require('./api-routes/userRoutes');
const productRoutes = require('./api-routes/productRoutes');

const db = require('./config/dbSetup');
db.user.hasMany(db.product, {foreignKey: "owner_user_id"});
db.product.hasMany(db.image, {foreignKey: "product_id"});
db.sequelize.sync({force: false})
.then(() => logger.info("Database setup complete."))
.catch((err) => logger.error("Database setup failed.", err))

app.get('/healthz',function(req, res) {
  helper.statsdClient.increment('health_counter');
 // logger.info("/health running fine");
  res.status(200).send(); 
   
});

app.use('/v1/user',userRoutes);
app.use('/v1/product',productRoutes);

app.use(methodOverride())
app.use((err, req, res, next) => {
  return res.status(400).json({message: "Bad Request"});
})

process.on('terminate', () => {
  process.on('terminate', () => {
    // run after all terminate handlers that were added before exit
    console.log("exit")
    helper.statsdClient.socket.close();
  });
});

module.exports = app;