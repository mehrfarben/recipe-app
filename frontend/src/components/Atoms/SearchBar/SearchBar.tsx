import { Flex, TextInput, ActionIcon, TextInputProps } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SearchBar.module.css";

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
    <Flex justify='center' align='center' mb={10}>
      <TextInput
        w={{base: '70%', md:'50%'}}
        className={classes.searchBar}
        placeholder="Search for a recipe"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown} 
        {...props}
      />
      <ActionIcon 
        className={classes.searchIcon} 
        color="#ee0000"
        h={{base:'40px', xs:'50px'}} 
        w={{base:'40px', xs:'50px'}}  
        onClick={handleSearch}
      >
        <IconSearch stroke={3} />
      </ActionIcon>
    </Flex>
  );
};

export default SearchBar;
