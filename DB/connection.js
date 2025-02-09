import mongoose from 'mongoose'

const connectDB  = async ()=>{
  
    return await mongoose.connect(`${process.env.DBURL}`)
    .then(() => {
      // لو الاتصال تم بنجاح
      console.log('Connected to MongoDB'); // ممكن تعرض أي رسالة هنا
    })
    .catch((error) => {
      // لو حصل مشكلة في الاتصال
      console.error('Error connecting to MongoDB:', error);
    });
}

export default connectDB;   