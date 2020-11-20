import React from "react";
import { Button, Card, Image } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/Models/IActivity";

interface IProps {
  activity: IActivity;
  handleSetEditMode: (IsEdit: boolean) => void;
  setSelectedActivity:(seleActivity : IActivity | null) => void
}

const ActivityDetails: React.FC<IProps> = (props) => (
  <Card>
    <Image
      src={`/assets/categoryImages/${props.activity.category}.jpg`}
      wrapped
      ui={false}
    />
    <Card.Content>
      <Card.Header>{props.activity.title}</Card.Header>
      <Card.Meta>
        <span className="date">{props.activity.date}</span>
      </Card.Meta>
      <Card.Description>{props.activity.description}</Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Button.Group widths={2}>
        <Button
          color="blue"
          onClick={() => props.handleSetEditMode(true)}
          content="Edit"
        ></Button>
        <Button
          color="grey"
          onClick={() => props.setSelectedActivity(null)}
          content="Cancel"
        ></Button>
      </Button.Group>
    </Card.Content>
  </Card>
);

export default ActivityDetails;
