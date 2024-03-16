import React, { useState } from "react";
import "./css/Home.css";
import PopupComponent from "./PopupComponent";
import {
  Segment,
  Sidebar,
  SidebarPushable,
  SidebarPusher,
  Menu,
  Icon,
} from "semantic-ui-react";

const Home = () => {
  const [popup, setPopup] = useState(false);

  return (
    <>
      <SidebarPushable as={Segment} className="sidebarBg">
        <Sidebar
          className="sidebarPushable"
          as={Menu}
          animation="overlay"
          icon="labeled"
          direction="right"
          onHide={() => setPopup(false)}
          vertical
          visible={popup}
          width="thin"
        >
          <PopupComponent setPopup={setPopup} />
        </Sidebar>

        <SidebarPusher dimmed={popup}>
          <Segment basic className="sidebarPusher">
            <div className="header">
              <Icon name="angle left" />
              View Audience
            </div>
            <button onClick={() => setPopup(true)}>Save Segment</button>
          </Segment>
        </SidebarPusher>
      </SidebarPushable>
    </>
  );
};

export default Home;
