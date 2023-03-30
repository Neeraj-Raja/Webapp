const helper = require('../config/helper');
const db = require('../config/dbSetup');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const BUCKET_NAME = process.env.BUCKETNAME;

const createNewProduct = async (req, res) => {
   logger.info("POST - Product");
    helper.statsdClient.increment('POST_product');
    if(!req.body.name || 
    !req.body.description || 
    !req.body.sku || 
    !req.body.manufacturer ||
    req.body.quantity===null ||
    (req.body.quantity && (req.body.quantity < 0 || typeof req.body.quantity === 'string' || req.body.quantity > 100))) {
        return res.status(400).json({
            message: "Bad request"
        });
    }    

    try{
        let prodObj = await db.product.findOne({where:{sku:req.body.sku}});
        if(prodObj) {
            return res.status(400).json({
                message: "Bad request!! The entered sku value already exists."
            });
        }

        let {userName, pass} = helper.getDecryptedCreds(req.headers.authorization);
        let user = await db.user.findOne({where:{username:userName}});

        let data = await user.createProduct({
            name:req.body.name,
            description: req.body.description,
            sku: req.body.sku,
            manufacturer: req.body.manufacturer,
            quantity: req.body.quantity,
            account_created: new Date().toISOString(),
            account_updated: new Date().toISOString()
        });

        let result = {
            "id": data.dataValues.id,
            "name": data.dataValues.name,
            "description": data.dataValues.description,
            "sku": data.dataValues.sku,
            "manufacturer": data.dataValues.manufacturer,
            "quantity": data.dataValues.quantity,
            "date_added": data.dataValues.date_added,
            "date_last_updated": data.dataValues.date_last_updated,
            "owner_user_id": data.dataValues.owner_user_id
        }
        return res.status(201).json(result);
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const putProductInfo = async (req, res) => {
    logger.info("product put id - ", req.params.id);
    helper.statsdClient.increment('PUT_product');
    if(!req.body.name || 
    !req.body.description || 
    !req.body.sku || 
    !req.body.manufacturer ||
    req.body.quantity===null ||
    (req.body.quantity && (req.body.quantity < 0 || typeof req.body.quantity === 'string' || req.body.quantity > 100)) ||
    Object.keys(req.body).length > 5) {
        return res.status(400).json({
            message: "Bad request"
        });
    }   

    let id = req.params.id;

    try{
        let prodObj = await db.product.findOne({where:{sku:req.body.sku}});
        if(prodObj && prodObj.dataValues.id != id) {
            return res.status(400).json({
                message: "Bad request!! The entered sku value already exists."
            });
        }

        await db.product.update({
            "name": req.body.name,
            "description": req.body.description,
            "sku": req.body.sku,
            "manufacturer": req.body.manufacturer,
            "quantity": req.body.quantity
        },{
            where:{
                id:id
            }
        })
        return res.status(204).send(); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const patchProductInfo = async (req, res) => {
    logger.info("product patch id - ", req.params.id);
    helper.statsdClient.increment('PATCH_product');
    if((req.body.quantity && (req.body.quantity < 0 || typeof req.body.quantity === 'string' || req.body.quantity > 100))) {
        return res.status(400).json({
            message: "Bad request"
        });
    }   

    let id = req.params.id;

    let fieldData = {};
    let fieldKeys = ["name","description","sku","manufacturer","quantity"];
    
    let nullCheck = false;
    Object.keys(req.body).forEach((key) => {
        if(!req.body[key] && req.body[key] !== 0) {
            nullCheck = true;
        }
        if(fieldKeys.includes(key)) {
            fieldData[key]=req.body[key]
        }        
    });

    if(!Object.keys(fieldData).length || nullCheck) {
        return res.status(400).send("Bad Request. Incorrect data.");
    }

    try{
        if(req.body.sku) {
            let prodObj = await db.product.findOne({where:{sku:req.body.sku}});
            if(prodObj && prodObj.dataValues.id != id) {
                return res.status(400).json({
                    message: "Bad request!! The entered sku value already exists."
                });
            }
        }

        await db.product.update(fieldData,{
            where:{
                id:id
            }
        })
        return res.status(204).send(); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const deleteProduct = async (req, res) => {
    logger.info("product delete id - ", req.params.id);
    helper.statsdClient.increment('DELETE_product');
    if(req._body) {
        return res.status(400).send("Bad Request");
    }

    let id = req.params.id;

    try{
        let data = await db.image.findAll({
            where:{
                product_id:id
            }
        });
        console.log(data);
        data.forEach(async (d) => {
            console.log(d);
            let bucketPath = d.s3_bucket_path;

            var params = { Bucket: BUCKET_NAME, Key: bucketPath };

            await s3.deleteObject(params).promise();
        })
        
        await db.product.destroy({
            where:{
                id:id
            }
        })
        return res.status(204).send(); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

const getProduct = async(req, res) => {
   logger.info("product get id- ", req.params.id);
    helper.statsdClient.increment('GET_productdetails');
    if(req._body) {
        return res.status(400).send("Bad Request");
    }
    
    let id = req.params.id;

    try{
        let data = await db.product.findOne({
            where:{
                id:id
            }
        });
        if(!data) {
            return res.status(404).json({
                message: "Not Found"
            });
        }
        let result = {
            "id": data.dataValues.id,
            "name": data.dataValues.name,
            "description": data.dataValues.description,
            "sku": data.dataValues.sku,
            "manufacturer": data.dataValues.manufacturer,
            "quantity": data.dataValues.quantity,
            "date_added": data.dataValues.date_added,
            "date_last_updated": data.dataValues.date_last_updated,
            "owner_user_id": data.dataValues.owner_user_id
        }
        return res.status(200).json(result); 
    }catch(err) {
        console.log("DB Error ", err);
        res.status(400).send("Bad Request");
    }
}

module.exports = {
    createNewProduct,
    deleteProduct,
    getProduct,
    putProductInfo,
    patchProductInfo
}