import apiUserService from "../service/apiUserService";

const handleCreateUserAPI = async (req, res) => {
    const isPhone = (number) => {
        return /(84|0[3|5|7|8|9])+([0-9]{8})\b/.test(number);
    }

    const isEmail = (email) => {
        return /(.+)@(.+){2,}\.(.+){2,}/.test(email);
    }

    let fullName = req.body.userData.fullName;
    let userName = req.body.userData.userName;
    let password = req.body.userData.password;
    let phone = req.body.userData.phone;
    let email = req.body.userData.email;
    let roleId = req.body.userData.role;
    let positionId = req.body.userData.position;
    let departmentId = req.body.userData.department;
    let image = req.body.userData.image

    if (fullName.length === 0) {
        return res.status(200).json({
            EM: 'Bạn chưa nhập họ tên',
            EC: -1,
            DT: []
        });
    }

    if (userName.length < 5) {
        return res.status(200).json({
            EM: 'Tên người dùng phải tối thiểu 5 ký tự!',
            EC: -1,
            DT: []
        });
    }

    if (password.length < 5) {
        return res.status(200).json({
            EM: 'Mật khẩu phải tối thiểu 5 ký tự!',
            EC: -1,
            DT: []
        });
    }

    if (!isPhone(phone)) {
        return res.status(200).json({
            EM: 'Số điện thoại không đúng định dạng!',
            EC: -1,
            DT: []
        });
    }

    if (!isEmail(email)) {
        return res.status(200).json({
            EM: 'Email không đúng định dạng!',
            EC: -1,
            DT: []
        });
    }

    if (roleId === 0) {
        return res.status(200).json({
            EM: 'Bạn chưa chọn vai trò!',
            EC: 1,
            DT: []
        });
    }

    if (positionId === 0) {
        return res.status(200).json({
            EM: 'Bạn chưa chọn vị trí!',
            EC: 1,
            DT: []
        });
    }

    if (departmentId === 0) {
        return res.status(200).json({
            EM: 'Bạn chưa chọn khoa phòng!',
            EC: 1,
            DT: []
        });
    }

    else {
        try {
            let result = await apiUserService.createNewUser(fullName, userName, password, phone, email, roleId, positionId, departmentId);
            return res.status(200).json({
                EM: result.EM,
                EC: result.EC,
                DT: result.DT,
            })
        } catch (error) {
            return res.status(500).json({
                EM: 'Có lỗi xảy ra ở server!',
                EC: 1,
                DT: []
            });
        }
    }
}

const handleGetUserAPI = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await apiUserService.getUserWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT //data
            })
        }
        else {
            let data = await apiUserService.getAllUser();
            return res.status(200).json({
                EM: data.EM, //error message
                EC: data.EC, //error code
                DT: data.DT //data
            })
        }
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleGetUserByIdAPI = async (req, res) => {
    try {
        let data = await apiUserService.getUserById();
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleUpdateUserByIdAPI = async (req, res) => {
    try {
        let data = await apiUserService.updateUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleDeleteUserByIdAPI = async (req, res) => {
    try {
        let data = await apiUserService.deleteUserById(req.body.userId)
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }

    catch (err) {
        console.log(err)
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleUserLogin = async (req, res) => {
    try {
        let data = await apiUserService.userLogin(req.body);

        if (data && data.DT && data.DT.access_token) {
            //set cookie
            res.cookie("jwt", data.DT.access_token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
        }

        //nếu login thành công hàm này sẽ nhận được token đã mã hóa ở apiUserService và sẽ tạo cookie đính kèm với token để return về cho client
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

const handleUserLogout = async (req, res) => {
    try {
        res.clearCookie('jwt');
        return res.status(200).json({
            EM: 'đã xóa cookie', //error message
            EC: 0, //error code
            DT: '' //data
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //data
        })
    }
}

const handleGetUserAccount = async (req, res) => {
    return res.status(200).json({
        EM: 'api này dùng để khi refresh page',
        EC: 0, //error code
        DT: {
            access_token: req.token,
            permissionWithRole: req.user.permissionWithRole,
            department: req.user.department,
            departmentName: req.user.departmentName,
            userName: req.user.userName,
            fullName: req.user.fullName,
            email: req.user.email
        }
    })
}

const handleReadRoleAPI = async (req, res) => {
    try {
        let data = await apiUserService.getReadRole()
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleReadPositionAPI = async (req, res) => {
    try {
        let data = await apiUserService.getReadPosition()
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

const handleReadDepartmentAPI = async (req, res) => {
    try {
        let data = await apiUserService.getReadDepartment()
        return res.status(200).json({
            EM: data.EM, //error message
            EC: data.EC, //error code
            DT: data.DT //data
        })
    }

    catch (err) {
        console.log(err);
        return res.status(500).json({
            EM: 'error from server',
            EC: '-1', //error code
            DT: '' //date
        })
    }
}


module.exports = {
    handleCreateUserAPI, handleGetUserAPI, handleUpdateUserByIdAPI, handleDeleteUserByIdAPI, handleGetUserByIdAPI,
    handleUserLogin, handleUserLogout, handleGetUserAccount,
    handleReadRoleAPI, handleReadPositionAPI, handleReadDepartmentAPI
}