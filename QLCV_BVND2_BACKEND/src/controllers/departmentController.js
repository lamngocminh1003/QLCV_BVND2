import departmentService from '../service/departmentService'
//trang chính department gồm danh sách 
const DepartmentPage = async (req, res) => {
    let listDepartment = await departmentService.danhsachDepartment();
    console.log(">>> check danh sách", listDepartment);

    return res.render("departmentpage.ejs", { listDepartment }); //truyền theo { }
}
//tạo department với mã và tên
const DepartmentCreate = async (req, res) => {
    let madepartment = req.body.iddepartment;
    //let tên biến tự đặt = req.body.giá trị của name trong departmentpage
    let tendepartment = req.body.namedepartment;

    await departmentService.taoDepartment(madepartment, tendepartment);
    //truyền thẳng dữ liệu từ req.body.giá trị name trong departmentpage
    return res.redirect("/department");
}
//xoá department theo id
const DepartmentDelete = async (req, res) => {
    console.log(">>check id xoá:", req.params.id)
    await departmentService.xoaDepartment(req.params.id);
    return res.redirect("/department");
}
//chỉnh sửa department theo id
const DepartmentUpload = async (req, res) => {
    let madepartment = req.params.id;
    let departmentDuLieu = await departmentService.suaDepartment(madepartment);
    console.log(departmentDuLieu);
    return res.render("departmentupload.ejs", { departmentDuLieu });


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
    let madepartment = req.body.iddepartment;
    let tendepartment = req.body.namedepartment;

    await departmentService.dacapnhatDepartment(tendepartment, madepartment);

    //quay về trang chủ
    return res.redirect("/department");
}
module.exports = {
    DepartmentPage, DepartmentCreate, DepartmentUpload, DepartmentDelete, DepartmentUploaded
}