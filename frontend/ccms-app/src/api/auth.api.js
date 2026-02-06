import api from "./api"

export const signupUser = (data) => {
    return api.post("/user/create-user", data);
}