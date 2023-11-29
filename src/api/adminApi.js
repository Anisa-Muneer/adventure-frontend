import adminRequest from "../utils/adminRequest";

export async function adminLogin(value){
    try {
        const data = await adminRequest.post('/adminAuth/login',{...value})
        return data
    } catch (error) {
        return error
    }
}

export async function manageUsers(id){
    return adminRequest.put(`/manageUsers/${id}`)
}

export async function manageAdventure(id){
    return adminRequest.put(`/manageAdventure/${id}`)
}

export async function verifyAdventure(id){
    return adminRequest.put(`/verify/${id}`)
}



