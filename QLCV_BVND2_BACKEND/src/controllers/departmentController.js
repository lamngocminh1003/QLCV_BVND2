import departmentService from '../service/departmentService'
import departmentApiService from '../service/departmentApiService'

//trang chính department gồm danh sách 
const DepartmentPage = async (req, res) => {
    try {
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit;

            let data = await departmentApiService.getDepartmentWithPagination(+page, +limit);
            return res.status(200).json({
                EM: data.EM, //message
                EC: data.EC, //code
                DT: data.DT, //data
            });

        } else {
            let data = await departmentApiService.getAllDepartment();
            return res.status(200).json({
                EM: data.EM, //message
                EC: data.EC, //code
                DT: data.DT, //data
            });
        }

    } catch (e) {
        console.log(e);
        return res.status(500).json({ EM: "error from server chời đất ơi", EC: "-1", DT: "" });

    }
}
//tạo department với mã và tên
const DepartmentCreate = async (req, res) => {
    try {
        let data = await departmentApiService.addDepartment(req.body);
        return res.status(200).json({
            EM: data.EM, //message
            EC: data.EC, //code
            DT: data.DT, //data
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
    }


    // let madepartment = req.body.iddepartment;
    // //let tên biến tự đặt = req.body.giá trị của name trong departmentpage
    // let tendepartment = req.body.namedepartment;

    // await departmentService.taoDepartment(madepartment, tendepartment);
    // //truyền thẳng dữ liệu từ req.body.giá trị name trong departmentpage
    // return res.redirect("/department");
}
//xoá department theo id 
const DepartmentDelete = async (req, res) => {
    try {
        //console.log("req.body =", req.body)
        let data = await departmentApiService.delDepartment(req.body.id);
        return res.status(200).json({
            EM: data.EM, //message
            EC: data.EC, //code
            DT: data.DT, //data
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
    }


    // console.log(">>check id xoá:", req.params.id)
    // await departmentService.xoaDepartment(req.params.id);
    // return res.redirect("/department");
}
//chỉnh sửa department theo id
const DepartmentUpload = async (req, res) => {
    try {
        let data = await departmentApiService.loadDepartment(req.body);
        console.log(data)
        return res.status(200).json({
            EM: data.EM, //message
            EC: data.EC, //code  
            DT: data.DT, //data 
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
    }


    // let madepartment = req.params.id;
    // let departmentDuLieu = await departmentService.suaDepartment(madepartment);
    // console.log(departmentDuLieu);
    // return res.render("departmentupload.ejs", { departmentDuLieu });


    //return res.render("departmentupload.ejs", { departmentDuLieu })

    // let departmentDuLieu = {};
    // departmentDuLieu = tendepartment;
    // console.log(">> check id department:", departmentDuLieu);

    // // if (tendepartment && tendepartment.length > 0) {
    // //     departmentDuLieu = tendepartment[0];
    // // }
    // // console.log(departmentDuLieu)
    // return res.render("departmentupload.ejs", { departmentDuLieu });
}
//đã chỉnh sửa department
const DepartmentUploaded = async (req, res) => {
    try {
        return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });

    } catch (e) {
        console.log(e);
        return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });

    }


    // let madepartment = req.body.iddepartment;
    // let tendepartment = req.body.namedepartment;

    // await departmentService.dacapnhatDepartment(tendepartment, madepartment);

    // //quay về trang chủ
    // return res.redirect("/department");
}

module.exports = {
    DepartmentPage, DepartmentCreate, DepartmentUpload, DepartmentDelete, DepartmentUploaded
}

// import departmentService from '../service/departmentService'
// //import departmentApiService from '../service/departmentApiService'

// //trang chính department gồm danh sách
// const DepartmentPage = async (req, res) => {
//     try {
//         let readDepartment = await departmentApiService.getAllDepartment();
//         return res.status(200).json({ EM: readDepartment.EM, EC: readDepartment.EC, DT: readDepartment.DT });

//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ EM: "error from server chời đất ơi", EC: "-1", DT: "" });

//     }
// }
// //tạo department với mã và tên
// const DepartmentCreate = async (req, res) => {
//     try {
//         return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });
//     }


//     // let madepartment = req.body.iddepartment;
//     // //let tên biến tự đặt = req.body.giá trị của name trong departmentpage
//     // let tendepartment = req.body.namedepartment;

//     // await departmentService.taoDepartment(madepartment, tendepartment);
//     // //truyền thẳng dữ liệu từ req.body.giá trị name trong departmentpage
//     // return res.redirect("/department");
// }
// //xoá department theo id
// const DepartmentDelete = async (req, res) => {
//     try {
//         return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });

//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });

//     }


//     // console.log(">>check id xoá:", req.params.id)
//     // await departmentService.xoaDepartment(req.params.id);
//     // return res.redirect("/department");
// }
// //chỉnh sửa department theo id
// const DepartmentUpload = async (req, res) => {
//     try {
//         return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });

//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });

//     }


//     // let madepartment = req.params.id;
//     // let departmentDuLieu = await departmentService.suaDepartment(madepartment);
//     // console.log(departmentDuLieu);
//     // return res.render("departmentupload.ejs", { departmentDuLieu });


//     //return res.render("departmentupload.ejs", { departmentDuLieu })

//     // let departmentDuLieu = {};
//     // departmentDuLieu = tendepartment;
//     // console.log(">> check id department:", departmentDuLieu);

//     // // if (tendepartment && tendepartment.length > 0) {
//     // //     departmentDuLieu = tendepartment[0];
//     // // }
//     // // console.log(departmentDuLieu)
//     // return res.render("departmentupload.ejs", { departmentDuLieu });
// }
// //đã chỉnh sửa department
// const DepartmentUploaded = async (req, res) => {
//     try {
//         return res.status(200).json({ EM: data.EM, EC: data.EC, DT: data.DT });

//     } catch (e) {
//         console.log(e);
//         return res.status(500).json({ EM: "error from server", EC: "-1", DT: "" });

//     }


//     // let madepartment = req.body.iddepartment;
//     // let tendepartment = req.body.namedepartment;

//     // await departmentService.dacapnhatDepartment(tendepartment, madepartment);

//     // //quay về trang chủ
//     // return res.redirect("/department");
// }

// module.exports = {
//     DepartmentPage, DepartmentCreate, DepartmentUpload, DepartmentDelete, DepartmentUploaded
// }