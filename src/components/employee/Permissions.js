import React, {Component, useEffect, useState} from "react";
import styled from "styled-components";
import SideBar from '../includes/SideBar';
import axios from "axios";
import {API_PATHS, REQUEST_STATES} from "../../app/userConfig";
import {useSelector} from "react-redux";

const Permissions = (props) => {

    const {userId} = useSelector(state => state.userReducer);
    const [annualRequests, setAnnualRequests] = useState([]);
    const [filterType, setFilterType] = useState(3);

    useEffect(() => {
        axios.get(API_PATHS.EMPLOYEE.GET_ANNUAL_REQUESTS(userId))
            .then(res => {
                const {data} = res;
                setAnnualRequests(data.data);
            })
            .catch(err => {
                alert("Bir hata meydana geldi.");
            })
    },[]);

    const changeHandler = (e) =>{
        setFilterType(e.target.value);
    };

    return (
        <RootContainer>
            <SideBar/>
            <Container>
                <PermissionsContainer>
                    <Form>
                        <Header>
                            <HeaderTitle>İzinlerim</HeaderTitle>
                        </Header>
                        <Body>
                            <Select onChange={changeHandler}>
                                <option value="0">Onay Bekliyor</option>
                                <option value="1">Kabul Edildi</option>
                                <option value="2">Reddedildi</option>
                                <option value="3">Hepsi</option>
                            </Select>
                            <PermissionTitle>
                                <CreatedTitle>
                                    İzin Tarihi
                                </CreatedTitle>
                                <DateRange>
                                    İzin Aralığı
                                </DateRange>
                                <PermissionState>
                                    İzin Durumu
                                </PermissionState>
                            </PermissionTitle>
                            <PermissionsUl>
                                {
                                    annualRequests.map((request, index) => {
                                        if(request.state === parseInt(filterType) || parseInt(filterType)  === 3){
                                            return (
                                                <Li key={index}>
                                                    <CreatedDate>{request.startDate}</CreatedDate>
                                                    <LeaveDateRange>{request.startDate} - {request.endDate}</LeaveDateRange>
                                                    <LeaveState
                                                        color={
                                                            (request.state === 0) ? "#ffecb5" : (request.state === 1) ? "#badbcc" : "#f5c2c7"
                                                        }
                                                    >
                                                        {REQUEST_STATES[request.state]}
                                                    </LeaveState>
                                                </Li>
                                            );
                                        }
                                    })
                                }
                                {(annualRequests.length === 0) ? "Daha önce hiç bir izin alınmamış" : ""}
                            </PermissionsUl>
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

const PermissionsUl = styled.ul`
  display: flex;
  flex-direction: column;
  overflow: auto;
`;

const Li = styled.li`
  width: 100%;
  color: black;
  font-size: 13px;
  min-height: 50px;
  border-bottom: 1px dotted black;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  cursor: pointer;

  :hover {
    opacity: .5;
  }
`;

const LeaveState = styled.div`
  width: 100%;
  flex-grow: 1;
  color: black;
  text-align: center;
  border-radius: 3px;
  font-weight: bold;
  padding: 5px;
  background-color: ${props => props.color};
`;

const LeaveStateText = styled.span`
  color: black;
  font-size: 12px;
`;

const LeaveDateRange = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-grow: 1;
`;

const CreatedDate = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  flex-grow: 1;
`;

const PermissionTitle = styled.div`
  display: flex;
  padding: 10px;
  color: black;
  font-weight: bold;
`;
const CreatedTitle = styled.div`
  width: 100%;
`;
const DateRange = styled.div`
  width: 100%;
`;
const PermissionState = styled.div`
  width: 100%;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
  margin-bottom: 20px;
  margin-left: 10px;
`;

export default Permissions;