import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { MdRefresh } from "react-icons/md";
import { isLoggedIn } from "../helpers/authHelper";
import { Link } from "react-router-dom";
import { getFollowing } from "../api/users";
import Loading from "./Loading";
import UserAvatar from "./UserAvatar";
import HorizontalStack from "./util/HorizontalStack";

const FindFollowingUsers = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const currentUser = isLoggedIn();

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getFollowing(currentUser.userId);
    const dataArray = Object.values(data)[0];
    setLoading(false);
    setUsers(dataArray);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClick = () => {
    fetchUsers();
  };

  return (
    <Card>
      <Stack spacing={2}>
        <HorizontalStack justifyContent="space-between">
          <HorizontalStack>
            <AiOutlineUser />
            <Typography>Bạn đang theo dõi</Typography>
          </HorizontalStack>
          <IconButton
            sx={{ padding: 0 }}
            disabled={loading}
            onClick={handleClick}
          >
            <MdRefresh />
          </IconButton>
        </HorizontalStack>

        <Divider />

        {loading ? (
          <Loading />
        ) : (
          users &&
          users.map((user) => (
            <HorizontalStack justifyContent="space-between" key={user._id}>
              <HorizontalStack>
                <UserAvatar width={30} height={30} username={user.followingName} />
                <Typography>{user.followingName}</Typography>
              </HorizontalStack>
              <Link
                to={"/users/" + user.followingName}
                style={{
                  textDecoration: "none",
                  color: "rgb(25, 118, 210)",
                  fontWeight: "bold",
                  display:"flex",
                  alignItems:"center"
                }}
              >
                <AiOutlineUser 
                  style={{
                    fontSize: 25
                  }}
                />
                Xem
              </Link>
            </HorizontalStack>
          ))
        )}
      </Stack>
    </Card>
  );
};

export default FindFollowingUsers;
