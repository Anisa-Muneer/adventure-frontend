import React, { useState } from 'react'
import { UserPlusIcon } from '@heroicons/react/24/solid'
import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Typography, Input, Textarea } from '@material-tailwind/react'
import { useFormik } from 'formik'
import { categorySchema } from '../../yup/validation'
import { addCategory } from '../../api/adventureApi'
import { GenerateError } from '../../toast/GenerateError'


function AddCategory({refetch}) {
    const [open, setOpen] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(null);

    const initialValues = {
        categoryName : '',
        catDescription : '',
        entryFee : '',
        image : ''
    }

    const {
        values,
        touched,
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue
    } = useFormik({
        initialValues : initialValues,
        validationSchema : categorySchema, 
        onSubmit : async (values,{ resetForm} )=>{
            // if (!validateImage(selectedImage)) {
            //     return;
            //   }
            setLoading(true)
            //   setFieldValue('image', selectedImage);
             


            const formData = new FormData()
            formData.append("categoryName",values.categoryName)
            formData.append("catDescription",values.catDescription)
            formData.append("entryFee",values.entryFee)
            formData.append("image",values.image)

            const response = await addCategory(formData)
            console.log(response,'its a response');
            if(response.data.created){
                resetForm
                setOpen(!open)
                setLoading(false)
            }
            refetch()

        }
    })

    const handleOpen = () => setOpen(!open)
    return (
        <>
        
            <p

                className="flex items-center hover:border-1 hover:text-[#13453a] cursor-pointer rounded-xl text-black text-xs">
                <Button onClick={handleOpen} className="flex items-center gap-3 bg-[#13453a]" size="sm">
                    <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Category
                </Button>
            </p>


            <Dialog open={open} handler={handleOpen}>
                {/* <DialogHeader className=""></DialogHeader> */}
                <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                    <DialogBody className="max-h-[400px] overflow-y-auto">
                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Category
                            </Typography>
                            <Input
                                type="text"
                                name="categoryName"
                                
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.categoryName}

                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            />
                            {touched.categoryName && errors.categoryName && (
                  <div className="text-red-500 text-sm ">{errors.categoryName}</div>
                )}

                        </div>

                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Description
                            </Typography>
                            <Input
                                type="text"
                                name="catDescription"
                                
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.catDescription}

                                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            />
                            {touched.catDescription && errors.catDescription && (
                  <div className="text-red-500 text-sm ">{errors.catDescription}</div>
                )}

                        </div>

                        <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Add category image
              </Typography>
              <Input
                type="file"
                accept="image/*"
                className=" !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                name='image'
                 onChange={(e) => {
                                const selectedFile = e.currentTarget.files[0];
                                setFieldValue("image", selectedFile);
                            }}
         
              />
               {touched.image && errors.image && (
                  <div className="text-red-500 text-sm ">{errors.image}</div>
                )}

            </div>




                        <div>
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="mb-2 font-medium"
                            >
                                Entry Fee
                            </Typography>
                            <Input
                            type='number'
                                name="entryFee"
                                
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.entryFee}
                            />
                            {touched.entryFee && errors.entryFee && (
                  <div className="text-red-500 text-sm ">{errors.entryFee}</div>
                )}

                        </div>
                        
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            variant="text"
                            color="red"
                            onClick={()=>handleOpen(!open)}
                            className="mr-1"
                        >
                            <span>Cancel</span>
                        </Button>
                        {loading ?
                            <Button  variant="gradient" color="green" className='disabled'>
                            <span>please wait</span>
                        </Button> :
                        <Button type="submit" variant="gradient" color="green">
                            <span>Submit</span>
                        </Button>}
                    </DialogFooter>
                </form>
            </Dialog>

        </>
    )
}

export default AddCategory

