import userRequest from '../utils/userRequest'

export const userSignup = (data) => {
    console.log(data);
    return userRequest.post('/auth/signup',data,{
        withCredentials:true,
    })
}

export  async function userLogin(value){
    try {
       const data = await userRequest.post('/auth/login',{...value}) 
       
       return data
    } catch (error) {
       console.log(error.message); 
    }

}

export const UserSignupWithGoogle=(data)=>{
    return userRequest.post('/auth/googleSignup',data,{
        withCredentials:true,
    })
}

export async function UpdateImage(id, img) {
    console.log("adaadadada", img);
    try {
       
      const formData = new FormData();
      formData.append("image", img);
      formData.append("userId", id);
      const config = {
        header: {
          "content-type": "multipart/form-data",
          userId: id,
        },
        withCredentials: true,
      };
      
      const res = await userRequest.post("/imgupdate", formData, config);
      return res;
    } catch (error) {
      console.log(error);
    }
  }