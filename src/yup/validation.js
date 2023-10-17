import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name : Yup.string().min(2).max(20).required("Please Enter Your Name"),
    email : Yup.string().email().required("Please Enter Your Email"),
    mobile : Yup.string().required("Please Enter Your Mobile Number").matches(/^\d{10}$/,"Mobile Number must have 10 digits"),
    password : Yup.string().required('Please Enter a Password')
})