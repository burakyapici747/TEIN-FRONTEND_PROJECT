import React, {Component} from "react";
import styled from "styled-components";
import StyledModal, {WarningAlert, DangerAlert} from "./Alert.styles";


const Alert = (props) => {
    if (props.type === 1) {
        return (
            <DangerAlert>
                {props.message}
            </DangerAlert>
        );
    }
    return (
        <WarningAlert>
            {props.message}
        </WarningAlert>
    );
};


export default Alert;