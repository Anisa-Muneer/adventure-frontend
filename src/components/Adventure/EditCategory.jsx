import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { Button, Dialog, DialogBody, DialogFooter, Input, Spinner, Typography } from '@material-tailwind/react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import adventureRequest from '../../utils/adventureRequest'
import { useFormik } from 'formik'
import { categorySchema } from '../../yup/validation'
import { editCategory } from '../../api/adventureApi'
import { setadventuredetails } from '../../Redux/AdventureSlice'
import { useDispatch } from 'react-redux'

function EditCategory({category}) {
    const queryClient = useQueryClient()
    const [open,setOpen] = useState(false)
    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()
    const id = category._id
    const handleOpen = ()=>{
        setOpen(!open)
    }

 const initialValues = {
    _id: category ? category._id : '',
    categoryName : category ? category.categoryName : '',
    entryFee : category ? category.entryFee : '',
    catDescription : category ? category.catDescription : '',
    image : category ? category.image : '',
 }

 const{
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue
 } = useFormik({
    initialValues : initialValues,
    validationSchema : categorySchema,
    onSubmit : async(values,{resetForm})=>{
        console.log(values,'value is here');
        setLoading(true)
        const formData = new FormData()
            formData.append("_id",values._id)
            formData.append("categoryName",values.categoryName)
            formData.append("catDescription",values.catDescription)
            formData.append("entryFee",values.entryFee)
            formData.append("image",values.image)
        const response = await editCategory(formData)
        console.log(formData,'formdata is here');
        if(response){
            resetForm
                setOpen(!open)
                setLoading(false)
              const adventureDetails = {
                    categoryName : response.data.data.categoryName,
                    entryFee : response.data.data.entryFee,
                    catDescription : response.data.data.catDescription,
                    image : response.data.data.image
            }
            dispatch(setadventuredetails({ adventureInfo: adventureDetails }))
            
                setOpen(!open)
                queryClient.invalidateQueries(['adventure'])
            }
            
        }
    
 })


  return (
    <>
         <p onClick={handleOpen} className="hover:bg-[#5d7582] hover:text-white  me-5cursor-pointer  rounded-full text-[#5d7582] text-xs"><PencilSquareIcon className="w-5 h-5 m-3" /></p>
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
                                Write a description
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
                      
                          
                        <Button type="submit" variant="gradient" color="green">
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
    </>
  )
}

export default EditCategory
