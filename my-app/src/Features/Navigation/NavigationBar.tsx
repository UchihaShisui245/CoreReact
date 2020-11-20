import React from "react";
import { Menu, Container, Button } from "semantic-ui-react";

interface IProps {
  handleCreateFormMode: () => void;
}

const NavigationBar: React.FC<IProps> = (props) => {
  // const [menuItems, setMenuItems] = useState({ activeItem: "home" });
  return (
    <Menu fixed="top" inverted>
      <Container>
        <Menu.Item header>
          <img
            src="/assets/logo.png"
            alt="logo"
            style={{ marginRight: "10px" }}
          ></img>
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            positive
            onClick={() => props.handleCreateFormMode()}
            content="Create Activity"
          ></Button>
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default NavigationBar;
