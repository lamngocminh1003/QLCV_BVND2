import bcrypt from 'bcryptjs';
import mysql from 'mysql2/promise';
import bluebird from 'bluebird';
import db from '../models/index'; // trong models có index quản lý các models khác

const salt = bcrypt.genSaltSync(10);

//tạo thông tin, truyền dữ liệu tới database
const taoDepartment = async (id_department, name_department) => {
    try {
        await db.department.create({
            departmentName: name_department,
            // tên cột trong database: tham chiếu
        })
    }
    catch (error) {
        console.log(">>> check lỗi:", error)
    }
}
//lấy danh sách từ database
const danhsachDepartment = async () => {
    let departments = [];
    departments = await db.department.findAll({ raw: true })
    return departments;

    // const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'qlcv_bvnd2', Promise: bluebird });
    // try {
    //     const [rows, fields] = await connection.execute('SELECT * FROM department');
    //     return rows;
    // }
    // catch (error) {
    //     console.log(">>> check error:", error)
    // }
}
//xoá 1 cái trong danh sách database
const xoaDepartment = async (id_department) => {
    await db.department.destroy({
        where: { id: id_department }
    })

    //     const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'qlcv_bvnd2', Promise: bluebird });
    //     try {
    //         const [rows, fields] = await connection.execute('DELETE FROM department WHERE id=?', [id_department]);

    //     }
    //     catch (error) {
    //         console.log(">>> check error:", error)
    //     }
}

//chỉnh sửa 1 cái trong danh sách database
const suaDepartment = async (id_department) => {
    let department;
    department = await db.department.findAll({
        where: { id: id_department },
        raw: true,
    })
    return department;
}

//đã cập nhật 1 cái trong danh sách database
const dacapnhatDepartment = async (tendepartment, madepartment) => {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'qlcv_bvnd2', Promise: bluebird });
    try {
        const [rows, fields] = await connection.execute('UPDATE department SET departmentName=? WHERE id=?', [tendepartment, madepartment]);
        return rows;
    }
    catch (error) {
        console.log(">>> check lỗi sửa:", error)
    }
}

//xuất các const ra
module.exports = { taoDepartment, danhsachDepartment, xoaDepartment, suaDepartment, dacapnhatDepartment }