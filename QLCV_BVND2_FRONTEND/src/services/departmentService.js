//import axios from "axios";

import axios from "../setup/axios";

const fetchAllDepartment = (page, limit) => {
    return axios.get(`/api/v1/department?page=${page}&limit=${limit}`);
    //template string, nối chuỗi
}

const delDepartment = (department) => {
    return axios.delete('/api/v1/department-delete', { data: { id: department.id } });
}

const createNewDepartment = (departmentData) => {
    return axios.post("/api/v1/department/create", { ...departmentData }
    )
}

const updateCurrentDepartment = (departmentData) => {
    return axios.put("/api/v1/department-upload", { ...departmentData }
    )
}
export {
    fetchAllDepartment,
    delDepartment,
    createNewDepartment,
    updateCurrentDepartment
};