import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name : Yup.string().min(2).max(20).required("Please Enter Your Name"),
    email : Yup.string().email().required("Please Enter Your Email"),
    mobile : Yup.string().required("Please Enter Your Mobile Number").matches(/^\d{10}$/,"Mobile Number must have 10 digits"),
    password : Yup.string().required('Please Enter a Password')
});

export const loginSchema = Yup.object({
    email:Yup.string().email().required('Please enter your Email'),
    password:Yup.string().required('Please enter a password')
})

export const adventureEditProfileSchema = Yup.object({
    name : Yup.string().min(3).required('Please Enter Your Name'),
    location : Yup.string().min(3).required("please Enter a location"),
    category : Yup.array().required("Choose Category"),
    pan : Yup.string().min(5).required("Please enter the pan number"),
    gst : Yup.string().min(5).required("Please enter a gst number"),
    description : Yup.string().min(15).max(100).required("Please add a description")
})

export const categorySchema = Yup.object({
    categoryName : Yup.string().min(2).required("Please type the ccategory"),
    entryFee : Yup.string().min(1).max(10).required('Please add a description'),

})

export const slotSchema = Yup.object().shape({
    startdate: Yup.date()
    .required("Start date is required")
    .test("is-future", "Start date must be in the future", (value) => {
      const now = new Date();
      return value > now;
    })
    ,
  enddate: Yup.date()
    .required("End date is required").test(
      "is-future",
      "End date must be in the future",
      (value, { parent }) => {
        // Ensure enddate is greater than or equal to startdate
        return value >= parent.startdate;
      }
    )
    ,
  startTimeHour: Yup.string().required("Start Time Hour is required"),
  startTimeMinute: Yup.string().required("Start Time Minute is required"),
  startTimeMeridiem: Yup.string().required("Start Time AM/PM is required"),
  endTimeHour: Yup.string().required("End Time Hour is required"),
  endTimeMinute: Yup.string().required("End Time Minute is required"),
  endTimeMeridiem: Yup.string().required("End Time AM/PM is required"),
  category : Yup.string().required("Please select a category")
})