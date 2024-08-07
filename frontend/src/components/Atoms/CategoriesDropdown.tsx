import { useState } from 'react';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';

const category = ['Breakfast', 'Main Course', 'Snack', 'Dessert', 'Salad', 'Vegan', 'Soup'];

interface CategoriesDropdownProps {
  onCategorySelect: (category: string) => void;
}

function CategoriesDropdown({ onCategorySelect }: CategoriesDropdownProps) {
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = category.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

  return (
    <Combobox
      store={combobox}
      onOptionSubmit={(val) => {
        setValue(val);
        onCategorySelect(val);
        combobox.closeDropdown();
      }}
    >
      <Combobox.Target>
        <InputBase
          component="button"
          type="button"
          pointer
          rightSection={<Combobox.Chevron />}
          rightSectionPointerEvents="none"
          onClick={() => combobox.toggleDropdown()}
        >
          {value || <Input.Placeholder>Pick a category</Input.Placeholder>}
        </InputBase>
      </Combobox.Target>

      <Combobox.Dropdown>
        <Combobox.Options>{options}</Combobox.Options>
      </Combobox.Dropdown>
    </Combobox>
  );
}

export default CategoriesDropdown;
