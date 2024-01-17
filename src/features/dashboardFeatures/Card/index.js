import React from "react";
import { StyledCard } from "./styled";
import UserDropdown from "src/components/CustomDropdown";
import { capitalize } from "lodash";
const ApplyCard = ({ data }) => {
  const avatarInitial = data?.profileName?.charAt(0);

  return (
    <>
      <StyledCard>
        <div className="user_avatar">
          <p>{avatarInitial}</p>
        </div>
        <div className="user_info">
          <span>{capitalize(data?.profileName)}</span>
          <p>
            <strong>Today Applies: </strong>
            {data?.count}
          </p>
        </div>

      </StyledCard>
    </>
  );
};

export default ApplyCard;
