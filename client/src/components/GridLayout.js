import { Grid, Stack } from "@mui/material";
import React from "react";

const GridLayout = (props) => {
  const { left, right, mid } = props;

  return (
    <Grid container spacing={8}>
      <Grid item md={3} sx={{ 
        display: { xs: "none", md: "block" },
      }}>
        {mid}
      </Grid>
      <Grid item xs={12} md={6}>
        {left}
      </Grid>
      <Grid item md={3} sx={{ 
        display: { xs: "none", md: "block" },
      }}>
        {right}
      </Grid>
    </Grid>
  );
};

export default GridLayout;
