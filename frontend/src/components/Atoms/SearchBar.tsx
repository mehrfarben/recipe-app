import { Flex, TextInput, ActionIcon } from "@mantine/core"
import { IconSearch } from "@tabler/icons-react"

const SearchBar = () => {
  return (
    <Flex h='100%' justify='center' align='center'>
    <TextInput
    className="search-bar"
    color='#f5f5f5'
    size="xl"
    w='50%'
      placeholder="Search for a recipe"
    />
    <ActionIcon className="search-icon" color="#ee0000" h={60} w={60}>
      <IconSearch stroke={3} />
    </ActionIcon>
    </Flex>
  )
}

export default SearchBar