import userRequest from '../utils/userRequest'

export const userSignup = (data) => {
    console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhh');
    return userRequest.post('/auth/signup',data,{
        withCredentials:true,
    })
}