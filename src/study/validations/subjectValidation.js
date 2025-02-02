import Joi from "joi";


export const add = {
  body: Joi.object()
    .required()
    .keys({
     
      teacherNames: Joi.array(),
      name: Joi.string().required().messages({
        "any.required": "اسم الماده  مطلوب",
      }),

      section:Joi.string(),
      availableFor:Joi.string().required(),
      
    

    }),
}; 
// =======================================================

