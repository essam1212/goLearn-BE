import Joi from 'joi';

export const add = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'عنوان الحصة مطلوب.',
    'any.required': 'يجب إدخال عنوان الحصة.',
  }),
  videoLink: Joi.string()
    .uri()
    .required()
    .messages({
      'string.empty': 'رابط الفيديو مطلوب.',
      'string.uri': 'رابط الفيديو يجب أن يكون صالحاً.',
      'any.required': 'يجب إدخال رابط الفيديو.',
    }),
  pdfLink: Joi.string()
    .uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri': 'رابط الـ PDF يجب أن يكون صالحاً.',
    }),
    lessonPicture: Joi.string()
    .uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri':"يجب ان يكون رابط الصوره واضح",
    }),
  price: Joi.number()
    .positive()
    .required()
    .messages({
      'number.base': 'السعر يجب أن يكون رقم.',
      'number.positive': 'السعر يجب أن يكون قيمة موجبة.',
      'any.required': 'السعر مطلوب.',
    }),
    chapterName: Joi.string()
    
    .required()
    .messages({
      'string.empty': 'رقم الفصل مطلوب.',
      'any.required': 'يجب تحديد الفصل المرتبط بهذه الحصة.',
    }),
 
    
    examQuestions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid('essay', 'mcq')
          .required()
          .messages({
            'any.only': 'نوع السؤال يجب أن يكون إما essay أو mcq.',
            'any.required': 'نوع السؤال مطلوب.',
          }),
        questionText: Joi.string().required().messages({
          'string.empty': 'نص السؤال مطلوب.',
          'any.required': 'يجب إدخال نص السؤال.',
        }),
        options: Joi.when('type', {
          is: 'mcq',
          then: Joi.array()
            .items(Joi.string().required().messages({
              'string.empty': 'يجب إدخال نص الاختيار.',
              'any.required': 'كل اختيار يجب أن يحتوي على قيمة.',
            }))
            .min(2)
            .required()
            .messages({
              'array.min': 'يجب أن يحتوي السؤال الاختياري على اختيارين على الأقل.',
              'any.required': 'الاختيارات مطلوبة للسؤال الاختياري.',
            }),
          otherwise: Joi.forbidden(),
        }),
        correctAnswer: Joi.required().messages({
            'string.empty': 'الإجابة الصحيحة مطلوبة  .',
            'any.required': 'الإجابة الصحيحة مطلوبة  .',
          }),
         
        grade: Joi.number()
          .positive()
          .required()
          .messages({
            'number.base': 'درجة السؤال يجب أن تكون رقم.',
            'number.positive': 'درجة السؤال يجب أن تكون قيمة موجبة.',
            'any.required': 'درجة السؤال مطلوبة.',
          }),
      })
    )
    .min(1)
    .messages({
      'array.min': 'يجب أن يحتوي الامتحان على سؤال واحد على الأقل.',
    }),
  
}); 
// ==============================================================
export const update = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'عنوان الحصة مطلوب.',
  }),
  videoLink: Joi.string()
    .uri()
    .messages({
      'string.empty': 'رابط الفيديو مطلوب.',
      'string.uri': 'رابط الفيديو يجب أن يكون صالحاً.',
    }),
  pdfLink: Joi.string()
    .uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri': 'رابط الـ PDF يجب أن يكون صالحاً.',
    }),
    lessonPicture: Joi.string()
    .uri()
    .optional()
    .allow(null, '')
    .messages({
      'string.uri':"يجب ان يكون رابط الصوره واضح",
    }),
  price: Joi.number()
    .positive()
    .messages({
      'number.base': 'السعر يجب أن يكون رقم.',
      'number.positive': 'السعر يجب أن يكون قيمة موجبة.',
    }),
    chapterName: Joi.string()
    
    .messages({
      'string.empty': 'رقم الفصل مطلوب.',
    }),
 
    
    examQuestions: Joi.array()
    .items(
      Joi.object({
        type: Joi.string()
          .valid('essay', 'mcq')
          .required()
          .messages({
            'any.only': 'نوع السؤال يجب أن يكون إما essay أو mcq.',
            'any.required': 'نوع السؤال مطلوب.',
          }),
        questionText: Joi.string().required().messages({
          'string.empty': 'نص السؤال مطلوب.',
          'any.required': 'يجب إدخال نص السؤال.',
        }),
        options: Joi.when('type', {
          is: 'mcq',
          then: Joi.array()
            .items(Joi.string().required().messages({
              'string.empty': 'يجب إدخال نص الاختيار.',
              'any.required': 'كل اختيار يجب أن يحتوي على قيمة.',
            }))
            .min(2)
            .required()
            .messages({
              'array.min': 'يجب أن يحتوي السؤال الاختياري على اختيارين على الأقل.',
              'any.required': 'الاختيارات مطلوبة للسؤال الاختياري.',
            }),
          otherwise: Joi.forbidden(),
        }),
        correctAnswer: Joi.required().messages({
            'string.empty': 'الإجابة الصحيحة مطلوبة  .',
            'any.required': 'الإجابة الصحيحة مطلوبة  .',
          }),
         
        grade: Joi.number()
          .positive()
          .required()
          .messages({
            'number.base': 'درجة السؤال يجب أن تكون رقم.',
            'number.positive': 'درجة السؤال يجب أن تكون قيمة موجبة.',
            'any.required': 'درجة السؤال مطلوبة.',
          }),
      })
    )
    .min(1)
    .messages({
      'array.min': 'يجب أن يحتوي الامتحان على سؤال واحد على الأقل.',
    }),
  
});

