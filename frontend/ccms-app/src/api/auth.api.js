import api from "./api"

//signup User api
export const signupUser = (data) => {
    return api.post("/user/create-user", data);
}

//login user api
export const loginUser = (data) => {
    return api.post("/user/login", data);
}

