import React, { useState } from "react";
import "./css/Popup.css";
import {
  Button,
  Dropdown,
  Icon,
  Input,
  Label,
  Segment,
  TransitionablePortal,
} from "semantic-ui-react";
import axios from "axios";

const PopupComponent = ({ setPopup }) => {
  const options = [
    {
      key: "First Name",
      text: "First Name",
      value: "first_name",
    },
    {
      key: "Last Name",
      text: "Last Name",
      value: "last_name",
    },
    {
      key: "Age",
      text: "Age",
      value: "age",
    },
    {
      key: "Account Name",
      text: "Account Name",
      value: "account_name",
    },
    {
      key: "City",
      text: "City",
      value: "city",
    },
    {
      key: "State",
      text: "State",
      value: "state",
    },
  ];

  const [schemaList, setSchemaList] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [message, setmesaage] = useState("");
  const [segName, setSegName] = useState("");
  const [dropDownOpt, setDropDownOpt] = useState(options);
  const [open, setOpen] = useState(false);

  const handleAddNewSchema = () => {
    if (selectedOption) {
      setSchemaList((current) => [...current, selectedOption]);
      setDropDownOpt(
        dropDownOpt.filter((ele) => ele.value !== selectedOption.value)
      );
      setSelectedOption(null);
    }
  };

  const handleChange = (e, { value }) => {
    setSelectedOption(options.find((ele) => ele.value === value));
  };

  const handleUnSelectSchema = (text) => {
    setSelectedOption(null);
    setSchemaList(schemaList.filter((ele) => ele.text !== text));
    const addOption = options.filter((ele) => ele.text === text);
    setDropDownOpt((current) => [...current, ...addOption]);
  };

  const handleSubmit = async () => {
    const url = "https://webhook.site/a8bb4a82-48c4-4063-9d09-2698ff4a7dc4";
    const schema = schemaList.map((ele) => ({ [ele.value]: ele.text }));
    const obj = {
      segment_name: segName,
      schema: schema,
    };
    try {
      if (schema.length !== 0 && segName !== "") {
        await axios.post(url, obj);
        setSchemaList([]);
        setSegName("");
        setSelectedOption(null);
        setDropDownOpt(options);
        setmesaage("Segment saved successfully");
      } else {
        setmesaage("Please fill the fields to save the segment");
      }
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <>
      <div className="header">
        <Icon name="angle left" />
        Saving Segment
      </div>

      <div className="formFields">
        <p>Enter the Name of the Segment</p>
        <Input
          className="inputField"
          placeholder="Name of the segment"
          onChange={(e) => setSegName(e.target.value)}
          value={segName}
        />
        <p>
          To save your segment, you need to add the schemas to build the query
        </p>

        <div className="labelDiv">
          <Label circular color={"green"} empty key={"green"} />{" "}
          <span>- User Traits</span>
          <Label circular color={"red"} empty key={"red"} />{" "}
          <span>- Group Traits</span>
        </div>

        {schemaList.length > 0 ? (
          <div className="borderBox">
            {schemaList.map((schema, index) => {
              const bool =
                schema.value === "first_name" ||
                schema.value === "last_name" ||
                schema.value === "age";
              return (
                <div className="dropDownWrapper">
                  <Label
                    className="label"
                    circular
                    empty
                    color={bool ? "green" : "red"}
                  />
                  <Dropdown
                    text={schema.text}
                    pointing="left"
                    selection
                    className="schemaDropdown"
                    icon="angle down"
                  />
                  <div className="iconWrapper">
                    <Icon
                      name="window minimize outline"
                      corner="top left"
                      className="minusIcon"
                      onClick={() => handleUnSelectSchema(schema.text)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}

        <div className="dropDownWrapper">
          <Label circular empty />
          <Dropdown
            placeholder="Add schema to segment"
            fluid
            options={dropDownOpt}
            selection
            className="schemaDropdown"
            icon="angle down"
            onChange={handleChange}
            value={selectedOption ? selectedOption.value : ""}
          />
          <div className="iconWrapper">
            <Icon
              name="window minimize outline"
              corner="top left"
              className="minusIcon"
            />
          </div>
        </div>

        <a onClick={handleAddNewSchema}>+ Add new schema</a>
      </div>

      <div className="buttonWrapper">
        <Button className="saveBtn" onClick={handleSubmit}>
          Save the Segment
        </Button>
        <Button className="cancelBtn" onClick={() => setPopup(false)}>
          Cancel
        </Button>
      </div>

      <TransitionablePortal closeOnTriggerClick open={open}>
        <Segment
          style={{
            left: "30%",
            position: "fixed",
            top: "30%",
            zIndex: 1000,
            height: "8vw",
            display: "flex !important",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            padding: "24px",
          }}
        >
          <h1>{message}</h1>
          <p>Thank You !</p>
        </Segment>
      </TransitionablePortal>
    </>
  );
};

export default PopupComponent;
