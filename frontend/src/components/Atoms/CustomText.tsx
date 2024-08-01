import { Text, TextProps } from "@mantine/core";
import styled from "styled-components";
import React from "react";

interface CustomTextProps extends TextProps, React.PropsWithChildren<{}> {
  textOverflow?: string;
}

const StyledText = styled(Text)<CustomTextProps>`
  text-overflow: ${(props) => props.textOverflow || 'ellipsis'};
  white-space: nowrap;
  overflow: hidden;
`;

const CustomText = ({ children, textOverflow, ...props }: CustomTextProps) => {
  return (
    <StyledText textOverflow={textOverflow} {...props}>
      {children}
    </StyledText>
  );
};

export default CustomText;
