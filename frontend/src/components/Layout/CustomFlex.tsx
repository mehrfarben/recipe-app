import { Flex, FlexProps } from "@mantine/core";
import styled from "styled-components";

interface CustomFlexProps extends FlexProps {
  overflow?: string;
}

const StyledFlex = styled(Flex)<CustomFlexProps>`
  overflow: ${(props) => props.overflow };
`;

const CustomFlex = ({ children, overflow, ...props }: CustomFlexProps) => {
  return (
    <StyledFlex overflow={overflow} {...props}>
      {children}
    </StyledFlex>
  );
};

export default CustomFlex;
