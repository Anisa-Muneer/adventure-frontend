import adventureRequest from "../utils/adventureRequest";

export const adventureSignup = (data) => {
    console.log(data);
    return adventureRequest.post('/adventureAuth/signup', data, {
        withCredentials: true
    })
}

export async function adventureLogin(value) {
    try {
        const data = await adventureRequest.post('/adventureAuth/login', { ...value })
        return data
    } catch (error) {
        return error
    }

}

export const AdventureSignupWithGoogle = (data) => {
    return adventureRequest.post('/adventureAuth/googlesignup', data, {
        withCredentials: true
    })
}

export async function editProfile(data, id) {
    try {
        const response = await adventureRequest.put(`/editProfile/${id}`, data, {
            withCredentials: true
        })
        return response
    } catch (error) {
        return error
    }
}


export async function ProfileImage(id, img) {
    console.log("adaadadada", img);
    try {

        const formData = new FormData();
        formData.append("image", img);
        formData.append("advId", id);
        const config = {
            header: {
                "content-type": "multipart/form-data",
                userId: id,
            },
            withCredentials: true,
        };

        const res = await adventureRequest.post("/imageEdit", formData, config);
        return res;
    } catch (error) {
        console.log(error);
    }
}

export const setSlot = async (data) => {
    try {
        console.log(data, 'data is found here');
        const response = await adventureRequest.post('/addSlots', data, {
            withCredentials: true
        })
        console.log(response, 'kjkjkjkjkjjkkjk')
        return response
    } catch (error) {
        console.log(error.message);
    }
}

export async function addCategory(value) {
    try {
        const data = await adventureRequest.post('/addCategory', value, {
            WithCredentials: true,
            header: {
                "content-type": "multipart/form-data",
            },

        })
        return data
    } catch (error) {
        return error
    }
}

export async function manageCategory(id) {
    return adventureRequest.put(`/manageCategory/${id}`)
}

export async function manageCategoryList(id) {
    return adventureRequest.put(`/manageCategoryList/${id}`)
}

export async function slotDelete(id, slotId) {
    console.log(id, slotId, 'api id is here');
    return adventureRequest.delete(`/slotdelete/${id}/${slotId}`);
}


export async function editCategory(data) {
    try {
        const response = await adventureRequest.post('/editCategory', data, {
            withCredentials: true,
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response
    } catch (error) {
        return error
    }
}


export async function addPosts(value) {
    try {
        const data = await adventureRequest.post('/addPosts', value, {
            withCredentials: true,
            header: {
                "content-type": "multipart/form-data",

            }
        })
        return data

    } catch (error) {
        return error
    }
}


export async function deletePost(id) {
    console.log(id, 'id is here');
    return adventureRequest.post('/deletePost', id);
}