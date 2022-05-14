import Login from './../components/Login';
import SideBar from "../components/includes/SideBar";
import Permissions from "../components/employee/Permissions";
import RequestLeave from "../components/employee/RequestLeave";
import ErrorPage from './../components/ErrorPage';
import PermissionsList from "../components/admin/PermissionsList";
const BASE_URL = "http://localhost:8080/";

const ROUTE_PATHS = {
    LOGIN: "/login",
    INDEX: "/",
    EXIT: "/exit",
    ADMIN: {
        INDEX: "/admin",
        PERMISSION_DETAILS: "/admin/permissionDetail",
    },
    EMPLOYEE: {
        INDEX: "/employee",
        PERMISSIONS: "/employee/permissions",
        REQUEST_PERMISSIONS: "/employee/requestPermissions",
    }
};

const USER_TYPES = {
    EMPLOYEE: 0,
    ADMIN: 1,
};


// 0 -> onay bekliyor, 1 -> onaylandı, -> 2 reddedildi
const REQUEST_STATES = {
    0: "Onay Bekliyor",
    1: "Kabul Edildi",
    2: "Reddedildi"
}

const API_PATHS = {
    //.....
    EMPLOYEE:{
        LOGIN: (username, password) => {
            return `${BASE_URL}employee/login/${username}/${password}`;
        },
        CREATE_ANNUAL_REQUEST: () => {
            return `${BASE_URL}permissions/create`;
        },
        GET_ANNUAL_REQUESTS: (employeeId) => {
            return `${BASE_URL}permissions/getPermissionsByEmployeeId/${employeeId}`;
        }
    },
    ADMIN: {
        LOGIN: (username, password) => {
            return `${BASE_URL}admin/login/${username}/${password}`;
        },
        GET_ANNUAL_PERMISSIONS: () => {
            return `${BASE_URL}permissions/`;
        },
        UPDATE_ANNUAL_PERMISSIONS: () => {
            return `${BASE_URL}permissions/save`;
        },
    }
};

const ROUTE_CONFIG = {
    ROUTES: [
        {
            path: '/',
            componentFnc: (userType) => {
                if(userType === USER_TYPES.EMPLOYEE){
                    return(
                        <>
                            <SideBar/>
                        </>
                    );
                }else if(userType === USER_TYPES.ADMIN){
                    return(
                        <>
                            <SideBar/>
                        </>
                    );
                }
            },
            isRequiredAuth: true,
            negativeComponent: <Login/>,
            exact: false,
        },
        {
            path: '/login',
            isRequiredAuth: false,
            exact: true,
            component: <Login />,
        },
        {
            path: '/requestLeave',
            componentFnc: (userType) => {
                if(userType === USER_TYPES.EMPLOYEE){
                    return(
                        <>
                            <RequestLeave/>
                        </>
                    );
                }else if(userType === USER_TYPES.ADMIN){
                    return(
                        <>
                            <ErrorPage/>
                        </>
                    );
                }
            },
            isRequiredAuth: true,
            negativeComponent: <Login/>,
            exact: true,
        },
        {
            path: '/permissions',
            componentFnc: (userType) => {
                if(userType === USER_TYPES.EMPLOYEE){
                    return(
                        <>
                            <Permissions/>
                        </>
                    );
                }else if(userType === USER_TYPES.ADMIN){
                    return(
                        <>
                            <PermissionsList/>
                        </>
                    );
                }
            },
            isRequiredAuth: true,
            negativeComponent: <Login/>,
            exact: true,
        }
    ]
};
export default ROUTE_CONFIG;
export {
    ROUTE_PATHS,
    BASE_URL,
    USER_TYPES,
    API_PATHS,
    REQUEST_STATES
}