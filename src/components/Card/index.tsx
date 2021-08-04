import styled from "styled-components";
import tw from "twin.macro";

export const Card = styled.div`
  ${tw`
      flex
      flex-col
      shadow-lg
      justify-center
      p-10
      pt-6
      rounded
      border-solid
      border-gray-500
      bg-gray-100
      w-80
      mr-10
      ml-10
      items-stretch
    `}
`;
