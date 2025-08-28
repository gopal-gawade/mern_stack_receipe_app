import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
    Box,
    IconButton,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
    Grid,
    ThemeProvider,
    Toolbar,
    Card,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import { CenterDiv, DarkButton } from "../assets/styles/Styles";
import { lightTheme, darkTheme } from "../assets/styles/Theme"
import { modeContext } from "../App";
import Navbar from "../components/Navbar";

const Register = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [description, setDescription] = useState("");
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const mode = useContext(modeContext);

    const formOne = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
            confirm_password: "",
            first: "",
            last: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Please enter valid email")
                .required("Please enter email"),
            password: Yup.string()
                .required("Please enter password")
                .min(8, "Password must be 8 characters long")
                .matches(/[0-9]/, "Password requires a number")
                .matches(/[a-z]/, "Password requires a lowercase letter")
                .matches(/[A-Z]/, "Password requires an uppercase letter")
                .matches(/[^\w]/, "Password requires a special character"),
            confirm_password: Yup.string()
                .required("Please enter confirm password")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            first: Yup.string().required("Please enter first name"),
            last: Yup.string().required("Please enter last name"),
        }),

        onSubmit: async (values) => {
            try {
                setMessage("Please wait!");
                setDescription("Please do not close the window or go back");
                setOpen(true);

                await axios.post(`${import.meta.env.VITE_API_KEY}/auth/register`, {
                    email: values.email,
                    password: values.password,
                    firstname: values.first,
                    lastname: values.last,
                });

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, 2000);

                setMessage("Success!");
                setDescription("Registered successfully.");
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, 2000);

                formOne.resetForm();
                navigate("/login");
            } catch (err) {
                setMessage("Error!");
                setDescription(err?.response?.data?.data);
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, 2000);
            }
        },
    });

    return (
        <ThemeProvider theme={mode.mode === 'dark' ? darkTheme : lightTheme}>
            <div style={{ padding: "12px" }}>
                <Navbar
                    mode={mode.mode}
                    setMode={mode.setMode}
                />
                <Toolbar />

                <Grid container spacing={2}>
                    <Grid size={{ lg: 4, md: 3, sm: 1, xs: 0.5 }} />

                    <Grid size={{ lg: 4, md: 6, sm: 10, xs: 11 }}>
                        <Card sx={{ p: 5 }}>
                            <Typography
                                variant="h5"
                                textAlign="center"
                                sx={{ fontWeight: 500 }}
                            >
                                Register
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                First Name<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Enter First Name"
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                id="first"
                                name="first"
                                onChange={formOne.handleChange}
                                value={formOne.values.first}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.first && formOne.errors.first ?
                                    <>{formOne.errors.first}</> : <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                Last Name<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Enter Last Name"
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                id="last"
                                name="last"
                                onChange={formOne.handleChange}
                                value={formOne.values.last}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.last && formOne.errors.last ?
                                    <>{formOne.errors.last}</> : <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                Email<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                placeholder="Enter Email"
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                id="email"
                                name="email"
                                onChange={formOne.handleChange}
                                value={formOne.values.email}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.email && formOne.errors.email ?
                                    <>{formOne.errors.email}</> : <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                Password<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type={showPassword1 ? "text" : "password"}
                                placeholder="Enter Password"
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                id="password"
                                name="password"
                                onChange={formOne.handleChange}
                                value={formOne.values.password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword1((show) => !show)}
                                                edge="end"
                                            >
                                                {showPassword1 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.password && formOne.errors.password ?
                                    <>{formOne.errors.password}</> : <>&emsp;</>
                                }
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                Confirm Password<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type={showPassword2 ? "text" : "password"}
                                placeholder="Enter Password Again"
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                id="confirm_password"
                                name="confirm_password"
                                onChange={formOne.handleChange}
                                value={formOne.values.confirm_password}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword2((show) => !show)}
                                                edge="end"
                                            >
                                                {showPassword2 ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.confirm_password && formOne.errors.confirm_password ?
                                    <>{formOne.errors.confirm_password}</> : <>&emsp;</>
                                }
                            </Typography>

                            <CenterDiv>
                                <DarkButton
                                    onClick={formOne.handleSubmit}
                                    sx={{ width: '80px', m: 0.5 }}
                                >
                                    <Typography variant="body1">
                                        Submit
                                    </Typography>
                                </DarkButton>

                                <Button
                                    sx={{ width: '80px', m: 0.5 }}
                                    onClick={() => { formOne.handleReset(); navigate("/") }}
                                >
                                    <Typography variant="body1">
                                        Back
                                    </Typography>
                                </Button>
                            </CenterDiv>

                            <Box sx={{ width: "100%", mt: 1, textAlign: "center" }}>
                                <Typography variant="body2">
                                    Already have an account?{" "}
                                    <span
                                        style={{
                                            cursor: "pointer",
                                            color: "#0a84ff",
                                            fontWeight: 500,
                                        }}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </span>
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid size={{ lg: 4, md: 3, sm: 1, xs: 0.5 }} />
                </Grid>

                <Dialog
                    open={open}
                    sx={{ textAlign: "center" }}
                >
                    <DialogTitle>
                        <Typography variant="h5">
                            {message}
                        </Typography>
                    </DialogTitle>

                    <DialogTitle>
                        {message?.includes("wait") ?
                            <CircularProgress color="primary" /> :
                            message?.includes("Success") ?
                                <img
                                    src={success}
                                    height="40px"
                                    alt=""
                                /> :
                                message?.includes("Error") ?
                                    <img
                                        src={error}
                                        height="40px"
                                        alt=""
                                    /> :
                                    null
                        }
                    </DialogTitle>

                    <DialogContent sx={Smalldialog ? { minWidth: "100px" } : { minWidth: "320px" }}>
                        <DialogContentText>
                            <Typography variant="body1">
                                {description}
                            </Typography>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </div>
        </ThemeProvider>
    );
};

export default Register;
