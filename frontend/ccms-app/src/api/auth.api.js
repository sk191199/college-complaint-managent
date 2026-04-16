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

//update department
export const updateDepartment = (id, data) => {
    return api.put(`/user/updateDepartment/${id}`, data)
}

//raise complaint
// export const raiseComplaint = (data) => {
//     return api.post("/user/raiseComplaint", data)
// }
export const raiseComplaint = (data) => {
  return api.post("/user/raiseComplaint", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

//get all users
export const getAllUsers = () => {
    return api.get("/user/getallusers")
}

//delete user
export const deleteUser = (id) => {
    return api.delete(`/user/deleteuser/${id}`)
}

//get all complaints
export const getAllComplaints = (page = 1, limit = 10, status = "") => {
    return api.get(`/user/complaints?page=${page}&limit=${limit}&status=${status}`);
}
//put update complaint
export const updateComplaint = (id, status) => {
    return api.put(`user/complaint/${id}`, {status})
}
// get all complaints by user
export const getAllComplaintsByUser = (page = 1, limit=10, status = "") => {
    return api.get(`user/usercomplaints?page=${page}&limit=${limit}&status=${status}`)
}

//get total users count
export const getTotalUsers = () => {
    return api.get("/user/totalusers")
}

//get total departments count
export const getTotalDepartments = () => {
    return api.get("/user/totaldepartments")
}

// get complaint counts
export const getComplaintCounts = () => {
    return api.get("/user/complaintcounts")
}

//get complaint count by user
export const getComplaintCountByUser = () => {
    return api.get("/user/complaintscountbyuser")
}

// get department wise complaint count for graph
export const getDepartmentWiseCompplaintCount = () => {
    return api.get("/user/departmentwisecomplaints")
}