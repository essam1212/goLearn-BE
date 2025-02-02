import Joi from "joi";
export const chaptersValidation = {
  body: Joi.object()
    .required()
    .keys({
      yearName: Joi.string().required().messages({
        "string.base": "السنه الدراسيه يجب ان تكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "السنه الدراسيه مطلوبه  ",
      }),
      chapterName: Joi.string().required().messages({
        "string.base": " اسم الفصل يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "اسم الفصل  مطلوب",
      }),
    }),
};
// ==================================================
export const lessonsValidation = {
  body: Joi.object()
    .required()
    .keys({
      title: Joi.string().required().messages({
        "string.base": " عنوان الدرس يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": " عنوان الدرس مطلوب  ",
      }),
      yearName: Joi.string().required().messages({
        "string.base": "السنه الدراسيه يجب ان تكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "السنه الدراسيه مطلوبه  ",
      }),
      chapterName: Joi.string().required().messages({
        "string.base": " اسم الفصل يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "اسم الفصل  مطلوب",
      }),
      youtubeLink: Joi.string().uri().required(),

      exam: Joi.object({
        essayQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              answer: Joi.string().optional(), // الإجابة اختيارية
            })
          )
          .optional(), // إذا كنت تريد السماح بعدم وجود هذا الحقل
        multipleChoiceQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              options: Joi.array().items(Joi.string()).min(2).required(), // يجب أن تحتوي على خيارين على الأقل
              correctAnswer: Joi.string().optional(), // الإجابة الصحيحة اختيارية
            })
          )
          .optional(), // إذا كنت تريد السماح بعدم وجود هذا الحقل
      }),
    }),
};
// ======================================================
export const updateLessonValidation = {
  body: Joi.object()
    .required()
    .keys({
      title: Joi.string().messages({
        "string.base": " عنوان الدرس يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
      }),
     
      yearName: Joi.string().messages({
        "string.base": "السنه الدراسيه يجب ان تكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
      }),
      chapterName: Joi.string().messages({
        "string.base": " اسم الفصل يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
      }),
      youtubeLink: Joi.string().uri(),

      exam: Joi.object({
        essayQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              answer: Joi.string().optional(), // الإجابة اختيارية
            })
          )
          .optional(), // إذا كنت تريد السماح بعدم وجود هذا الحقل
        multipleChoiceQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              options: Joi.array().items(Joi.string()).min(2).required(), // يجب أن تحتوي على خيارين على الأقل
              correctAnswer: Joi.string().optional(), // الإجابة الصحيحة اختيارية
            })
          )
          .optional(), // إذا كنت تريد السماح بعدم وجود هذا الحقل
      }),
    }),
};
// ======================================================
export const examValidation = {
  body: Joi.object()
    .required()
    .keys({
      title: Joi.string().required().messages({
        "string.base": " عنوان الامتحان يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": " عنوان الامتحان مطلوب  ",
      }),
      yearName: Joi.string().required().messages({
        "string.base": "السنه الدراسيه يجب ان تكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "السنه الدراسيه مطلوبه  ",
      }),
      chapterName: Joi.string().required().messages({
        "string.base": " اسم الفصل يجب ان يكون نصا",
        "string.empty": "هذا لا يجب ان يكون فارغا",
        "any.required": "اسم الفصل  مطلوب",
      }),
      exam: Joi.object({
        essayQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              answer: Joi.string().optional(), 
            })
          )
          .optional(), 
        multipleChoiceQuestions: Joi.array()
          .items(
            Joi.object({
              question: Joi.string().required(),
              options: Joi.array().items(Joi.string()).min(2).required(),
              correctAnswer: Joi.string().optional()
            })
          )
          .optional()
      }),
    }),
};

// =============================================================================
export const updateExamValidation={
  body: Joi.object()
  .required()
  .keys({
    title: Joi.string().messages({
      "string.base": " عنوان الامتحان يجب ان يكون نصا",
      "string.empty": "هذا لا يجب ان يكون فارغا"
    }),
    yearName: Joi.string().messages({
      "string.base": "السنه الدراسيه يجب ان تكون نصا",
      "string.empty": "هذا لا يجب ان يكون فارغا",
    }),
    chapterName: Joi.string().messages({
      "string.base": " اسم الفصل يجب ان يكون نصا",
      "string.empty": "هذا لا يجب ان يكون فارغا",
    }),
    exam: Joi.object({
      essayQuestions: Joi.array()
        .items(
          Joi.object({
            question: Joi.string().required(),
            answer: Joi.string().optional(), 
          })
        )
        .optional(), 
      multipleChoiceQuestions: Joi.array()
        .items(
          Joi.object({
            question: Joi.string().required(),
            options: Joi.array().items(Joi.string()).min(2).required(),
            correctAnswer: Joi.string().optional()
          })
        )
        .optional()
    }),
  }),
}
