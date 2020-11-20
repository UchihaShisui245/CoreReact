import React, { SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/Models/IActivity";

interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  handleDeleteActivity: (
    eve: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  target: string;
  isSubmitting: boolean;
  
}

const ActivityList: React.FC<IProps> = (props) => (
  <Segment clearing>
    <Item.Group divided>
      {props.activities.map((activity) => (
        <Item key={activity.id}>
          <Item.Content>
            <Item.Header as="a">{activity.title}</Item.Header>
            <Item.Meta>{activity.date}</Item.Meta>
            <Item.Description>
              <div>{activity.description}</div>
              <div>
                {activity.city}, {activity.venue}
              </div>
            </Item.Description>
            <Item.Extra>
              <Button
                floated="right"
                content="View"
                color="blue"
                onClick={() => props.selectActivity(activity.id)}
              ></Button>
              <Button
                floated="right"
                name={activity.id}
                loading={props.target === activity.id && props.isSubmitting}
                content="Delete"
                color="red"
                onClick={(eve) => props.handleDeleteActivity(eve, activity.id)}
              ></Button>
              <Label basic content={activity.category}></Label>
            </Item.Extra>
          </Item.Content>
        </Item>
      ))}
    </Item.Group>
  </Segment>
);

export default ActivityList;
