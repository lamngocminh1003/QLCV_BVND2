require("dotenv").config();
import jwt from "jsonwebtoken";

const noneSecurePaths = ['/', "/user/login", "/user/logout"];

const createJWT = (payLoad) => {
    let key = process.env.JWT_SECRET;
    let token = null
    try {
        token = jwt.sign(payLoad, key, { expiresIn: +process.env.JWT_EXPIRES_IN });
        //console.log('Token đã mã hóa là: ', token);
    }
    catch (err) {
        console.log(err);
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null
    try {
        decoded = jwt.verify(token, key);
    }
    catch (error) {
        console.log(error)
    }
    return decoded;
}

const extractBearerToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    }
    // else if(req.query && req.query.token)
    // {
    //     return req.query.token;
    // }
    return null
}


const checkUserJWT = (req, res, next) => {
    //nếu path hiện tại trùng với đã khai báo thì sẽ không check function này nữa
    if (noneSecurePaths.includes(req.path)) {
        return next();
    }

    else {
        let cookies = req.cookies;
        let tokenFromHeaderBearer = extractBearerToken(req)
        if ((cookies && cookies.jwt) || tokenFromHeaderBearer) {
            // console.log('token cookies la: ', cookies.jwt)
            // console.log('token bearer la: ', tokenFromHeaderBearer)
            let token = cookies && cookies.jwt ? cookies.jwt : tokenFromHeaderBearer;
            let decoded = verifyToken(token)

            if (decoded && decoded.length !== 0) {
                req.user = decoded;
                //console.log('token đã được giải mã từ cookies: ', req.user);
                req.token = token //tái sử dụng token hiện tại
                next();
            }
            else {
                return res.status(401).json({
                    EM: 'Token không hợp lệ!',
                    EC: 1,
                    DT: ''
                })
            }
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Chưa xác thực được người dùng!'
            })
        }
    }
}

const checkUserPermission = (req, res, next) => {
    if (noneSecurePaths.includes(req.path) || req.path === "/user/account") {
        return next();
    }
    else {
        if (req.user) {
            let arrPermission = ['Tạo người dùng', 'Xóa người dùng', 'Sửa người dùng', 'Xem người dùng'];

            let userName = req.user.userName;
            let permission = req.user.permissionWithRole.permissions;

            if (noneSecurePaths.includes(req.path))

                return next();

            //nếu không tồn tại permission 
            if (!permission || permission.length === 0) {
                return res.status(403).json({
                    EC: -1,
                    DT: '',
                    EM: 'Bạn không có quyền để sử dụng chức năng này!'
                })
            }

            let canAccess = permission.filter(element => arrPermission.includes(element.permissionName));

            if (canAccess && canAccess.length != 0) {
                return next();
            }
            else {
                return res.status(403).json({
                    EC: -1,
                    DT: '',
                    EM: 'Bạn không có quyền để sử dụng chức năng này!'
                })
            }
        }
        else {
            return res.status(401).json({
                EC: -1,
                DT: '',
                EM: 'Chưa xác thực được người dùng!'
            })
        }
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermission
}