import { Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import SelectField from "../components/SelectField";
import TextFieldComp from "../components/TextFieldComp";

const Settings = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form onSubmit={handleSubmit}>
      <SelectField label="Category" />
      <SelectField label="Difficulty" />
      <SelectField label="Type" />
      <TextFieldComp />
      <Box mt={3} width="100%">
        <Button fullWidth variant="contained" type="submit">
          Get Started
        </Button>
      </Box>
    </form>
  );
};

export default Settings;
