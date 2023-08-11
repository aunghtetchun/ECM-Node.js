const jwt = require("jsonwebtoken");
const Helper = require("../utils/helper");

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      let result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateParam: (schema, name) => {
    return (req, res, next) => {
      let obj = {};
      obj[`${name}`] = req.params[`${name}`];
      let result = schema.validate(req.body);
      if (result.error) {
        next(new Error(result.error.details[0].message));
      } else {
        next();
      }
    };
  },
  validateToken: () => {
    return async (req, res, next) => {
      if (!req.headers.authorization) {
        next(new Error("Token is required"));
      }
      let token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.SECRET_KEY);
      if (decoded) {
        let user = await Helper.get(decoded._id);
        if (user) {
          req.user = user;
          next();
        } else {
          next(new Error("Token Error user not found"));
        }
      } else {
        next(new Error("Token Error"));
      }
    };
    // login ဝင်လာရင် headers ထဲက authorizations ထဲက token ကိုယူတယ် အဲဒီ token ရှိရင် jwt token အဖြစ် env.secretkey ကိုသုံးပီးပြောင်းတယ်
    // ပီးရင်  redis ထဲမှာ အဲဒီ user ရှိလား သွားရှာတယ်... 
    ///user နဲ့အတူ တွဲပီးသိမ်းထားတဲ့ role & permissions တွေပါတွဲပီးရလာမှာပါ... အဲဒါတွေက နောက်ပိုင်းအဲဒီ user ရဲ့လုပ်ပိုင်ခွင့်တွေကို စစ်တဲ့အခါမှာခနခနပြန်အသုံးဝင်ပါတယ်... 
    // ရှိရင် req.user ကို အဲဒီ user ထည့်ပေးလိုက်ပီး next() ကိုဆက်သွားခိုင်းတယ်...
  },
  validateRole: (role) => {
    return async(req, res, next) => {
        let foundRole = req.user.roles.find(ro => ro.name==role);
        // console.log(owner);
        if (foundRole){
            next();
        }else{
          next(new Error("Your are not owner"));
        }
    }
  },
  hasAnyRole: (roles) =>{
    return async (req, res, next) => {
      let bol=false;
      for(let i=0; i<roles.length; i++) {
        let hasRole=req.user.roles.find(ro => ro.name == roles[i]);
        if (hasRole){
          bol=true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You don't have enough role!"));;
    } 
  },
  hasAnyPermit: (permits) =>{
    return async (req, res, next) => {
      let bol=false;
      for(let i=0; i<permits.length; i++) {
        let hasPermit=req.user.permits.find(pr => pr.name == permits[i]);
        if (hasPermit){
          bol=true;
          break;
        }
      }
      if (bol) next();
      else next(new Error("You don't have enough permit!"));;
    } 
  }
};
