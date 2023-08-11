require('dotenv').config();
const express = require('express'),
    app = express(),
    mongoose = require('mongoose');
    fileupload= require("express-fileupload");

    const defaultData= async () => {
        let migrator = require('./migrations/migrator');
        //await migrator.migrate();
        // await migrator.backup();
        // await migrator.rpMigrate();
        // await migrator.addOwnerRole();
    }
    // defaultData();
app.use(express.json());
app.use(fileupload());

// Connect MongoDB at default port 27017.
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DbName}`);
const roleRouter= require('./routes/role');
const catRoute= require('./routes/category');
const subcatRoute= require('./routes/subcat');
const childcatRoute= require('./routes/childcat');
const tagRoute= require('./routes/tag');
const deliveryRoute= require('./routes/delivery');
const warrantyRoute= require('./routes/warranty');

const permitRouter= require('./routes/permit');
const userRouter= require('./routes/user');
app.use('/permits',permitRouter);
app.use('/roles',roleRouter);
app.use('/cats',catRoute);
app.use('/subcats',subcatRoute);
app.use('/childcats',childcatRoute);
app.use('/tags',tagRoute);
app.use('/delivery',deliveryRoute);
app.use('/warranty',warrantyRoute);
app.use('bundle',bundleRoute);

app.use((err,req,res,next) => {
    err.status = err.status || 500;
    res.status(err.status).json({con: false, msg:err.message});
})
app.use('/users',userRouter);
app.listen(process.env.PORT || 3000, console.log("Server listening on port 3000"));
