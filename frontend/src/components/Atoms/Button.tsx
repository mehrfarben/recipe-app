import styled from "styled-components"

const StyledLoginButton = styled.button`
    background-color: #ff3131;
    color: white;
    padding: 5px 60px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: 600;
    border: none;
    &:hover {
        background-color: #E00000;
    }
        &:active {
        
            transform: scale(98%);
        }
`;

const Button = ({ children }) => {
  return (
    <StyledLoginButton>
      {children}
    </StyledLoginButton>
  );
}

export default Button;
