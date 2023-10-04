import bcrypt from "bcryptjs";
import db from "../models/index";
import { getPermissionWithRole } from './JWTService';
import { createJWT } from '../middleware/JWTActions';
import { Op } from 'sequelize';
require('dotenv').config();

const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    let hashPassword = bcrypt.hashSync(password, salt);
    return hashPassword;
};

const checkUsername = async (inputUserName) => {
    try {
        let checkUserName = await db.user.findAll({
            where: { userName: inputUserName }
        })

        if (checkUserName) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.log(error);
    }
}

const checkPassword = (inputPassword, hashPasswordDB) => {
    return bcrypt.compareSync(inputPassword, hashPasswordDB) //true, false
}

const createNewUser = async (fullName, userName, password, phone, email, roleId, positionId, departmentId) => {
    let hash_userUserPassword = hashPassword(password);
    try {
        let resultCreate = await db.user.create({
            fullName: fullName,
            userName: userName,
            password: hash_userUserPassword,
            phone: phone,
            email: email,
            roleId: roleId,
            positionId: positionId,
            departmentId: departmentId,
        })

        return {
            EM: 'Thêm người dùng thành công!',
            EC: 0,
            DT: []
        }
    }

    catch (err) {
        console.log(err)
        return {
            EM: 'Tên người dùng đã tồn tại!',
            EC: 1,
            DT: []
        }
    }
}

const getUserById = async (userId) => {
    try {
        let users = await db.user.findAll({
            where: userId,
            attributes: ["id", "fullName", "userName", "phone", "email", "roleId", "positionId", "departmentId", "image"],
            include: [{ model: db.department, attributes: ["departmentName"] }, { model: db.position, attributes: ["positionName"] }, { model: db.role, attributes: ["roleName"] }],
            raw: true,
            nest: true,
        });

        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    }

    catch (err) {
        console.log(err)
        return {
            EM: 'get data failed',
            EC: 1,
            DT: []
        }
    }
}

const getAllUser = async () => {
    try {
        let users = await db.user.findAll({
            attributes: ["id", "fullName", "userName", "phone", "email", "roleId", "positionId", "departmentId", "image"],
            include: [{ model: db.department, attributes: ["departmentName"] }, { model: db.position, attributes: ["positionName"] }, { model: db.role, attributes: ["roleName"] }],
            raw: true,
            nest: true,
        });

        if (users) {
            return {
                EM: 'get data success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'get data success',
                EC: 0,
                DT: []
            }
        }
    }

    catch (err) {
        console.log(err)
        return {
            EM: 'get data failed',
            EC: 1,
            DT: []
        }
    }
}

const getUserWithPagination = async (page, limit) => {
    try {
        let offSet = (page - 1) * limit;
        let { count, rows } = await db.user.findAndCountAll({
            attributes: ["id", "fullName", "userName", "phone", "email", "image"],
            include: [{ model: db.role, attributes: ["roleName", "id"] }, { model: db.position, attributes: ["positionName", "id"] }, { model: db.department, attributes: ["departmentName", "id"] }],
            order: [["id", "DESC"]],
            raw: true,
            nest: true,
            offset: offSet,
            limit: limit,
        });

        let totalPages = Math.ceil(count / limit)

        let data_obj = {
            totalRows: count,
            totalPages: totalPages,
            userList: rows
        }

        return {
            EM: 'get data success',
            EC: 0,
            //biến obj data là 1 cục obj khác
            DT: data_obj
        }
    }

    catch (err) {
        console.log(err)
        return {
            EM: 'get data failed',
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        let user = await db.user.findOne({
            where: { id: data.userData.id }
        })
        if (user) {
            //update
            db.user.update(
                {
                    fullName: data.userData.fullName,
                    phone: data.userData.phone,
                    email: data.userData.email,
                    roleId: data.userData.role,
                    positionId: data.userData.position,
                    departmentId: data.userData.department
                },
                { where: { id: data.userData.id } }
            )

            return {
                EM: 'Đã cập nhật thông tin người dùng!',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                //not found
                EM: 'Không tìm thấy người dùng!',
                EC: 2,
                DT: []
            }
        }
    }
    catch (err) {
        console.log(err)
        return {
            EM: 'Đã có lỗi xảy ra ở phía server!',
            EC: 2,
            DT: []
        }
    }
}

const deleteUserById = async (userId) => {
    try {
        let find_user = await db.user.findOne({
            where: { id: userId }
        })

        if (find_user) {
            await find_user.destroy();
            return {
                EM: 'Xóa người dùng thành công!',
                EC: 0,
                DT: []
            }
        }
        else {
            return {
                EM: 'Không tìm thấy người dùng',
                EC: 2,
                DT: []
            }
        }
    }
    catch (err) {
        console.log(err);
    }
}

const userLogin = async (data) => {
    try {
        let user = await db.user.findOne({
            where: {
                userName: data.valueUserName,
            },
        })

        if (user) {
            let isUserNameExit = await checkUsername(data.valueUserName);
            let isPasswordCorrect = checkPassword(data.valuePassWord, user.password);

            if (isUserNameExit === true && isPasswordCorrect === true) {
                let permissionWithRole = await getPermissionWithRole(user);
                let payLoad = {
                    userName: user.userName,
                    fullName: user.fullName,
                    email: user.email,
                    department: user.departmentId,
                    permissionWithRole,
                }

                let token = createJWT(payLoad);

                return {
                    EM: 'OK',
                    EC: 0,
                    DT: {
                        access_token: token,
                        permissionWithRole: permissionWithRole,
                        department: user.departmentId,
                        userName: user.userName,
                        fullName: user.fullName,
                        email: user.email
                    }
                }
            }

            return {
                EM: 'Tài khoản hoặc mật khẩu không đúng!',
                EC: 1,
                DT: []
            }
        }

        else {
            return {
                //Không tìm thấy người dùng!
                EM: 'Tài khoản hoặc mật khẩu không đúng!',
                EC: 1,
                DT: []
            }
        }
    }

    catch (error) {
        console.log(error);
        return {
            EM: 'Đã có lỗi xảy ra ở server!',
            EC: 2,
            DT: []
        }
    }
}

const getReadRole = async () => {
    try {
        let listRole = await db.role.findAll({
            order: [['roleName', 'ASC']],
            raw: true,
            nest: true,
        });
        return {
            EM: 'get data success',
            EC: 0,
            DT: listRole
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Không tìm thấy danh sách vai trò',
            EC: 2,
            DT: []
        }
    }
}

const getReadPosition = async () => {
    try {
        let listPosition = await db.position.findAll({
            order: [['positionName', 'ASC']],
            raw: true,
            nest: true,
        });
        return {
            EM: 'get data success',
            EC: 0,
            DT: listPosition
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Không tìm thấy danh sách vị trí',
            EC: 2,
            DT: []
        }
    }
}

const getReadDepartment = async () => {
    try {
        let listDepartment = await db.department.findAll({
            order: [['departmentName', 'ASC']],
            raw: true,
            nest: true,
        });
        return {
            EM: 'get data success',
            EC: 0,
            DT: listDepartment
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'Không tìm thấy danh sách vị trí',
            EC: 2,
            DT: []
        }
    }
}

module.exports = {
    createNewUser, getAllUser, updateUser, deleteUserById, getUserById, getUserWithPagination, userLogin,
    getReadRole, getReadPosition, getReadDepartment
}