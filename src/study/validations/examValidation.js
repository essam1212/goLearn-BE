import Joi from "joi";

export const add = {
    body: Joi.object()
      .required()
      .keys({
       
  
     
       
        title:Joi.string().required().messages({
          "any.required": " ادخل اسم الامتحان",
        }),
        
        chapterName:Joi.string().required().messages({
          "any.required": " ادخل اسم الفصل",
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
      .required()
      .messages({
        'array.min': 'يجب أن يحتوي الامتحان على سؤال واحد على الأقل.',
        'any.required': 'الأسئلة مطلوبة.',
      }),
    
      }),
    
  };

  // =========================================================

  export const update = {
    body: Joi.object()
      .required()
      .keys({
       
  
     
       
        title:Joi.string(),
        
        chapterName:Joi.string(),
        examQuestions:Joi.array()
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
        .required()
        .messages({
          'array.min': 'يجب أن يحتوي الامتحان على سؤال واحد على الأقل.',
          'any.required': 'الأسئلة مطلوبة.',
        }),
      
      }),
    
  };