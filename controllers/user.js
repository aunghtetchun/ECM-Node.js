const DB= require('../models/user');
const RoleDB= require('../models/role');
const PermitDB= require('../models/permit');
const Helper = require('../utils/helper');
const register = async (req, res, next) =>{
    let dbEmailUser= await DB.findOne({email:req.body.email});
    if(dbEmailUser){
        next(new Error('Email already registered'));
        return;
    }

    let dbPhoneUser= await DB.findOne({phone:req.body.phone});
    if(dbPhoneUser){
        next(new Error('Phone already registered'));
        return;
    }
    req.body.password = Helper.encode(req.body.password);
    let result= await new DB(req.body).save();
    Helper.fMsg(res,"Register Successfully",result);
}
const login =async (req, res, next)=>{
    let dbUser= await DB.findOne({phone:req.body.phone}).populate('roles permits').select('-__v');
    if(dbUser){
        if(Helper.comparePass(req.body.password,dbUser.password)){
            let user=dbUser.toObject();
            delete user.password;
            user.token=Helper.makeToken(user);
            Helper.set(user._id,user);
            Helper.fMsg(res,"Login Successfully",user);
        }else{
            next(new Error('Password wrong'));
        }
        //login လုပ်လိုက်တဲ့ user ရှိလားရှာတယ် ရှိရင် pass ကို bcrypt လုပ်ပီး တူမတူစစ်တယ်  
        //တူရင် user  ကို object ပြောင်းတယ် pass ကို ဖျက်တယ် ပီးရင် အဲဒီ user ကို token အဖြစ်ပြောင်းတယ် expire date သတ်မှတ်တယ်
        //ပီးရင် အဲဒီ user နဲ့ user ပိုင်တဲ့ role permission တွေကိုတွဲပီး redis ထဲမှာသိမ်းတယ် နောက်ပိုင်း login ဝင်ထားလားစစ်တဲ့အခါ mongo ကိုခနခနမခေါ်ရအောင်လို့ပါ
        //ပီးရင် login successfully ပြောတယ် user ပြန်ပြပေးတယ်
        
    }else{
        next(new Error("Creditial Error"));
    }
}
const addRole = async(req, res, next) =>{
    let dbUser=await DB.findById(req.body.userId);          //user ရှိလားရှာတယ်
    let dbRole = await RoleDB.findById(req.body.roleId);    //role ရှိလားရှာတယ်

    let foundRole=dbUser.roles.find(rid => rid ==req.body.roleId); // user ထဲမှာ အဲဒီ role ရှိလားရှာတယ်
    console.log(foundRole);
    if(foundRole){
        next (new Error('role already exists'));                  // ရှိရင် ထပ်ထည့်လို့မရလို့ err ပြတယ်
    }
    else{
        await DB.findByIdAndUpdate(dbUser._id,{$push:{roles:dbRole._id}});  // မရှိရင် အသစ်ထည့်တယ်
        let user = await DB.findById(dbUser._id);               // ထည့်ပီးကြောင်း user ကိုပြန်ခေါ်ပီးထုတ်ပြတယ်
        Helper.fMsg(res,"Added role to user",user);    
    }
    
}
const removeRole = async(req, res, next) =>{
    let dbUser=await DB.findById(req.body.userId);
    let dbRole = await RoleDB.findById(req.body.roleId);

    let foundRole=dbUser.roles.find(rid => rid ==req.body.roleId);
    if(foundRole){
        await DB.findByIdAndUpdate(dbUser._id,{$pull:{roles:dbRole._id}});
        Helper.fMsg(res,"role removed successfully");
    }
    else{
        next (new Error('role not  exists'));
    }
}
const addPermit = async(req, res, next) =>{
    let dbUser=await DB.findById(req.body.userId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    let foundPermit=dbUser.permits.find(pid => pid ==req.body.permitId);
    // console.log(foundPermit);
    if(foundPermit){
        next (new Error('role already exists'));
    }
    else{
        await DB.findByIdAndUpdate(dbUser._id,{$push:{permits:dbPermit._id}});
        let user = await DB.findById(dbUser._id);
        Helper.fMsg(res,"Added role to user",user);    
    }    
}
const removePermit = async(req, res, next) =>{
    let dbUser=await DB.findById(req.body.userId);
    let dbPermit = await PermitDB.findById(req.body.permitId);

    let foundPermit=dbUser.permits.find(pid => pid ==req.body.permitId);
    if(foundPermit){
        await DB.findByIdAndUpdate(dbUser._id,{$pull:{permits:dbPermit._id}});
        let user = await DB.findById(dbUser._id); 
        Helper.fMsg(res,"permit removed successfully",user);
    }
    else{
        next (new Error('permit not  exists'));
    }
}


module.exports={
    register,
    login,
    addRole,
    removeRole,
    addPermit,
    removePermit
}