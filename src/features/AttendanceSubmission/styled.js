import { Card, Carousel } from "antd";
import styled from "styled-components";

export const InnerCard = styled(Card)`
  margin: 30px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: "hidden";
  &:hover {
   cursor: 'pointer';
    box-shadow: 4px 2px 20px -7px  rgba(0,0,0,0.2);
  }
`;

export const ImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px 10px 50px 10px;
`;

export const SearchWrapper = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CardWrapper = styled.div`
  margin-bottom: 40px;
`;
export const CardImage = styled.img`
height: 100px;
width: 100px;
border-radius: 50%;
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export const StyledCarousel = styled(Carousel)`
> .slick-dots li button {
  background: #468b9f;
}
> .slick-dots li.slick-active button {
  background: #468b9f;
}


`
