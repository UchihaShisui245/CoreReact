import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

import { Header, Icon , List} from "semantic-ui-react";

class App extends Component {
  state = {
    values: [],
  };

  componentDidMount() {
    debugger;
    axios
      .get("http://localhost:5000/api/Values")
      .then((res) => {
        this.setState({
          values: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    // this.setState({
    //   values: [
    //     { id: 1, name: "Value Id1" },
    //     { id: 2, name: "Value Id2" },
    //   ],
    // });
  }

  render() {
    return (
      <div>
        {/* <header className="App-header"> */}
          <Header as="h2">
            <Icon name="plug" />
            <Header.Content>Reactivities</Header.Content>
          </Header>

          <List>
            {this.state.values.map((item: any) => (
              <List.Item key={item.id}>{item.name}</List.Item>
            ))}
          </List>
          <ul></ul>
        {/* </header> */}
      </div>
    );
  }
}

export default App;
