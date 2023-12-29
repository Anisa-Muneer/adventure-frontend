import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { adventurePostSchema } from "../../yup/validation";
import { useFormik } from "formik";
import { addPosts } from "../../api/adventureApi";
import { useQuery, useQueryClient } from "@tanstack/react-query";

function AddPosts() {
  const [open, setOpen] = useState(false);
  const [selectImage, setSelectImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    category: '',
    image: []
  }
  const {
    values,
    touched,
    errors,
    handleBlur,
    handleSubmit,
    handleChange,
    setFieldValue
  } = useFormik({
    initialValues: initialValues,
    validationSchema: adventurePostSchema,
    onSubmit: async (values) => {
      setLoading(true)
      const formData = new FormData()
      formData.append("category", values.category)
      for (let i = 0; i < values.image.length; i++) {
        formData.append("image", values.image[i]);
      }
      const response = await addPosts(formData)
      if (response) {
        setOpen(!open)
        setLoading(false)
        queryClient.invalidateQueries(["posts"]);
      }

    }
  })
  const queryClient = useQueryClient()
  const handleOpen = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleOpen}>Add Post</Button>
      </div>

      <Dialog open={open} handler={handleOpen}>
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
                name="category"
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"

                onChange={handleChange}
                onBlur={handleBlur}
                value={values.category}
              />
              {touched.category && errors.category && (
                <div className="text-red-500 text-sm ">{errors.category}</div>
              )}
            </div>

            <div>
              <Input
                type="file"
                accept="image/*"
                className=" !border-t-blue-gray-200 text-center focus:!border-t-gray-900"
                name="image"
                multiple
                onChange={(e) => {
                  const selectedFile = e.currentTarget.files;
                  setFieldValue("image", selectedFile);
                }}
              />
              {touched.image && errors.image && (
                <div className="text-red-500 text-sm ">{errors.image}</div>
              )}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => handleOpen(!open)}
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
  );
}

export default AddPosts;
