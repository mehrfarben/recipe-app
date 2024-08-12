import { Textarea, TextareaProps } from "@mantine/core"
import classes from "./CustomTextArea.module.css"

const CustomTextArea = ({ children, ...props }: TextareaProps) => {
  return (
    <Textarea
    className={classes.label}
    autosize
    mt={30}
    required
    {...props}>
      {children}
    </Textarea>
  )
}

export default CustomTextArea