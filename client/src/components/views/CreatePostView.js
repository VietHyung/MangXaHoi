import { Container } from "@mui/material";
import React from "react";
import GoBack from "../GoBack";
import GridLayout from "../GridLayout";
import Navbar from "../Navbar";
import PostEditor from "../PostEditor";
import Sidebar from "../Sidebar";
import LeftSidebar from "../LeftSidebar";

const CreatePostView = () => {
  return (
    <>
      <Navbar />
      <Container sx={{marginTop:"5rem"}}>
        <GoBack />
        <GridLayout mid={<LeftSidebar/>} left={<PostEditor />} right={<Sidebar />} />
      </Container>
    </>
  );
};

export default CreatePostView;
