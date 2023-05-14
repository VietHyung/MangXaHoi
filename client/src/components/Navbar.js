import { useTheme } from "@emotion/react";
import {
  Avatar,
  IconButton,
  Stack,
  TextField,
  Typography,
  Button,
  InputAdornment,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "react-icons/ai";
import "react-icons/ri";
import {
  AiFillFileText,
  AiFillHome,
  AiOutlineWifi,
  AiFillMessage,
  AiOutlineSearch,
} from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn, logoutUser } from "../helpers/authHelper";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";
import { RiContrast2Line } from "react-icons/ri";
import zIndex from "@mui/material/styles/zIndex";

const Navbar = () => {
  const navigate = useNavigate();
  const user = isLoggedIn();
  const theme = useTheme();
  const username = user && isLoggedIn().username;
  const [search, setSearch] = useState("");
  const [searchIcon, setSearchIcon] = useState(false);
  const [width, setWindowWidth] = useState(0);

  useEffect(() => {
    updateDimensions();

    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const mobile = width < 500;
  const navbarWidth = width < 600;

  const updateDimensions = () => {
    const width = window.innerWidth;
    setWindowWidth(width);
  };

  const handleLogout = async (e) => {
    logoutUser();
    navigate("/login");
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/search?" + new URLSearchParams({ search }));
  };

  const handleSearchIcon = (e) => {
    setSearchIcon(!searchIcon);
  };

  return (
    <Stack mb={2} mt={1} pb={1} sx={{ 
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)", 
      backgroundColor: "#4FE5B5",
      position:"fixed",
      top: -17, left: 0,
      width: "100%",
      zIndex:1000
      }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          pt: 2,
          pb: 0,
        }}
        spacing={!mobile ? 2 : 0}
      >
        <HorizontalStack flexGrow={1} >
          <AiOutlineWifi
            size={50}
            color={theme.palette.primary.main}
            onClick={() => navigate("/")}
            cursor="pointer"
          />
          <Typography
            sx={{ display: mobile ? "none" : "block", cursor: "pointer", textShadow:"2.5px 2.5px #46C19A"}}
            variant={navbarWidth ? "h5" : "h4"}
            mr={1}
            color={theme.palette.primary.main}
            onClick={() => navigate("/")}
            fontWeight="bold"
            fontStyle="italic"
          >
            <span style={{ color: "#e91e63" }}>S</span>
            <span style={{ color: "#2196f3" }}>o</span>
            <span style={{ color: "#9c27b0" }}>c</span>
            <span style={{ color: "#ffc107" }}>i</span>
            <span style={{ color: "#4caf50" }}>a</span>
            <span style={{ color: "#f44336" }}>l</span>
            <span style={{ color: "#03a9f4" }}>M</span>
            <span style={{ color: "#8bc34a" }}>e</span>
            <span style={{ color: "#673ab7" }}>d</span>
            <span style={{ color: "#ff5722" }}>i</span>
            <span style={{ color: "#607d8b" }}>a</span>
          </Typography>
        </HorizontalStack>

        {!navbarWidth && (
          <Box flexGrow={2} component="form" onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="Tìm bài đăng ..."
              sx={{ maxWidth: 700, backgroundColor: "white", borderRadius:".3rem"}}
              fullWidth
              onChange={handleChange}
              value={search}
            />
          </Box>
        )}

        <HorizontalStack flexGrow={1} justifyContent="flex-end" >
          {mobile && (
            <IconButton onClick={handleSearchIcon}>
              <AiOutlineSearch />
            </IconButton>
          )}

          <IconButton component={Link} to={"/"}>
            <AiFillHome style={{ color: "#EB3F3F" }} />
          </IconButton>
          {user ? (
            <>
              <IconButton component={Link} to={"/messenger"}>
                <AiFillMessage style={{ color: "#3AA9EB" }} /> 
              </IconButton>
              <IconButton component={Link}  to={"/users/" + username}>
                <UserAvatar width={30} height={30} username={user.username} />
              </IconButton>
              <Button onClick={handleLogout}>Đăng xuất</Button>
            </>
          ) : (
            <>
              <Button variant="text" sx={{ minWidth: 80 }} href="/signup">
                Đăng ký
              </Button>
              <Button variant="text" sx={{ minWidth: 65 }} href="/login">
                Đăng nhập
              </Button>
            </>
          )}
        </HorizontalStack>
      </Stack>
      {navbarWidth && searchIcon && (
        <Box component="form" onSubmit={handleSubmit} mt={2}>
          <TextField
            size="small"
            label="Tìm bài đăng ..."
            fullWidth
            onChange={handleChange}
            value={search}
          />
        </Box>
      )}
    </Stack>
  );
};

export default Navbar;
