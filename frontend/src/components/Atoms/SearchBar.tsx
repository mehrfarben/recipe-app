import { Flex, TextInput, ActionIcon, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface SearchBarProps extends TextInputProps {}

const SearchBar = (props: SearchBarProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      navigate(`/search?query=${searchTerm}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Flex h='100%' justify='center' align='center'>
      <TextInput
        className="search-bar"
        color='#f5f5f5'
        size="xl"
        w='50%'
        placeholder="Search for a recipe"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} 
        {...props}
      />
      <ActionIcon 
        className="search-icon" 
        color="#ee0000" 
        h={60} 
        w={60} 
        onClick={handleSearch}
      >
        <IconSearch stroke={3} />
      </ActionIcon>
    </Flex>
  );
};

export default SearchBar;
