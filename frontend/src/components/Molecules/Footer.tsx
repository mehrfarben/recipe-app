import { Container, Text, Image, Box } from '@mantine/core';
import Logo from "../../assets/logotexticon.svg"
import LogoWhite from "../../assets/logotexticonwhite.svg";


export function Footer() {

  return (
    <>
    <Box className='footer'>
      <Container className='inner'>
      <Image darkHidden w={100} src={Logo} alt="logo" />
      <Image lightHidden w={100} src={LogoWhite} alt="logo" />
      <Text c='black' darkHidden size='sm'>All Rights Reserved.</Text>
      <Text c='white' lightHidden size='sm'>All Rights Reserved.</Text>
      </Container>
    </Box>
    </>
  );
}