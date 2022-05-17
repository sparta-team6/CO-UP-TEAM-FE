import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import React from "react";

const Spinner = () => {
  return (
    <React.Fragment>
      <Stack sx={{ color: "grey.500" }} spacing={2} direction="row">
        <CircularProgress color="secondary" />
      </Stack>
    </React.Fragment>
  );
};

export default Spinner;
