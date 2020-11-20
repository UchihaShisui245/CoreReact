import React, { useState, useEffect, SyntheticEvent } from "react";
import { IActivity } from "./Models/IActivity";
import { Container } from "semantic-ui-react";
import NavigationBar from "../../Features/Navigation/NavigationBar";
import ActivityDashboard from "../../Features/activities/dashboard/ActivityDashboard";
import { axiosActivities } from "../API/agent";
import LoadingComponent from "./LoadingComponent";

const App: React.FC = () => {
  const [activities, setActivities] = useState<IActivity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<IActivity | null>(
    null
  );

  const [editMode, setEditMode] = useState<boolean>(false);

  const [isLoading, setLoading] = useState<boolean>(true);

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const [target, setTarget] = useState<string>("");

  useEffect(() => {
    axiosActivities
      .list()
      .then((res) => {
        const getActivities: IActivity[] = [];
        debugger;
        res.forEach((element) => {
          element.date = element.date.split(".")[0];
          getActivities.push(element);
        });
        setActivities([...getActivities]);
      })
      .then(() => setLoading(false))
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSetEditMode = (IsEdit: boolean) => {
    setEditMode(IsEdit);
  };

  const createActivityHandler = (currentActivity: IActivity) => {
    setSubmitting(true);
    axiosActivities
      .create(currentActivity)
      .then(() => {
        setActivities([...activities, { ...currentActivity }]);
        setSelectedActivity(currentActivity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const updateActivityHandler = (currentActivity: IActivity) => {
    setSubmitting(true);
    axiosActivities
      .update(currentActivity)
      .then(() => {
        setActivities([
          ...activities.filter((x) => x.id !== currentActivity.id),
          { ...currentActivity },
        ]);
        setSelectedActivity(currentActivity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };

  const handleCreateFormMode = () => {
    setEditMode(true);
    setSelectedActivity(null);
  };
  const handleSelectActivity = (id: string) => {
    setEditMode(false);
    setSelectedActivity(activities.filter((x) => x.id === id)[0]);
  };

  const handleDeleteActivity = (
    eve: SyntheticEvent<HTMLButtonElement>,
    id: string
  ) => {
    setSubmitting(true);
    setTarget(eve.currentTarget.name);
    axiosActivities
      .delete(id)
      .then(() => {
        setEditMode(false);
        setSelectedActivity(null);
        setActivities(activities.filter((x) => x.id !== id));
      })
      .then(() => setSubmitting(false));
  };

  if (isLoading)
    return (
      <LoadingComponent content="Loading Activities..."></LoadingComponent>
    );
  return (
    <React.Fragment>
      <NavigationBar
        handleCreateFormMode={handleCreateFormMode}
      ></NavigationBar>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          target={target}
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          isEditMode={editMode}
          setSelectedActivity={setSelectedActivity}
          handleSetEditMode={handleSetEditMode}
          createActivityHandler={createActivityHandler}
          updateActivityHandler={updateActivityHandler}
          handleDeleteActivity={handleDeleteActivity}
          isSubmitting={isSubmitting}
        ></ActivityDashboard>
      </Container>
    </React.Fragment>
  );
};

export default App;
