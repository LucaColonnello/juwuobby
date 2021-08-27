import { Menu, message, notification } from "antd";

import type { ReactElement } from "react";

export interface Command<Data> {
  label: string;
  run: (data: Data) => Promise<boolean | void>;
  successText: string;
  errorText?: string;
};
export type Commands<Data> = Record<string, Command<Data>>;

export interface UseContextMenuOptions<Data> {
  commands: Commands<Data>;
  theme?: "light" | "dark";
};

export default function useContextMenu<Data>({
  commands,
  theme = "dark"
}: UseContextMenuOptions<Data>) {
  const onContextMenuClick = (data, command) => {
    const { run, successText, errorText } = commands[command];
    run(data)
      .then((dontNotifySuccess) => {
        if (dontNotifySuccess === false) {
          return;
        }

        message.success(successText);
      })
      .catch((error) => {
        console.error(error);
        notification.error({
          key: `${command}_command_error`,
          message: "Oh snap!",
          description: errorText ||
            "There was an error. Please contact the monkey developer 🐒 .",
          duration: 5
        });
      });
  };
  
  return (data: Data): ReactElement<Menu> => (
    <Menu
      theme={theme}
      onClick={({ key }) => onContextMenuClick(data, key)}
      selectable={false}
    >
      {Object.keys(commands).map((command) => (
        <Menu.Item key={command}>{commands[command].label}</Menu.Item>
      ))}
    </Menu>
  );
}
