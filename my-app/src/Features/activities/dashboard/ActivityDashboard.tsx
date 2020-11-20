import React, { SyntheticEvent } from "react";
import { Grid, GridColumn } from "semantic-ui-react";
import { IActivity } from "../../../app/layout/Models/IActivity";
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";


interface IProps {
  activities: IActivity[];
  selectActivity: (id: string) => void;
  selectedActivity: IActivity | null;
  isEditMode: boolean;
  handleSetEditMode: (IsEdit: boolean) => void;
  setSelectedActivity: (seleActivity: IActivity | null) => void;
  createActivityHandler: (currentActivity: IActivity) => void;
  updateActivityHandler: (currentActivity: IActivity) => void;
  handleDeleteActivity: (
    eve: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => void;
  target: string;
  isSubmitting : boolean,
  
}
const ActivityDashboard: React.FC<IProps> = (props) => {
  return (
    <div>
      <Grid>
        <GridColumn width={10}>
          <ActivityList
            activities={props.activities}
            target ={props.target}
            selectActivity={props.selectActivity}
            handleDeleteActivity = {props.handleDeleteActivity}
            isSubmitting ={props.isSubmitting}
          ></ActivityList>
        </GridColumn>
        <GridColumn width={6}>
          {props.selectedActivity && !props.isEditMode && (
            <ActivityDetails
              activity={props.selectedActivity}
              handleSetEditMode={props.handleSetEditMode}
              setSelectedActivity={props.setSelectedActivity}
            ></ActivityDetails>
          )}
          {props.isEditMode && (
            <ActivityForm
            key = {(props.selectedActivity && props.selectedActivity?.id) || 0}
              handleSetEditMode={props.handleSetEditMode}
              selectedActivity={props.selectedActivity!}
              createActivityHandler={props.createActivityHandler}
              updateActivityHandler={props.updateActivityHandler}
              isSubmitting ={props.isSubmitting}
            ></ActivityForm>
          )}
        </GridColumn>
      </Grid>
    </div>
  );
};

export default ActivityDashboard;
