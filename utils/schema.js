const Joi= require('joi');

module.exports ={   
    UserSchema:{
        register: Joi.object({
            name: Joi.string().min(5).required(),
            email: Joi.string().email().required(),
            phone: Joi.string().min(7).max(11).required(),
            password: Joi.string().min(8).required()
        }),
        login: Joi.object({
            phone: Joi.string().min(7).max(11).required(),
            password: Joi.string().min(8).required()
        }),
        addRole:Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
            userId: Joi.string().regex(/^[0-9a-fA-f]{24}$/)
        }),
        addPermit:Joi.object({
            permitId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
            userId: Joi.string().regex(/^[0-9a-fA-f]{24}$/)
        })
    },
    PermitSchema: {
        add: Joi.object({
            name: Joi.string().required(),
        })
    },
    AllSchema:{
        id:Joi.object({
            id: Joi.string().regex(/^[0-9a-fA-f]{24}$/)
        })
    },
    RoleSchema:{
        addPermit:Joi.object({
            roleId: Joi.string().regex(/^[0-9a-fA-f]{24}$/),
            permitId: Joi.string().regex(/^[0-9a-fA-f]{24}$/)
        })
    }
}