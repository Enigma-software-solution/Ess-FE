import styled from 'styled-components';

export const CarouselContainer = styled.div`
  width: 80%; /* Adjust the width as needed */
  margin: 0 auto;
`;

export const CarouselSlide = styled.div`
  transition: transform 0.3s; /* Adjust the transition duration as needed */
  transform: scale(0.9); /* Adjust the scale factor for surrounding cards */
  z-index: 0; /* Send surrounding cards to the back */
`;

export const CarouselCenterSlide = styled.div`
  transform: scale(1); /* Increase the size of the selected card */
  transition: transform 0.3s; /* Adjust the transition duration as needed */
  z-index: 1; /* Bring the selected card to the front */
`;
