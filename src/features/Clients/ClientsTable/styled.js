import styled from "styled-components";

const getBackgroundColor = (status) => {
    switch (status) {
        case "active":
            return "green";
        case "pending":
            return "#fcba03";
        case "inactive":
            return "red";
        default:
            return "grey"; 
    }
};

export const StyledBadge = styled.span`
  background-color: ${(props) => getBackgroundColor(props.status)};
  color: white;
  padding: 2px 6px;
  border-radius: 4px;
  cursor: pointer;
`;
