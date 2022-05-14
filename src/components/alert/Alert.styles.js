import styled from "styled-components";

const Alert = styled.div`
  width: 100%;
  padding: 15px;
  border-radius: 7px;
  margin-top: 20px;
`;

export const DangerAlert = styled(Alert)`
  background-color: #f8d7da;
  color: #842029;
  border-color: #f5c2c7;
`;

export const WarningAlert = styled(Alert)`
  background-color: #fff3cd;
  color: #664d03;
  border-color: #ffecb5;
`;