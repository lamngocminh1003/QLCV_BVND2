import React, { useState, useEffect } from 'react';
import { getUserAccount } from '../services/userService';
import { toast } from 'react-toastify';

const UserContext = React.createContext(null);

const UserProvider = ({ children }) => {
    const userDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: "",
        account: {}
    };

    const [user, setUser] = useState(userDefault);

    const loginContext = (userData) => {
        setUser({ ...userData, isLoading: false });
    };

    const logoutContext = () => {
        setUser({ ...userDefault, isLoading: false });
    }

    const parseJwt = (token) => {
        try {
          return JSON.parse(atob(token.split(".")[1]));
        } catch (e) {
          return null;
        }
    };

    const checkJWTExpire = () => {
        let result = false;
        let getJWT = localStorage.getItem('jwt');
        if(getJWT){
            let decodeJWT = parseJwt(getJWT);
            let currentDate  = new Date();

            if(decodeJWT.exp * 1000 < currentDate.getTime()) {
                //alert('Token đã hết hạn hoặc không tồn tại!')
                localStorage.removeItem('jwt'); //xóa localStorage
                return result 
            }
            else{
                //alert('jwt còn hạn')
                result = true;
                return result
            }
        }
        else{
            return result
        }
    }

    const fetchUser = async () => {
        let response = await getUserAccount();
        if(response === 401){
            //alert('Token đã hết hạn hoặc không tồn tại!');
            toast.error('Hãy đăng nhập để sử dụng chức năng này!');
            setUser({ ...userDefault, isLoading: false });
        }
        else{
            let userId = response.user_Id;
            let fullName = response.user_FullName;
            let email = response.user_Email;
            // let departmentId = response.department.department_ID;
            let departmentId = "6"
            let departmentName = "Phòng Điều dưỡng"
            let departmentHead = "dieuduong"

            let data = {
                isAuthenticated: true,
                account: {userId, fullName, email, departmentId, departmentName, departmentHead}
            }

            setTimeout(() => {
                setUser(data);
            }, 2 * 1000)
        }
    }

    useEffect(() => {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login-user') {
            fetchUser();
        }
        else if (window.location.pathname === '/') {
            (async () => {
                try {
                    let response = await getUserAccount();
                    if(response === 401){
                        setUser({ ...user, isLoading: false });
                    }
                    else{
                        let userId = response.user_Id;
                        let fullName = response.user_FullName;
                        let email = response.user_Email;
                        // let departmentId = response.department.department_ID;
                        let departmentId = "6"
                        let departmentName = "Phòng Điều dưỡng"
                        let departmentHead = "dieuduong"

                        let data = {
                            isAuthenticated: true,
                            account: {userId, fullName, email, departmentId, departmentName, departmentHead}
                        }

                        setTimeout(() => {
                            setUser(data);
                        }, 2 * 1000)
                    }
                } catch (error) {
                    console.log(error)
                }
            })();
        }
        else {
            setUser({ ...user, isLoading: false });
        }
    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider }