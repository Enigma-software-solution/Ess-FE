import React from "react";
import { StyledCard } from "./styled";

const ApplyCard = ({ data }) => {
  const avatarInitial = data?.profileName?.charAt(0);

  return (
    <>
      <StyledCard>
        <div className="user_avatar">
          <p>{avatarInitial}</p>
        </div>
        <div className="user_info">
          <span>{data?.profileName}</span>
          <p>
            <strong>No of Applies: </strong>
            {data?.count}
          </p>
        </div>
      </StyledCard>
    </>
  );
};

export default ApplyCard;
