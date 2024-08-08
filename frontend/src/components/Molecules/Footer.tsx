import { Container, Text, Image } from '@mantine/core';
import Logo from "../../assets/logotexticon.svg"
import LogoWhite from "../../assets/logotexticonwhite.svg";


export function Footer() {

  return (
    <div className='footer'>
      <Container className='inner'>
      <Image darkHidden w={100} src={Logo} alt="logo" />
      <Image lightHidden w={100} src={LogoWhite} alt="logo" />
      <Text size='sm'>All Rights Reserved.</Text>
      </Container>
    </div>
  );
}