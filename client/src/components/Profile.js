import { useTheme } from "@emotion/react";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Stack,
  Typography,
  Grid,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { isLoggedIn } from "../helpers/authHelper";
import ContentUpdateEditor from "./ContentUpdateEditor";
import Footer from "./Footer";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const currentUser = isLoggedIn();
  const theme = useTheme();
  const iconColor = theme.palette.primary.main;

  useEffect(() => {
    if (props.profile) {
      setUser(props.profile.user);
    }
  }, [props.profile]);

  return (
    <Card>
      {user ? (
        <Stack alignItems="center" spacing={2}>
          <Box my={1}>
            <UserAvatar width={150} height={150} username={user.username} />
          </Box>

          <Typography variant="h5">{user.username}</Typography>

          {props.editing ? (
            <Box>
              <ContentUpdateEditor
                handleSubmit={props.handleSubmit}
                originalBiography={user.biography}
                originalUsername={user.username}
                originalEmail={user.email}
                originalPhonenumber={user.phonenumber}
                originalAddress={user.address}
                validate={props.validate}
              />
            </Box>
          ) : user.biography ? (
            <>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Email: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.email}</Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Phone number: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.phonenumber}</Typography>
                </Grid>
              </Grid>
              
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Address: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.address}</Typography>
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Tiểu sử: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.biography}</Typography>
                </Grid>
              </Grid>
            </>
            
          ) : (
            <>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="p"><b>Email: </b></Typography>
              </Grid>
              <Grid item>
                <Typography variant="p">{user.email}</Typography>
              </Grid>
            </Grid>

            <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Phone number: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.phonenumber}</Typography>
                </Grid>
              </Grid>
              
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Typography variant="p"><b>Address: </b></Typography>
                </Grid>
                <Grid item>
                  <Typography variant="p">{user.address}</Typography>
                </Grid>
              </Grid>

            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography variant="p"><b>Tiểu sử: </b></Typography>
              </Grid>
              <Grid item>
                <Typography variant="p">Chưa có gì -_-</Typography>
              </Grid>
            </Grid>
          </>
          )}

          {currentUser && user._id === currentUser.userId && (
            <Box>
              <Button
                startIcon={<AiFillEdit color={iconColor} />}
                onClick={props.handleEditing}
              >
                {props.editing ? <>Hủy</> : <>Chỉnh sửa thông tin</>}
              </Button>
            </Box>
          )}

          {currentUser && user._id !== currentUser.userId && (
            <Button variant="outlined" onClick={props.handleMessage}>
              Nhắn tin
            </Button>
          )}

          <HorizontalStack>
            <Typography color="text.secondary">
              Likes <b>{props.profile.posts.likeCount}</b>
            </Typography>
            <Typography color="text.secondary">
              Posts <b>{props.profile.posts.count}</b>
            </Typography>
          </HorizontalStack>
        </Stack>
      ) : (
        <Loading label="Loading profile" />
      )}
    </Card>
  );
};

export default Profile;
