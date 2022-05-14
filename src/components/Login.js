import React, {Component, useEffect, useState} from 'react'
import styled from "styled-components";
import './../index.css';
import Alert from "./alert/Alert";
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import {setUserInfo} from './../features/user/userSlice';
import { Navigate, useNavigate } from "react-router-dom";
import {ROUTE_PATHS, API_PATHS} from "../app/userConfig";

const Login = (props) => {

    const [userName, setUserName] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState(0);
    const [alertHide, setAlertHide] = useState(false);
    const [loginType, setLoginType] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const alertHideDelay = (delay) => {
        setTimeout(() => {
            setAlertHide(false);
        }, delay);
    };

    const login = () => {

        if (userName.trim() !== "" && userPassword.trim() !== "") {
            let path = null;
            if(loginType === 0){
                path = API_PATHS.EMPLOYEE.LOGIN(userName, userPassword);
            }
            else{
                path = API_PATHS.ADMIN.LOGIN(userName, userPassword);
            }
            axios.get(path)
            .then((response) => {
                if(response.data.data === null){
                    setAlertType(1);
                    setAlertMessage("Kullanıcı adı veya şifre hatalı!");
                    setAlertHide(true);
                    alertHideDelay(3000);
                }else{
                    navigate(ROUTE_PATHS.INDEX);
                    dispatch(setUserInfo({
                        type: loginType,
                        userId: response.data.data.id,
                        userName: response.data.data.userName,
                        userPassword: response.data.data.userPassword,
                        userIsLogged: true,
                    }));
                }

            })
            .catch((error) => {
                alert("Bir hata meydana geldi.");
            });
        } else {
            setAlertHide(true);
            setAlertMessage("Lütfen gerekli alanları doldurunuz!");
            setAlertType(0);
            alertHideDelay(3000);
        }
    };


    const onChangeEvent = (e) => {
        if (e.target.name === "adminName") {
            setUserName(e.target.value);
        } else if (e.target.name === "adminPassword") {
            setUserPassword(e.target.value);
        } else if (e.target.name === "employeeName") {
            setUserName(e.target.value);
        } else if (e.target.name === "employeePassword") {
            setUserPassword(e.target.value);
        }
    };

    return (
        <Container className="container">
            <Form>
                <Header>
                    <AdminTab id={"adminTag"} onClick={() => setLoginType(1)} active={(loginType === 1)}>
                        <h3>Admin</h3>
                    </AdminTab>
                    <PersonalTab id={"personalTag"} onClick={() => setLoginType(0)} active={(loginType === 0)}>
                        <h3>Personel</h3>
                    </PersonalTab>
                </Header>
                <Body>

                    <Title>
                        {(loginType === 1) ? "Admin Giriş" : "Personel Giriş"}
                    </Title>
                    {
                        (alertHide) ? <Alert message={alertMessage} type={alertType}/> : ""
                    }
                    <InputBox>
                        <Input placeholder={(loginType === 1) ? "Admin adı" : "Personal adı"}
                               name={(loginType === 1) ? "adminName" : "employeeName"} value={userName}
                               onChange={onChangeEvent}/>
                    </InputBox>
                    <InputBox>
                        <Input type={"password"} placeholder={(loginType === 1) ? "Admin şifre" : "Personal şifre"}
                               name={(loginType === 1) ? "adminPassword" : "employeePassword"} value={userPassword}
                               onChange={onChangeEvent}/>
                    </InputBox>
                    <Button onClick={login}>
                        Giriş
                    </Button>
                </Body>
            </Form>
        </Container>
    );
}

const Container = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.div`
  background-color: white;
  border-radius: 10px;
  width: 40%;
  height: 45%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  flex-direction: row;
`;

const AdminTab = styled.div`
  width: 50%;
  border-top-left-radius: 10px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-bottom:1px solid #f2f2f2;
  :hover {
    background-color: #f2f2f2;
  }

  background-color: ${props => (props.active) ? '#dbdbdb' : 'white'};

`;

const PersonalTab = styled.div`
  width: 50%;
  height: 60px;
  border-top-right-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  box-sizing: content-box;
  border-bottom:1px solid #f2f2f2;
  :hover {
    background-color: #f2f2f2;
  }

  background-color: ${props => (props.active) ? '#dbdbdb' : 'white'};
`;

const Body = styled.div`
  height: 100%;
  padding: 7.5%;
`;

const InputBox = styled.div`
  margin-top: 35px;
`;

const Input = styled.input`
  width: 100%;
  color: black;
  height: 40px;
  padding: 10px 16px;
  border-radius: 5px;
  border: 1px solid gray;
  outline: none;

  ::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  width: 100%;
  margin-top: 25px;
  height: 35px;
  font-size: 17px;
  background-color: #6d6d6d94;
  color: whitesmoke;
  border:none;
  border-radius: 5px;
  cursor: pointer;
  :hover{
    opacity: .7;
  }
`;

const Title = styled.h3`
  color: #0d8aa7;
`;


export default Login;