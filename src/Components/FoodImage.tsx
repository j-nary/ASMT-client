import React from 'react';
import AltSrc from "../Assets/Img/alt_img.png";
import styled from 'styled-components';

interface ImageComponentProps {
  imageUrl: string | null;
}

const FoodImg = styled.img`
  float: left;
  height:90px;
  width:90px;
  margin-right: 10px;

  @media screen and (max-width: 768px) {
    height: 70px;
    width: 70px;
  }
`;

const ImageComponent: React.FC<ImageComponentProps> = ({ imageUrl }) => {
  const defaultImage = AltSrc;

  // 이미지 URL이 null 또는 빈 값인 경우
  if (imageUrl == "null" || imageUrl == null) {
    return <FoodImg loading='lazy' src={defaultImage} alt="Default" />;
  }

  // 이미지 URL이 존재하는 경우
  return <FoodImg loading='lazy' src={imageUrl} alt="Dynamic" />;
};

export default ImageComponent;