import axios from "axios";

const backendURL = 'http://146.190.89.3:9090';

const token = localStorage.getItem("jwt");
// Thiết lập tiêu đề "Authorization" trong yêu cầu Axios
const config = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const createDocIncoming = async (dataObj) => {
    return await axios.post(`${backendURL}/api/DocumentIncomming?Title=${dataObj.docName}&Content=${dataObj.docDes}&TimeStart=${dataObj.docExpireStart}&TimeEnd=${dataObj.docExpireEnd}`, 
    dataObj.files, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
    })
  .then(function(response){
    return response.status
  })
  .catch(function(error){
    return error.response.status
  })
}

const getAllDocSendUserLogin = async () => {
  return await axios.get(`${backendURL}/api/DocumentIncomming/GetAllDocSendUserLogin`, config)
  .then(function(response){
    return response.data
  })
  .catch(function(error){
    return error.response.status
  })
}

export {
    createDocIncoming, getAllDocSendUserLogin, getListTaskReceiver
};

const getListTaskReceiver = async () =>{
  return await axios.get(`${backendURL}/api/Task/GetListTaskReceiveUserLogin`,config)
  .then(function(response){
    return response.data
  })
  .catch(function(error){
    return error.response.status
  })
}