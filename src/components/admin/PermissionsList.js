import React, {Component} from 'react';
import SideBar from "../includes/SideBar";
import {API_PATHS, REQUEST_STATES} from "./../../app/userConfig";
import styled from "styled-components";
import {useEffect, useState} from "react";
import axios from "axios";


const PermissionsList = () => {

    const [allPermissions, setAllPermissions] = useState([]);
    const [selected, setSelected] = useState(0);
    const [selectedPermission, setSelectedPermission] = useState(0);
    const [filterType, setFilterType] = useState(3);

    useEffect(() => {
        getAllPermissions();
    }, []);

    const getAllPermissions = () => {
        axios.get(API_PATHS.ADMIN.GET_ANNUAL_PERMISSIONS())
            .then(res => {
                const {data} = res;
                setAllPermissions(data.data);
            })
            .catch(err => {
                alert("Bir hata meydana geldi.");
            });
    }

    const changeHandler = (e) => {
        if (e.target.name === "rootSelect") {
            setFilterType(parseInt(e.target.value));
        } else if (e.target.name === "detailSelect") {
            axios.put(API_PATHS.ADMIN.UPDATE_ANNUAL_PERMISSIONS(),
                {
                    id: selectedPermission.id,
                    startDate: selectedPermission.startDate,
                    endDate: selectedPermission.endDate,
                    day: selectedPermission.day,
                    employeeId: selectedPermission.employeeId,
                    state: parseInt(e.target.value),
                })
                .then(res => {
                    const {data} = res;
                    getAllPermissions();
                })
                .catch(err => {
                    alert("Bir hata meydana geldi.");
                })
        }

    };

    const showDetail = (employeeId) => {
        setSelectedPermission(allPermissions.filter(permission => (permission.id === employeeId))[0]);
        setSelected(1);
    };

    const permissionList = (
        <PermissionsUl>
            {
                allPermissions.map((request, index) => {
                    if (parseInt(filterType) === 3 || request.state === filterType) {
                        return (
                            <Li key={index} onClick={() => showDetail(request.id)}>
                                <CreatedDate>{request.startDate}</CreatedDate>
                                <PermissionDay>{request.day}</PermissionDay>
                                <LeaveDateRange>
                                    <StartDate>
                                        {request.startDate}
                                    </StartDate>
                                    <EndDate>
                                        {request.endDate}
                                    </EndDate>
                                </LeaveDateRange>
                                <LeaveState
                                    color={
                                        (request.state === 0) ? "#ffecb5" : (request.state === 1) ? "#badbcc" : "#f5c2c7"
                                    }
                                >
                                    <LeaveStateText>{REQUEST_STATES[request.state]}</LeaveStateText>
                                </LeaveState>
                            </Li>
                        )
                    }
                })
            }
            {(allPermissions.length === 0) ? "Daha önce hiç bir izin alınmamış" : ""}
        </PermissionsUl>
    );

    const permissionDetail = (
        <PermissionsUl>
            {
                <Li key={0} onClick={() => setSelected(1)}>
                    <CreatedDate>{selectedPermission.startDate}</CreatedDate>
                    <PermissionDay>{selectedPermission.day}</PermissionDay>
                    <LeaveDateRange>
                        <StartDate>
                            {selectedPermission.startDate}
                        </StartDate>
                        <EndDate>
                            {selectedPermission.endDate}
                        </EndDate>
                    </LeaveDateRange>
                    <Select name="detailSelect" value={selectedPermission.state} onChange={changeHandler}>
                        <option value="0">Onay Bekliyor</option>
                        <option value="1">Kabul Edildi</option>
                        <option value="2">Reddedildi</option>
                    </Select>
                </Li>
            }
            <BackButton onClick={() => setSelected(0)}> Geri git</BackButton>
        </PermissionsUl>
    );

    return (
        <RootContainer>
            <SideBar/>
            <Container>
                <PermissionsContainer>
                    <Form>
                        <Header>
                            <HeaderTitle>İzinler</HeaderTitle>
                        </Header>
                        <Body>
                            <Select onChange={changeHandler} name="rootSelect">
                                <option value="0">Onay Bekliyor</option>
                                <option value="1">Kabul Edildi</option>
                                <option value="2">Reddedildi</option>
                                <option value="3">Hepsi</option>
                            </Select>
                            <PermissionTitle>
                                <CreatedTitle>
                                    İzin Tarihi
                                </CreatedTitle>
                                <PermissionDay>
                                    İzin Gün
                                </PermissionDay>
                                <DateRange>
                                    İzin Aralığı
                                </DateRange>
                                <PermissionState>
                                    İzin Durumu
                                </PermissionState>
                            </PermissionTitle>
                            {
                                (selected === 0) ? permissionList : permissionDetail
                            }
                        </Body>
                    </Form>
                </PermissionsContainer>
            </Container>
        </RootContainer>
    );
};


const RootContainer = styled.div`
  display: flex;
  width: 100%;
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
  min-width: 1500px;
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
  background-color: ${props => props.color};
  text-align: center;
  border-radius: 3px;
  font-weight: bold;
  padding: 5px;
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
  display: flex;
  flex-direction: column;
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

const EmployeeName = styled.div`
  width: 100%;
`;

const PermissionDay = styled.div`
  width: 100%
`;

const StartDate = styled.div`
  width: 100%;
`
const EndDate = styled.div`
  width: 100%;
`;

const BackButton = styled.button`
  display: block;
  width: 100px;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  background: teal;
`;

const Select = styled.select`
  width: 200px;
  padding: 5px;
  margin-left: 10px;
`;

export default PermissionsList;


/*

<LeaveState
                        color={
                            (selectedPermission.state === 0) ? "#ffecb5" : (selectedPermission.state === 1) ? "#badbcc" : "#f5c2c7"
                        }
                    >
                        <LeaveStateText>{REQUEST_STATES[selectedPermission.state]}</LeaveStateText>
                    </LeaveState>

 */