import styled from "styled-components"
import { Button, ButtonProps } from "@mantine/core";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const StyledCustomButton = styled(Button)<CustomButtonProps>`
    background-color: #ff3131;
    color: white;
    width: 100%;
    &:hover {
        background-color: #E00000;
    }
        &:active {
        
            transform: scale(99%);
        }
`;

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <StyledCustomButton {...props}>
      {children}
    </StyledCustomButton>
  );
}

export default CustomButton;
