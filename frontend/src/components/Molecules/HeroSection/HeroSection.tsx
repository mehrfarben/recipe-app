import { Flex, Card, BackgroundImage, Overlay } from "@mantine/core";
import SearchBar from "../../Atoms/SearchBar/SearchBar";
import classes from './HeroSection.module.css'
import HeroImage from "../../../assets/herosection.png";

const HeroSection = () => {
  return (
    <Flex px={20} mt={20} mb={50} justify="center">
      <Card p={0} shadow="xl" withBorder radius="lg" w={{base:"100%", lg:"80%"}} h={{base:'30vh', lg:"60vh"}}>
      <BackgroundImage src={HeroImage} w="100%" h="100%" radius="lg"> 
      <Overlay hiddenFrom="lg" zIndex={0} color="#000" backgroundOpacity={0.1} />
      <Overlay lightHidden zIndex={0} color="#000" backgroundOpacity={0.2} />
          <Flex gap={0} h={{base: '70%',lg:'85%'}} ml={{base: 0, lg:40}} justify='center' align={{base:'center', lg:'flex-start'}} direction='column'>
            <p className={classes.title}>Taste the World</p>
            <p className={classes.subtitle}>from the comfort of your home</p> 
          </Flex>

          <SearchBar/>

    </BackgroundImage>
      </Card>
    </Flex>
  );
};

export default HeroSection;
