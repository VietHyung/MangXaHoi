import {
  Button,
  Container,
  Stack,
  TextField,
  Typography,
  Link,
  Alert,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { signup } from "../../api/users";
import { loginUser } from "../../helpers/authHelper";
import { useNavigate } from "react-router-dom";
import Copyright from "../Copyright";
import ErrorAlert from "../ErrorAlert";
import { isLength, isEmail, contains } from "validator";

const SignupView = () => {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState("");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    phonenumber: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validate();
    if (Object.keys(errors).length !== 0) return;

    const data = await signup(formData);

    if (data.error) {
      setServerError(data.error);
    } else {
      loginUser(data);
      navigate("/");
    }
  };

  const validate = () => {
    const errors = {};

    if (!isLength(formData.username, { min: 6, max: 30 })) {
      errors.username = "Độ dài bắt buộc từ 6 đến 30 ";
    }

    if (contains(formData.username, " ")) {
      errors.username = "không được để trống";
    }

    if (!isLength(formData.password, { min: 8 })) {
      errors.password = "Độ dài bắt buộc ít nhất 8 từ";
    }

    if (!isEmail(formData.email)) {
      errors.email = "email phải điền đúng cấu trúc";
    }

    if (!isLength(formData.phonenumber, { min: 10, max: 11 })) {
      errors.phonenumber = "Số điện thoại không hợp lệ";
    }
  
    if (!formData.address) {
      errors.address = "Vui lòng điền địa chỉ";
    }

    setErrors(errors);

    return errors;
  };

  return (
    <Container maxWidth={"xs"} sx={{ mt: { xs: 2, md: 6 } }}>
      <Stack alignItems="center">
        <Typography variant="h2" color="text.secondary" sx={{ mb: 6 }}>
          <Link to="/" color="inherit" underline="none">
            SocialMedia
          </Link>
        </Typography>
        <Typography variant="h5" gutterBottom>
          Đăng ký
        </Typography>
        <Typography color="text.secondary">
          Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Tên đăng nhập"
            fullWidth
            margin="normal"
            autoFocus
            required
            id="username"
            name="username"
            onChange={handleChange}
            error={errors.username !== undefined}
            helperText={errors.username}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            autoComplete="email"
            required
            id="email"
            name="email"
            onChange={handleChange}
            error={errors.email !== undefined}
            helperText={errors.email}
          />
          <TextField
            label="Số điện thoại"
            fullWidth
            margin="normal"
            required
            id="phonenumber"
            name="phonenumber"
            onChange={handleChange}
            error={errors.phonenumber !== undefined}
            helperText={errors.phonenumber}
          />
          <TextField
            label="Địa chỉ"
            fullWidth
            margin="normal"
            required
            id="address"
            name="address"
            onChange={handleChange}
            error={errors.address !== undefined}
            helperText={errors.address}
          />
          <TextField
            label="Mật khẩu"
            fullWidth
            required
            margin="normal"
            autoComplete="password"
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            error={errors.password !== undefined}
            helperText={errors.password}
          />
          <ErrorAlert error={serverError} />
          <Button type="submit" fullWidth variant="contained" sx={{ my: 2 }}>
            Đăng ký
          </Button>
        </Box>
        <Box sx={{ mt: 3 }}>
          <Copyright />
        </Box>
      </Stack>
    </Container>
  );
};

export default SignupView;
