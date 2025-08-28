import { useContext, useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
    Box,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
    Button,
    ThemeProvider,
    Card,
    Toolbar,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import { CenterDiv, DarkButton } from "../assets/styles/Styles";
import Navbar from "../components/Navbar";
import { darkTheme, lightTheme } from "../assets/styles/Theme";
import { modeContext } from "../App";

const Login = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const outerTheme = useTheme();
    const Smalldialog = useMediaQuery(outerTheme.breakpoints.down("sm"));
    const navigate = useNavigate();
    const mode = useContext(modeContext);

    const formOne = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Please enter valid email")
                .required("Please enter email"),
            password: Yup.string().required("Please enter password"),
        }),

        onSubmit: async (values) => {
            try {
                setMessage("Please wait!");
                setDescription("Please do not close the window or go back");
                setOpen(true);

                const res = await axios.post(`${import.meta.env.VITE_API_KEY}/auth/login/`,
                    {
                        email: values.email,
                        password: values.password,
                    }
                );

                const data = await res.data;
                sessionStorage.setItem("userInfo", JSON.stringify(data));

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);

                setMessage("Success!");
                setDescription("Login Successfully.");
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);
                formOne.resetForm();
                navigate("/");
            } catch (err) {
                setMessage("Error!");
                setDescription(err?.response?.data?.data);
                setOpen(true);

                setTimeout(() => {
                    setOpen(false);
                    setMessage("");
                    setDescription("");
                }, [2000]);
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
                                Login
                            </Typography>

                            <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 450 }}>
                                Email<span style={{ color: "red" }}>*</span>
                            </Typography>

                            <TextField
                                size="small"
                                fullWidth
                                type="email"
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
                                type={showPassword ? "text" : "password"}
                                sx={{
                                    "& input::placeholder": { fontSize: "14px" },
                                    "& .MuiInputBase-root": {
                                        fontSize: "14px",
                                    },
                                }}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end" sx={{ ml: "auto" }}>
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword((show) => !show)}
                                                edge="end"
                                                sx={{ color: "#B3B6B7", ml: "auto" }}
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                placeholder="Enter Password"
                                id="password"
                                name="password"
                                onChange={formOne.handleChange}
                                value={formOne.values.password}
                            />

                            <Typography variant="caption" sx={{ color: "red" }}>
                                {formOne.touched.password && formOne.errors.password ?
                                    <>{formOne.errors.password}</> : <>&emsp;</>
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
                                    onClick={() => {
                                        formOne.handleReset();
                                        navigate("/");
                                    }}
                                >
                                    <Typography variant="body1">
                                        Back
                                    </Typography>
                                </Button>
                            </CenterDiv>

                            <Box sx={{ width: "100%", mt: 1, textAlign: "center" }}>
                                <Typography variant="body2">
                                    <span>Don't have an account yet?&nbsp;</span>

                                    <span
                                        style={{
                                            cursor: "pointer",
                                            color: "#0a84ff",
                                            fontWeight: 500,
                                        }}
                                        onClick={() => navigate("/register")}
                                    >
                                        Register now
                                    </span>
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>

                    <Grid size={{ lg: 4, md: 3, sm: 1, xs: 0.5 }} />
                </Grid>

                <Dialog
                    open={open}
                    aria-labelledby="responsive-dialog-title"
                    sx={{ textAlign: "center" }}
                >
                    <DialogTitle id="responsive-dialog-title" sx={{ mb: 0, pb: 0 }}>
                        <Typography variant="h5">
                            {message}
                        </Typography>
                    </DialogTitle>

                    <DialogTitle id="responsive-dialog-title">
                        {message?.includes("wait") ?
                            <CircularProgress color="success" /> :
                            message?.includes("Success") ?
                                <img
                                    src={success}
                                    height={"40px"}
                                    weight={"40px"}
                                    alt=""
                                /> :
                                message?.includes("Error") ?
                                    <img
                                        src={error}
                                        height={"40px"}
                                        weight={"40px"}
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

export default Login;
