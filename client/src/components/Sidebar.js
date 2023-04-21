import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { getPosts } from "../api/posts";
import { isLoggedIn } from "../helpers/authHelper";
import FindUsers from "./FindUsers";
import Footer from "./Footer";
import Loading from "./Loading";
import PostCard from "./PostCard";
import TopPosts from "./TopPosts";

const Sidebar = () => {
  return (
    <Stack spacing={2} sx={{ 
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f0f2f5',
        overflowY: 'auto',
        padding: '16px',
      }}>
      <TopPosts />
      <FindUsers />
      <Footer />
    </Stack>
  );
};

export default Sidebar;
