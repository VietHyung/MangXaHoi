import { Box, Button, Stack, TextField } from "@mui/material";
import React, { useState } from "react";

const ContentUpdateEditor = (props) => {
  const [username, setUsername] = useState(props.originalUsername || "");
  const [email, setEmail] = useState(props.originalEmail || "");
  const [biography, setBiography] = useState(props.originalBiography || "");
  const [phonenumber, setPhonenumber] = useState(props.originalPhonenumber || "");
  const [address, setAddress] = useState(props.originalAddress || "");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleBiographyChange = (e) => {
    setBiography(e.target.value);
  };

  const handlePhonenumberChange = (e) => {
    setPhonenumber(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const content = {
      username,
      email,
      biography,
      phonenumber,
      address,
    };

    let error = null;

    if (props.validate) {
      error = props.validate(content);
    }

    if (error && error.length !== 0) {
      setError(error);
    } else {
      props.handleSubmit(content);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack>
        <TextField
          value={username}
          fullWidth
          margin="normal"
          name="username"
          sx={{ backgroundColor: "white" }}
          onChange={handleUsernameChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          InputLabelProps={{position: 'top-start'}}
          label="Tên người dùng"
        />

        <TextField
          value={email}
          fullWidth
          margin="normal"
          name="email"
          sx={{ backgroundColor: "white" }}
          onChange={handleEmailChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          InputLabelProps={{position: 'top-start'}}
          label="Email"
        />

        <TextField
          value={phonenumber}
          fullWidth
          margin="normal"
          name="phonenumber"
          sx={{ backgroundColor: "white" }}
          onChange={handlePhonenumberChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          InputLabelProps={{position: 'top-start'}}
          label="Số điện thoại"
        />

        <TextField
          value={address}
          fullWidth
          margin="normal"
          name="address"
          sx={{ backgroundColor: "white" }}
          onChange={handleAddressChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          InputLabelProps={{position: 'top-start'}}
          label="Địa chỉ"
        />

        <TextField
          value={biography}
          fullWidth
          margin="normal"
          name="biography"
          sx={{ backgroundColor: "white" }}
          onChange={handleBiographyChange}
          error={error.length !== 0}
          helperText={error}
          multiline
          InputLabelProps={{position: 'top-start'}}
          label="Tiểu sử"
        />


        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "white", mt: 1 }}
        >
          Sửa
        </Button>
      </Stack>
    </Box>
  );
};

export default ContentUpdateEditor;
