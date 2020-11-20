import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/Models/IActivity";
import { v4 as uuid } from "uuid";


interface IProps {
  handleSetEditMode: (IsEdit: boolean) => void;
  selectedActivity: IActivity;
  createActivityHandler: (currentActivity: IActivity) => void;
  updateActivityHandler: (currentActivity: IActivity) => void;
  isSubmitting : boolean
}

const ActivityForm: React.FC<IProps> = (props) => {
  const IntialActivity = () => {
    if (props.selectedActivity) {
      return props.selectedActivity;
    }
    return {
      id: "",
      title: "",
      description: "",
      category: "",
      date: "",
      city: "",
      venue: "",
    };
  };
  const [currentActivity, setcurrentActivity] = useState<IActivity>(
    IntialActivity()
  );

  const onChangeEventHandler = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setcurrentActivity({
      ...currentActivity,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleFormSubmit = () => {
    if (currentActivity.id.trim().length === 0) {
      const getCurrentItem = { ...currentActivity };
      getCurrentItem.id = uuid();
      props.createActivityHandler(getCurrentItem);
    }
    else{
      props.updateActivityHandler(currentActivity);
    }
  };
 
  return (
    <Segment clearing>
      <Form onSubmit={handleFormSubmit}>
        <Form.Input
          placeholder={"Title"}
          name="title"
          value={currentActivity.title}
          onChange={onChangeEventHandler}
        ></Form.Input>
        <Form.TextArea
          rows={2}
          name="description"
          placeholder="Description"
          value={currentActivity.description}
          onChange={onChangeEventHandler}
        ></Form.TextArea>
        <Form.Input
          placeholder="Category"
          name="category"
          value={currentActivity.category}
          onChange={onChangeEventHandler}
        ></Form.Input>
        <Form.Input
          type="datetime-local"
          name="date"
          placeholder="Date"
          value={currentActivity.date}
          onChange={onChangeEventHandler}
        ></Form.Input>
        <Form.Input
          name="city"
          placeholder="City"
          value={currentActivity.city}
          onChange={onChangeEventHandler}
        ></Form.Input>
        <Form.Input
          name="venue"
          placeholder="Venue"
          value={currentActivity.venue}
          onChange={onChangeEventHandler}
        ></Form.Input>
        <Button
          floated="right"
          loading ={props.isSubmitting}
          positive
          type="submit"
          content="Submit"
        ></Button>
        <Button
          floated="right"
          onClick={() => props.handleSetEditMode(false)}
          type="button"
          content="Cancel"
        ></Button>
      </Form>
    </Segment>
  );
};

export default ActivityForm;
