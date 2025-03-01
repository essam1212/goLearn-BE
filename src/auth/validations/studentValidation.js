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
      city: Joi.string().min(3).max(20).required().messages({
        "string.empty": "اسم المستخدم لا يمكن أن يكون فارغاً",
        "any.required": "اسم المستخدم مطلوب",
      }),
      address: Joi.string().min(3).max(20).required().messages({
        "string.base": "عنوان المستخدم يجب أن يكون نصاً",
        "string.empty": "عنوان المستخدم لا يمكن أن يكون فارغاً",
        "string.min": "عنوان المستخدم يجب أن يحتوي على 3 أحرف على الأقل",
        "any.required": "عنوان المستخدم مطلوب",
      }),
      stage: Joi.string().valid("اعدادي", "ثانوي").required().messages({
        "any.required": "المرحله الدراسيه مطلوبه",
      }),
      educationType: Joi.string().valid("عام", "ازهر").required().messages({
        "any.required": "نوع التعليم مطلوب",
      }),
      section: Joi.string().when("stage", {
        is: "ثانوي",  
        then: Joi.string().valid("علمي", "ادبي", "علمي علوم", "علمي رياضة").required().messages({
          "any.required": "القسم مطلوب",
        }),
      }),


      year: Joi.string().required().messages({
        "any.required": " السنه الدراسيه مطلوبه",

      }),
      profilePicture: Joi.string().uri()
      .optional()
      .allow(null, '')
      .messages({
        'string.uri': 'رابط الـ img يجب أن يكون صالحاً.',
      }),
      division: Joi.string().required(),
      section: Joi.string(),
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
      fatherPhone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)
        
        .messages({
          "string.empty": "رقم الهاتف الخاص بولي الامر لا يمكن أن يكون فارغاً",
          "string.pattern.base": "رقم الهاتف يجب أن يتكون من 11 رقم ويبدا ب 01",
        }),
        password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,}$")) // لازم تكون حروف وأرقام وأقل حاجة 8 حروف
        .required()
        .messages({
          "string.pattern.base": "❌ كلمة السر يجب أن تحتوي على حروف وأرقام فقط، وألا تقل عن 8 حروف.",
          "string.empty": "❌ كلمة السر مطلوبة!",
        }),
     
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

        password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{8,}$")) // لازم تكون حروف وأرقام وأقل حاجة 8 حروف
        .required()
        .messages({
          "string.pattern.base": "❌ كلمة السر يجب أن تحتوي على حروف وأرقام فقط، وألا تقل عن 8 حروف.",
          "string.empty": "❌ كلمة السر مطلوبة!",
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
      }),
   
      phone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)

        .messages({
          "string.empty": "رقم الهاتف لا يمكن أن يكون فارغاً",
          "string.pattern.base":
            " رقم الهاتف يجب أن يتكون من 11 رقم ويبدا ب 01",
        }),
      fatherPhone: Joi.string()
        .pattern(/^01[0125][0-9]{8}$/)

        .messages({
          "string.empty": "رقم الهاتف الخاص بولي الامر لا يمكن أن يكون فارغاً",
          "string.pattern.base": "رقم الهاتف يجب أن يتكون من 11 رقم ويبدا ب 01",
        }),
        year: Joi.string()

    }),
    profilePicture: Joi.string().uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri': 'رابط الـ img يجب أن يكون صالحاً.',
    })

};
