import Joi from "joi";


export const signUpValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(20).required().messages({
        "string.base": "اسم المستخدم يجب أن يكون نصاً",
        "string.empty": "اسم المستخدم لا يمكن أن يكون فارغاً",
        "string.min": "اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل",
        "any.required": "اسم المستخدم مطلوب",
      }),

      email: Joi.string()
        .email()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
          "string.base": "البريد الإلكتروني يجب أن يكون نصاً",
          "string.pattern.base": "ادخل بريد اليكتروني صحيح",

          "string.empty": "البريد الإلكتروني لا يمكن أن يكون فارغاً",
          "string.email": "البريد الإلكتروني غير صالح",
          "any.required": "البريد الإلكتروني مطلوب",
        }),
      phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)

        .messages({
          "string.empty": "رقم الهاتف لا يمكن أن يكون فارغاً",
          "string.pattern.base":
            " رقم الهاتف يجب أن يتكون من 11 رقم ويبدا ب 01",
        }),

      password: Joi.string().min(8).required().messages({
        "string.base": " كلمة المرور يجب أن تكون نص وارقام",
        "string.empty": "كلمة المرور لا يمكن أن تكون فارغة",
        "string.min": "كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل",
        "any.required": "كلمة المرور مطلوبة",
      }),
      accessibleTo: Joi.string().required().messages({
        "any.required": "التخصص مطلوب"
      }),
      subjectName:Joi.array().required().messages({
        "any.required": " ادخل الماده الدراسيه",
      }),
      years:Joi.array().required().messages({
        "any.required": " ادخل السنين الدراسيه",

      })


    }),
};
// =======================================================
export const loginValidation = {
  body: Joi.object()
    .required()
    .keys({
      email: Joi.string()
        .email()
        .pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
        .required()
        .messages({
          "string.base": "البريد الإلكتروني يجب أن يكون نصاً",
          "string.pattern.base": "ادخل بريد اليكتروني صحيح",

          "string.empty": "البريد الإلكتروني لا يمكن أن يكون فارغاً",
          "string.email": "البريد الإلكتروني غير صالح",
          "any.required": "البريد الإلكتروني مطلوب",
        }),

      password: Joi.string().min(8).required().messages({
        "string.base": " كلمة المرور يجب أن تكون نص وارقام",
        "string.empty": "كلمة المرور لا يمكن أن تكون فارغة",
        "string.min": "كلمة المرور يجب أن تحتوي على 6 أحرف على الأقل",
        "any.required": "كلمة المرور مطلوبة",
      }),
    }),
};
// ................................................................

export const updateValidation = {
  body: Joi.object()
    .required()
    .keys({
      name: Joi.string().min(3).max(20).messages({
        "string.base": "اسم المستخدم يجب أن يكون نصاً",
        "string.empty": "اسم المستخدم لا يمكن أن يكون فارغاً",
        "string.min": "اسم المستخدم يجب أن يحتوي على 3 أحرف على الأقل",
        "any.required": "اسم المستخدم مطلوب",
      }),

      phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)

        .messages({
          "string.empty": "رقم الهاتف لا يمكن أن يكون فارغاً",
          "string.pattern.base":
            " رقم الهاتف يجب أن يتكون من 11 رقم ويبدا ب 01",
          "any.required": "رقم الهاتف مطلوب",
        }),
    }),
};
