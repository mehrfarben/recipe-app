import { Button, ButtonProps } from "@mantine/core";
import classes from "./CustomButton.module.css";

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset" | undefined;
}

const CustomButton = ({ children, ...props }: CustomButtonProps) => {
  return (
    <Button className={classes.customButton} color='#ff3131' {...props}>
      {children}
    </Button>
  );
}

export default CustomButton;
