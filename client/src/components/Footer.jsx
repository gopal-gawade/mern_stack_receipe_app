import { Typography, useTheme } from "@mui/material";
import { SpaceBetweenDiv, StartDiv } from "../assets/styles/Styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    const theme = useTheme();

    return (
        <SpaceBetweenDiv sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}>
            <StartDiv>
                <Typography variant="h6">
                    Scranory
                </Typography>
            </StartDiv>

            <StartDiv>
                <Typography variant="body2">
                    How to reach me?
                </Typography>

                <a href="https://in.linkedin.com/in/gopal-gawade" target="_blank">
                    <LinkedInIcon sx={{ m: 1 }} />
                </a>

                <a href="https://github.com/gopal-gawade" target="_blank">
                    <GitHubIcon sx={{ m: 1 }} />
                </a>
            </StartDiv>
        </SpaceBetweenDiv>
    );
};

export default Footer;
