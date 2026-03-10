import api from "./api"

//signup User api
export const signupUser = (data) => {
    return api.post("/user/create-user", data);
}

//login user api
export const loginUser = (data) => {
    return api.post("/user/login", data);
}

// verify email exists
export const verifyEmail = (data) => {
    return api.post("/user/verify-email", data);
}

// change password api
export const changePassword = (data) => {
    return api.post("/user/change-password", data);
}

// add department
export const addDepartment = (data) => {
    return api.post("/user/addDepartment", data)
} 

// get departments
export const getAllDepartments = () => {
    return api.get("/user/getAllDepartments")
}

//delete department
export const deleteDepartment = (id) => {
    return api.delete(`/user/deleteDepartment/${id}`);
}