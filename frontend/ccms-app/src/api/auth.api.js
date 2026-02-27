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

