import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import ROUTE_CONFIG from './app/userConfig';
import {useSelector} from "react-redux";

function App() {

    const { isLogged, type } = useSelector(state => state.userReducer);

    return (
        <BrowserRouter>
            <Routes>

                {
                    ROUTE_CONFIG.ROUTES.map((route, index) => {
                        if(route.isRequiredAuth && !isLogged){
                            return(
                               <Route key={index} element={route.negativeComponent} exact={route.exact} path={route.path}/>
                            );
                        }else if(route.isRequiredAuth && isLogged){
                            return(
                                <Route key={index} element={route.componentFnc(type)} exact={route.exact} path={route.path}/>
                            );
                        }else{
                            return(
                                <Route key={index} element={route.component} exact={route.exact} path={route.path}/>
                            );
                        }
                    })
                }

            </Routes>
        </BrowserRouter>
    );
}

export default App;