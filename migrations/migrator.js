const Helper= require('../utils/helper');
const fs= require('fs');
const UserDB=require('../models/user');
const RoleDB=require('../models/role');
const PermitDB=require('../models/permit');

const migrate = () => {
    let data=fs.readFileSync("./migrations/users.json");
    let users= JSON.parse(data);
    users.forEach(async (user) => {
        user.password=Helper.encode(user.password);
        let result= await new UserDB(user).save();
        console.log(result);
    });
    console.log(users);
}
const rpMigrate=()=>{
    let data=fs.readFileSync('./migrations/rp.json');
    let rp=JSON.parse(data);
    // console.log(rp);
    rp.roles.forEach(async role=>{
       let result= await new RoleDB(role).save();
       console.log(result);
    });
    rp.permits.forEach(async permit =>{
        let result= await new PermitDB(permit).save();
    });
}
const addOwnerRole=async() =>{
    let dbOwner= await UserDB.findOne({phone:"09000000000"});
    let ownerRole = await RoleDB.findOne({name:"Owner"});
    await UserDB.findByIdAndUpdate(dbOwner._id,{$push:{roles:ownerRole._id}});
}
const backup =async () => {
    let users= await UserDB.find();
    fs.writeFileSync('./migrations/backups/user.json',JSON.stringify(users));
    console.log('user db backup done');
}

module.exports={
    migrate,
    backup,
    rpMigrate,
    addOwnerRole
}