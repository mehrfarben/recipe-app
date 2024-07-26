import { Flex, Text } from "@mantine/core"
import RecipeCard from "../components/RecipeCard"

const Recipes = () => {

  
  return (
    <>
      <Text size="xl" fw={600} ml="xl" >Newest Recipes</Text>
    <Flex maw={"100vw"} mih={"100vh"} dir="row" align="start">
      <RecipeCard/>
    </Flex>
    </>
  )
}

export default Recipes