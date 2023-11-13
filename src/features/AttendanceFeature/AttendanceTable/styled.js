import styled from 'styled-components';

export const Badge = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
`;

export const PresentBadge = styled(Badge)`
  background-color: #8FED7E; /* Green */
`;

export const AbsentBadge = styled(Badge)`
  background-color: #FF5454; /* Red */
`;

export const LateBadge = styled(Badge)`
  background-color: #FFE400; /* Yellow */
`;
