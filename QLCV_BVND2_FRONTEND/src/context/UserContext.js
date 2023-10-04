import React, { useState, useEffect } from 'react';
import { getUserAccount } from '../services/userService';

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

    const fetchUser = async () => {
        let response = await getUserAccount();
        if (response && response.EC === 0) {

            let userToken = response.DT.access_token
            let permission = response.DT.permissionWithRole;
            let departmentId = response.DT.department;
            let userName = response.DT.userName;
            let fullName = response.DT.fullName;
            let email = response.DT.email;

            let data = {
                isAuthenticated: true,
                token: userToken,
                account: { permission, departmentId, userName, fullName, email },
                isLoading: false
            }
            setTimeout(() => {
                setUser(data);
            }, 2 * 1000)
        }

        else {
            alert('Token đã hết hạn hoặc không tồn tại!');
            setUser({ ...userDefault, isLoading: false });
        }
    }

    useEffect(() => {
        //fetchUser();

        if (window.location.pathname !== '/' && window.location.pathname !== '/login_user') {
            fetchUser();
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