import React from "react";
import { Wrapper } from "./styled";
import { CheckCircleTwoTone } from "@ant-design/icons";
import confirmationimage from "src/assets/confirmimage.jpg";
import { Button } from "antd";
import { routes } from "src/constant/routes";
import { useNavigate } from "react-router-dom";

const AfterConfirmationEmail = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate(routes?.LOGIN);
  };

  return (
    <Wrapper>
      <img src={confirmationimage} alt="confirmation_Image" draggable={false} />
      <h3>
        {" "}
        Email Confirmed{" "}
        <CheckCircleTwoTone
          style={{ padding: "10px" }}
          twoToneColor="#5AE4A8"
        />
      </h3>
      <p>
        Your email has been confirmed. You can now login to the application.
      </p>
      <Button onClick={handleLogin} type="primary">
        Login
      </Button>
    </Wrapper>
  );
};

export default AfterConfirmationEmail;
