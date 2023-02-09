var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const methodOverride = require('method-override');

app.use(bodyParser.json());

var userRoutes = require('./api-routes/routes');
const productRoutes = require('./api-routes/productRoutes');

const db = require('./config/dbSetup');
db.user.hasMany(db.product, {foreignKey: "owner_user_id"});
db.sequelize.sync({force: false})
  .then(() => console.log("Database setup complete."))
  .catch(() => console.log("Database setup failed."))

app.get('/healthz',function(req, res) {
  res.status(200).send(); 
});
app.use('/v1/user',userRoutes);
app.use('/v1/product',productRoutes);

app.use(methodOverride())
app.use((err, req, res, next) => {
  return res.status(400).json({message: "Bad Request"});
})
module.exports = app;