import Joi from "joi";


export const add = {
  body: Joi.object()
    .required()
    .keys({
      year: Joi.string().required().messages({
        "any.required": " السنه الدراسيه مطلوبه",
      }),

   
      subjectName:Joi.string().required().messages({
        "any.required": " ادخل الماده الدراسيه",
      }),
      title:Joi.string().required().messages({
        "any.required": " ادخل اسم الفصل",
      })

    }),
};

// =======================================================
export const update = {
  body: Joi.object()
    .required()
    .keys({
      year: Joi.string().optional(),
      subjectName:Joi.string().optional(),
      title:Joi.string().optional()
    }),
};
