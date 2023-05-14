import { Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { AiTwotoneHome } from "react-icons/ai";

const GoBack = () => {
  return (
    <Button
      component={Link}
      to="/"
      variant="contained"
      color="primary"
      sx={{ mb: 2 }}
    >
      <AiTwotoneHome fontSize="1.5rem" />  Quay về trang chủ
    </Button>
  );
};

export default GoBack;
