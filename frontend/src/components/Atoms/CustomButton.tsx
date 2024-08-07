import styled from "styled-components"
import { Button, ButtonProps } from "@mantine/core";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const StyledCustomButton = styled(Button)<CustomButtonProps>`
    width: 100%;
        &:active {
        
            transform: scale(99%);
        }
`;

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <StyledCustomButton bg='primary' {...props}>
      {children}
    </StyledCustomButton>
  );
}

export default CustomButton;
