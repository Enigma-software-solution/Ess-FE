import { Card, Carousel } from "antd";
import styled from "styled-components";


export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const SearchWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledCarousel = styled(Carousel)`
> .slick-dots li button {
  background: #468b9f;
}
> .slick-dots li.slick-active button {
  background: #468b9f;
}
`
