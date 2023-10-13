import db from '../models/index';

const getAllDepartment = async () => {
    try {
        let dulieuDepartment = await db.department.findAll({
            attributes: ["id", "departmentName"],
            include: { model: db.user, attributes: ["fullName", "userName", "phone", "email", 'roleId', 'positionId', 'departmentId'] },
            nest: true
        }
        );
        if (dulieuDepartment) {
            return {
                EM: 'get data ôk',
                EC: 0,
                DT: dulieuDepartment
            }
        } else {
            return {
                EM: 'không get data', EC: 0, DT: []
            }
        }

    } catch (e) {
        console.log(e);
        return {
            EM: 'lỗi kìa má', EC: 1, DT: []
        }
    }
}

const getDepartmentWithPagination = async (page, limit) => {
    try {
        let offset = (page - 1) * limit;

        const { count, rows } = await db.department.findAndCountAll({
            offset: offset, limit: limit, raw: true,
            attributes: ["id", "departmentName"],
            include: { model: db.user, attributes: ["fullName", "userName", "phone", "email", 'roleId', 'positionId', 'departmentId'] },
            order: [['id', 'desc']]
        })
        let totalPages = Math.ceil(count / limit);
        let data = {
            totalRows: count,
            totalPages: totalPages,
            department: rows
        }
        return {
            EM: 'fetch ôki', EC: 0, DT: data
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'lỗi kìa méeeee', EC: 1, DT: []
        }
    }
}

const loadDepartment = async (data) => {
    try {
        //console.log(data);
        let department = await db.department.findOne({
            where: { id: data.departmentData.id },
        })
        //console.log("CHECK ĐEPẢMENT DATA: ", department)

        if (department) {
            //update
            await db.department.update({
                departmentName: data.departmentData.departmentName
            }, {
                where: { id: data.departmentData.id }
            })
            return {
                EM: 'update oki nha',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'hok thí tên khoa phòng nì',
                EC: 2,
                DT: ''
            }
        }
    } catch (e) {
        console.log(e);
        return {
            EM: 'lỗi kìa ní', EC: 1, DT: []

        }
    }
}

const addDepartment = async (id_department, name_department) => {
    try {
        await db.department.create(id_department, name_department);
        return {
            EM: 'đã tạo ôki', EC: 0, DT: []
        }
    } catch (e) {
        console.log(e);
    }
}

const delDepartment = async (id_department) => {
    try {
        let department = await db.department.findOne({
            where: { id: id_department }
        })
        if (department) {

            await department.destroy();
            // Now this entry was removed from the database

            return {
                EM: 'xoá khoa phòng thành công', EC: 0, DT: []
            }
        } else {
            return {
                EM: '0 có khoa phòng này á', EC: 2, DT: []
            }
        }

    } catch (e) {
        console.log(e);

        return {
            EM: 'lỗi server rùi á', EC: 1, DT: data
        }

    }
}

module.exports = {
    getAllDepartment,
    loadDepartment,
    addDepartment,
    delDepartment,
    getDepartmentWithPagination
}