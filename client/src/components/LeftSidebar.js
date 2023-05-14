import { Stack, useTheme } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import FindFollowingUsers from "./FindFollowingUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./PostCard";
import TopPosts from "./TopPosts";

const LeftSidebar = () => {
  const theme = useTheme();
  const styles = {
    sidebar: {
      [theme.breakpoints.down("sm")]: {
        maxWidth: "100%",
      },
      [theme.breakpoints.up("md")]: {
        maxWidth: "250px",
      },
      [theme.breakpoints.up("lg")]: {
        maxWidth: "350px",
      },
    },
  };

  return (
    <Stack spacing={1} sx={{
      ...styles.sidebar,
      position: "fixed",
    }}>
      {isLoggedIn() && <FindFollowingUsers />}
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default LeftSidebar;
