import {
    AppBar,
    Box,
    Button,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { StartDiv } from "../assets/styles/Styles";

const Navbar = ({ mode, setMode }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("md"));

    const Logout = () => {
        sessionStorage.removeItem("userInfo");
        navigate("/");
    };

    return (
        <AppBar
            elevation={0}
            sx={{ color: "text.primary", p: 1 }}
        >
            <Toolbar>
                <StartDiv onClick={() => navigate("/")}>
                    <Typography
                        variant="h6"
                        sx={{ ml: 1, fontWeight: 600, fontFamily: "Poppins", cursor:'pointer' }}
                    >
                        Scranory
                    </Typography>
                </StartDiv>

                <Box sx={{ ml: "auto" }}>
                    {userInfo !== null ?
                        <>
                            {!matches ?
                                <Button sx={{ m: 1 }} onClick={() => navigate("/myrecipelist")}>
                                    <Typography variant="body2">
                                        My Recipes
                                    </Typography>
                                </Button> :
                                <IconButton
                                    sx={{ bgcolor: "background.default", m: 0.5 }}
                                    onClick={() => navigate("/myrecipelist")}
                                >
                                    <Tooltip title="My Recipes">
                                        <FavoriteIcon />
                                    </Tooltip>
                                </IconButton>
                            }

                            {!matches ?
                                <Button sx={{ m: 1 }} onClick={() => navigate("/mysavedlist")}>
                                    <Typography variant="body2">
                                        Saved Recipes
                                    </Typography>
                                </Button> :
                                <IconButton
                                    sx={{ bgcolor: "background.default", m: 0.5 }}
                                    onClick={() => navigate("/mysavedlist")}
                                >
                                    <Tooltip title="Saved Recipes">
                                        <BookmarkIcon />
                                    </Tooltip>
                                </IconButton>
                            }
                        </> :
                        null
                    }

                    <IconButton
                        sx={{ bgcolor: "background.default", m: 0.5 }}
                        onClick={() => setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))}
                    >
                        {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                    </IconButton>

                    {location.pathname.includes("/login") ?
                        null :
                        <>
                            {matches ?
                                <IconButton
                                    sx={{ bgcolor: "background.default" }}
                                    onClick={() => userInfo === null ? navigate("/login") : Logout()}
                                >
                                    {userInfo === null ? <LoginIcon /> : <LogoutIcon />}
                                </IconButton> :
                                <Button sx={{ m: 1 }} onClick={() => userInfo === null ? navigate("/login") : Logout()}>
                                    <Typography variant="body2">
                                        {userInfo === null ? "Login" : "Logout"}
                                    </Typography>
                                </Button>
                            }
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
