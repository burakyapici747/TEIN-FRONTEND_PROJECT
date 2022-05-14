import React, {Component, useState, UseEffect, useEffect} from "react";
import styled from "styled-components";
import helper, {dateFormatter} from './../../helper';
import {API_PATHS} from "../../app/userConfig";
import axios from "axios";
import {useSelector} from "react-redux";
import SideBar from "../includes/SideBar";

const RequestLeave = () => {


    const {userId} = useSelector(state => state.userReducer);

    const today = new Date(Date.now());
    const startDateValue = dateFormatter(today);
    const endDateValue = dateFormatter(new Date(today.setDate(today.getDate() + 1)));
    const [leaveDays, setLeaveDays] = useState(1);
    const [startDate, setStartDate] = useState(startDateValue);
    const [endDate, setEndDate] = useState(endDateValue);

    useEffect(() => {
        dateControl(startDate, endDate);
        setDiffDays(startDate, endDate);
    }, [startDate, leaveDays, endDate]);

    const dateControl = (startDate, endDate) => {
        if (startDate >= endDate) {
            let currentStartDate = new Date(startDate);
            currentStartDate.setDate(currentStartDate.getDate() + leaveDays);
            setEndDate(dateFormatter(currentStartDate));
        }
    }

    const setDiffDays = (startDate, endDate) => {
        const diffTime = Math.abs(new Date(startDate) - new Date(endDate));
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setLeaveDays(diffDays);
    };

    const onChangeInput = (e) => {
        if (e.target.name === "leaveDays") {
            let leaveDay = parseInt(e.target.value);
            if (isNaN(leaveDay)) {
                leaveDay = 1;
            }
            if (leaveDay > 365) {
                leaveDay = 365;
            }

            let currentStartDate = new Date(startDate);
            currentStartDate.setDate(currentStartDate.getDate() + leaveDay);

            setEndDate(dateFormatter(currentStartDate));
            setLeaveDays(leaveDay);

        } else if (e.target.name === "startDate") {
            setStartDate(e.target.value);
        } else if (e.target.name === "endDate") {
            setEndDate(e.target.value);
        }
    };

    const create = () => {
        axios.post(API_PATHS.EMPLOYEE.CREATE_ANNUAL_REQUEST(), {
            employeeId: userId,
            startDate: startDate,
            endDate: endDate,
            day: leaveDays
        })
            .then(res => {
                const {data} = res;
                alert(data.message);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <RootContainer>
            <SideBar/>
            <Container>
                <PermissionsContainer>
                    <Form>
                        <Header>
                            <HeaderTitle>İzin Talebi</HeaderTitle>
                        </Header>
                        <Body>
                            <Row>
                                <InputBox>
                                    Başlangıç Tarihi
                                    <Input type="date" name={"startDate"} onChange={onChangeInput}
                                           placeholder="İzin başlangıç tarihi" value={startDate}/>
                                </InputBox>
                                <InputBox>
                                    Bitiş Tarihi
                                    <Input type="date" name={"endDate"} onChange={onChangeInput}
                                           placeholder="İzin bitiş tarihi" value={endDate}/>
                                </InputBox>
                            </Row>
                            <Row>
                                <InputBox>
                                    Gün
                                    <Input type="number" min="1" max="365" name="leaveDays"
                                           placeholder="Kullanılacak gün sayısı"
                                           onChange={onChangeInput} value={leaveDays}/>
                                </InputBox>
                            </Row>
                            <Row>
                                <SendButton onClick={create}>
                                    Gönder
                                </SendButton>
                            </Row>
                        </Body>
                    </Form>
                </PermissionsContainer>
            </Container>
        </RootContainer>
    );
};

const RootContainer = styled.div`
  display: flex;
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PermissionsContainer = styled.div`
  width: 100%;
  height: 75%;
  display: flex;
  justify-content: center;
`;

const Form = styled.div`
  border-radius: 10px;
  width: 50%;
  height: 100%;
  background-color: white;
  -webkit-box-shadow: 0px 0px 14px -1px rgba(0, 0, 0, 0.26);
  -moz-box-shadow: 0px 0px 14px -1px rgba(0, 0, 0, 0.26);
  box-shadow: 0px 0px 14px -1px rgba(0, 0, 0, 0.26);
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  height: 10%;
  display: flex;
  align-items: center;
  padding-left: 25px;
`;

const HeaderTitle = styled.h3``;

const Body = styled.div`
  width: 100%;
  height: 90%;
  padding: 25px;
  display: flex;
  flex-direction: column;
`;

const InputBox = styled.div`
  font-weight: bold;
  margin-top: 40px`;

const Input = styled.input`
  width: 100%;
  border-radius: 5px;
  border:1px solid gray;
  height: 45px;
  font-size: 17px;
  margin-top: 20px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 35px;
`;

const SendButton = styled.button`
  margin-top: 50px;
  width: 100%;
  height: 35px;
  cursor: pointer;
  background-color: #e5e5e5;
  border: none;
  color: black;
  border-radius: 5px;
  font-size: 15px;
`;



export default RequestLeave;