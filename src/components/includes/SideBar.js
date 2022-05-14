import React, {Component} from "react";
import styled from "styled-components";
import '../../index.css';
import {NavLink, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {USER_TYPES} from './../../app/userConfig';
import { useDispatch } from "react-redux";
import {setUserInfo} from './../../features/user/userSlice';

const SideBar = () => {
    const type = useSelector( (state) => state.userReducer.type );

    let sideBar = null;
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(setUserInfo({
            isLogged: false,
            userId: null,
            username: "",
            password: ""
        }));
    };

    if(type === USER_TYPES.ADMIN){
        sideBar = (
            <Li>
                <NavLink to="/permissions"
                         className={isActive => (isActive) ? "active" : null}>
                    Oluşturulan İzinler
                </NavLink>
            </Li>
        );
    }else if(type === USER_TYPES.EMPLOYEE){
        sideBar = (
            <>
                <Li>
                    <NavLink to="/requestLeave"
                             className={isActive => (isActive) ? "active" : null}>
                        İzin Oluştur
                    </NavLink>
                </Li>
                <Li>
                    <NavLink to="/permissions"
                             className={isActive => (isActive) ? "active" : null}>
                        İzinlerim
                    </NavLink>
                </Li>
            </>
        );
    }

    return (
        <Container>
            <Header>
                <Logo>
                    TEIN YAZILIM
                </Logo>
            </Header>
            <Body>
                <Nav>
                    <NavUl>

                        {sideBar}
                    </NavUl>
                </Nav>
            </Body>
            <Footer>
                <ExitButton onClick={logout}>
                    Çıkış Yap
                </ExitButton>
            </Footer>
        </Container>
    );
}

const Container = styled.div`
  height: 100vh;
  width: 15%;
  display: inline-block;
  min-width: 250px;
  background-color: #062541;
  color: #829BB2;
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.h3`
  color: white;
  cursor: pointer;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Body = styled.div`
  height: 85%;
`;

const Footer = styled.div``;

const Nav = styled.nav`
  height: 100%;
  width: 100%;
`;
const NavUl = styled.ul`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Li = styled.li`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  :hover {
    background-color: #1E3752;
    color: #DAE3ED;
  }
`;

const MenuName = styled.span``;

const ExitButton = styled.a`
  color: white;
  display: block;
  width: 100%;
  padding: 15px;
  cursor: pointer;
  text-align: center;
`;

export default SideBar;