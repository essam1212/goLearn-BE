import Joi from "joi";


export const add = {
  body: Joi.object()
    .required()
    .keys({
      year: Joi.string().required().messages({
        "any.required": "اسم السنه الدراسيه مطلوب",
      }),
     

   
      subjects:Joi.array().required().messages({
        "any.required": " ادخل الماده الدراسيه",
      })

    }),
};
// =======================================================
export const update = {
  body: Joi.object()
    .required()
    .keys({
      year: Joi.string(),
     

   
      subjects:Joi.array()

    }),
};
// =======================================================

