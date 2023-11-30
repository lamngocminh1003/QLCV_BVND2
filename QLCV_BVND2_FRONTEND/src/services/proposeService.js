import axios from "axios";

const backendURL = 'http://146.190.89.3:9090';

const createConfig = () => {
  const token = localStorage.getItem("jwt");
  // Thiết lập tiêu đề "Authorization" trong yêu cầu Axios
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  return config;
}

const getProposeSend = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/DocumentIncomming/GetAllDocSendByUserLogin`, config)
    .then(function(response){
        return response.data
    })
    .catch(function(error){
        return error.response.status
    })
}

const getProposeReceive = async () => {
    const config = createConfig();
    return await axios.get(`${backendURL}/api/DocumentIncomming/GetAllDocReceiveByUserLogin`, config)
    .then(function(response){
        return response.data
    })
    .catch(function(error){
        return error.response.status
    })
}

const createPropose = async (dataObj) => {
    const token = localStorage.getItem("jwt");
    return await axios.post(`${backendURL}/api/DocumentIncomming/SendDepartmentHead?Title=${dataObj.document_Incomming_Title}&Content=${dataObj.document_Incomming_Content}`, 
    dataObj.proposeFile, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          }
        })
    .then(function(response){
        return response.status
    })
    .catch(function(error){
        return error.response.status
    })
}

const createProposeByHeader = async (dataObj) => {
    const config = createConfig();
    return await axios.post(`${backendURL}/api/DocumentIncomming/Create?Title=${dataObj.proposeName}&Content=${dataObj.proposeContent}`)
    .then(function(response){
        return response.status
    })
    .catch(function(error){
        return error.response.status
    })
}

const updateProposeState = async (id, state) => {
    const config = createConfig();
    return await axios.put(`${backendURL}/api/DocumentIncomming/UpdateState/${id}/${state}`, '', config)
    .then(function(response){
        return response.status
    })
    .catch(function(error){
        return error.response.status
    })
}

export {
    createPropose, createProposeByHeader, getProposeSend, getProposeReceive, updateProposeState
};