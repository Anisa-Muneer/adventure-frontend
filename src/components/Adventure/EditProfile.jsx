import React, { useState } from 'react'
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Spinner,
    Typography,
} from "@material-tailwind/react";
import { useFormik } from 'formik'
import { adventureEditProfileSchema } from '../../yup/validation';
import { editProfile } from '../../api/adventureApi';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import adventureRequest from '../../utils/adventureRequest';
import { setadventuredetails } from '../../Redux/AdventureSlice';


function EditProfile({adventure}) {
    const queryClient = useQueryClient()
    const [open, setOpen] = useState(false)
    const [selectedOptions, setSelectedOptions] = useState([]);
    const {adventureInfo} = useSelector((state)=>state.adventure)
    const id = adventureInfo.id
    const dispatch = useDispatch()

    const initialValues = {
        name: adventure ? adventure.name : '',
        location: adventure ? adventure.location : '',
        category: adventure ? adventure.category : [],
        pan: adventure ? adventure.pan : '',
        gst: adventure ? adventure.gst : '',
        description: adventure ? adventure.description : '',
    }

   
  
   

    const{
        values,
        errors,
        touched,
        handleBlur,
        handleSubmit,
        handleChange,
        setFieldValue,
    } = useFormik({
        initialValues : initialValues,
        validationSchema : adventureEditProfileSchema,
        onSubmit : async(values)=>{
            const response = await editProfile(values,id)
            console.log(response,'is geting to redux');
            if(response){
              const adventureDetails = {
                id: response.data.data._id,
                
                name: response.data.data.name,
                email: response.data.data.email,

            }
            dispatch(setadventuredetails({ adventureInfo: adventureDetails }))
            
                setOpen(!open)
                queryClient.invalidateQueries(['adventure'])
            }
            
        }
    })

   
  
    const handleMultipleChange = (selectedOptions) => {
      setFieldValue(
        "category",
        selectedOptions.map((option) => option.value)
      );
      setSelectedOptions(selectedOptions);
    };

    const {isLoading, error, data} = useQuery({
      queryKey : ['advCategory'],
      queryFn : ()=> adventureRequest.get('/advCategory').then((res)=>res.data)
    })

     if (isLoading) {
        return <div className="h-screen flex justify-center items-center"><Spinner color="blue" className="h-10 w-10 " /></div>

    }
    if (error) {
        return <h1>Something went wrong</h1>
    }

    
    const options = data.data.map((item) => {
      return { value: item.categoryName, label: item.categoryName };
    });
    

    const handleOpen = () => setOpen(!open)
    return (
        <>
            <p
                onClick={handleOpen}
                className="flex items-center hover:border-1 hover:text-[#13453a] cursor-pointer rounded-xl text-black text-xs">
                <PencilSquareIcon className="w-8 h-8 m-3" />
                <span className="ml-1">Edit Profile</span>
            </p>

            <Dialog
        open={open}
        handler={handleOpen}
        size="sm"
        className="rounded-none"
      >
        <DialogHeader>EDIT PROFILE</DialogHeader>
        <DialogBody className="flex justify-center ">
        <form onSubmit={handleSubmit}>
        <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                <Input
                  size="md"
                  variant="standard"
                  name="name"
                  label="Name"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                {touched.name && errors.name && (
                    <div className="text-red-500 text-xs ">
                       {errors.name}
                    </div>
                )}
              </div>
            </div>
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                <Input
                  size="md"
                  variant="standard"
                  name="location"
                  label="location"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.location}
                />
                {touched.location && errors.location && (
                    <div className="text-red-500 text-xs ">
                       {errors.location}
                    </div>
                )}
              </div>
            </div>
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                {/* <Input
                  size="md"
                  variant="standard"
                  name="category"
                  label="category"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.category}
                /> */}
                    {/* <select
                    name="propertyType"
                    value={values.propertyType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className="block appearance-none w-full bg-white border border-gray-500 hover:border-gray-400 px-4 py-2 pr-8 rounded-md leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="lowToHigh">Villa</option>
                    <option value="highToLow">Cottage</option>
                    <option value="highToLow">Resort</option>
                    <option value="highToLow">Homestay</option>
                  </select> */}
                   {/* <div>
                   <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                category
              </Typography>
              <Select
                options={options}
                onChange={handleMultipleChange}
                value={selectedOptions}
                isMulti={true}
              />

            </div>
                {touched.category && errors.category && (
                    <div className="text-red-500 text-xs ">
                       {errors.category}
                    </div>
                )} */}
              </div>
            </div>
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                <Input
                  size="md"
                  variant="standard"
                  name="pan"
                  label="pan"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.pan}
                />
                {touched.pan && errors.pan && (
                    <div className="text-red-500 text-xs ">
                       {errors.pan}
                    </div>
                )}
              </div>
            </div>
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                <Input
                  size="md"
                  variant="standard"
                  name="gst"
                  label="gst"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gst}
                />
                {touched.gst && errors.gst && (
                    <div className="text-red-500 text-xs ">
                       {errors.gst}
                    </div>
                )}
              </div>
            </div>
            <div className="mt-8 mb-2 w-70 max-w-screen-lg sm:w-96">
              <div className="my-3">
                <Input
                  size="md"
                  variant="standard"
                  name="description"
                  label="description"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.description}
                />
                {touched.description && errors.description && (
                    <div className="text-red-500 text-xs ">
                       {errors.description}
                    </div>
                )}
              </div>
            </div>
            <DialogFooter className="flex justify-between">
            <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button variant="filled" type="submit" color="green">
                <span>Save</span>
              </Button>
            </DialogFooter>
        </form>
        {/* <h1>{categoryName}</h1> */}
        </DialogBody>
      </Dialog>
        </>
    )
}

export default EditProfile
