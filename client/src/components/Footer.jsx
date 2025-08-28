import { Typography, useTheme } from "@mui/material";
import { CenterColDiv, SpaceBetweenDiv, StartColDiv, StartDiv } from "../assets/styles/Styles";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    const theme = useTheme();

    return (
        <SpaceBetweenDiv sx={{ backgroundColor: theme.palette.primary.main, color: "white" }}>
            <StartDiv>
                <Typography variant="h6" sx={{mx:3}}>
                    Scranory
                </Typography>
            </StartDiv>

            <StartColDiv sx={{mx:2}}>
                <StartDiv>
                    <Typography variant="body2">
                        ©2025 Scranory. All rights reserved.
                    </Typography>
                </StartDiv>

                <StartDiv>
                    <Typography variant="body2">
                        Contact:
                    </Typography>

                    <a href="https://in.linkedin.com/in/gopal-gawade" target="_blank">
                        <LinkedInIcon sx={{ m: 0.5 }} />
                    </a>

                    <a href="https://github.com/gopal-gawade" target="_blank">
                        <GitHubIcon sx={{ m: 0.5 }} />
                    </a>
                </StartDiv>
            </StartColDiv>
        </SpaceBetweenDiv>
    );
};

export default Footer;
