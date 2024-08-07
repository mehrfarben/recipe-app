import { useMantineColorScheme, Tooltip, Switch } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";

const DarkModeButton = () => {

    const { colorScheme, toggleColorScheme } = useMantineColorScheme();

    const sunIcon = (
        <IconSun
          stroke={2.5}
        />
      );
    
      const moonIcon = (
        <IconMoon
          stroke={2}
        />
      );

  return (
    <Tooltip closeDelay={200} label="Toggle color scheme">
            <Switch color="#ffba09" size="xl" checked={colorScheme === 'light'} onChange={() => toggleColorScheme()} onLabel={sunIcon} offLabel={moonIcon} />
    </Tooltip>
  )
}

export default DarkModeButton