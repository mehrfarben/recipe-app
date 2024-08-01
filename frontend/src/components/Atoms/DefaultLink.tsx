import { Link, LinkProps } from 'react-router-dom';
import styled from 'styled-components';

interface CustomLinkProps extends LinkProps, React.PropsWithChildren<{}> {
  textOverflow?: string;
}

const StyledLink = styled(Link)<CustomLinkProps>`
  color: #000;
  text-decoration: none;
`;

const DefaultLink = ({ to, children, onClick }: CustomLinkProps) => {
  return (
    <StyledLink to={to} onClick={onClick}>
      {children}
    </StyledLink>
  );
};

export default DefaultLink;
