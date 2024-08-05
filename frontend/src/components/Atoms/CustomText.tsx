import { Text, TextProps } from "@mantine/core";
import styled from "styled-components";

interface CustomTextProps extends TextProps, React.PropsWithChildren<{}> {
  textOverflow?: string;
}

const StyledText = styled(Text)<CustomTextProps>`
  text-overflow: ${(props) => props.textOverflow || 'ellipsis'};
  white-space: initial;
  overflow: hidden;
  word-wrap: break-word;
  overflow-wrap: break-word;
`;

const CustomText = ({ children, textOverflow, ...props }: CustomTextProps) => {
  return (
    <StyledText textOverflow={textOverflow} {...props}>
      {children}
    </StyledText>
  );
};

export default CustomText;
