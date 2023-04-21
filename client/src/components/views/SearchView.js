import { Container, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostBrowser from "../PostBrowser";
import Sidebar from "../Sidebar";

const SearchView = () => {
  return (
    <>
      <Navbar />
      <Container sx={{marginTop:"5rem"}}>
        <GridLayout
          mid={<Sidebar />}
          left={
            <Stack spacing={2}>
              <PostBrowser createPost contentType="posts" />
            </Stack>
          }
          right={<Sidebar />}
        />
      </Container>
    </>
  );
};

export default SearchView;
