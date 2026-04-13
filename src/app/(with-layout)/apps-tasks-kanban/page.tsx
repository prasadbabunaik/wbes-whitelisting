import React from "react";

import { Container } from "reactstrap";
import BreadCrumb from "@components/Common/BreadCrumb";
import TasksKanban from "@components/KanbanBoard/MainPage";

const Kanbanboard = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Kanban Board" pageTitle="Tasks" />
          <TasksKanban />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Kanbanboard;
