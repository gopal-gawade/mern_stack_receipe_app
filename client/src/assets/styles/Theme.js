import { createTheme } from "@mui/material";

const common = {
    typography: {
        fontFamily: "Poppins",
        h1: { fontSize: "1.25rem", fontWeight: 600 },
        button: { textTransform: "none", fontWeight: 500, borderRadius: "12px" },
    },
    shape: {
        borderRadius: 16
    },
};

export const lightTheme = createTheme({
    ...common,
    palette: {
        mode: "light",
        background: {
            default: "#ffffff",
            paper: "#f9f9f9",
            card: "#f9f9f9"
        },
        text: {
            primary: "#000000",
            secondary: "#48484a",
        },
        primary: {
            main: "#007aff",
        },
        secondary: {
            main: "#34c759",
        },
        divider: "#d1d1d6",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    padding: "8px 20px",
                    backgroundColor: "#ebebf599",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    ":active": { opacity: 0.7 }
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50%",
                    padding: "4px",
                    margin: "4px",
                    backgroundColor: "#ebebf599",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                    ":active": { opacity: 0.7 },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "rgba(249,249,249,0.94)",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid #d1d1d6",
                    boxShadow: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    border: "1px solid #d1d1d6",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
                },
            },
        },
    },
});

export const darkTheme = createTheme({
    ...common,
    palette: {
        mode: "dark",
        background: {
            default: "#000000",
            paper: "#1c1c1e",
            card: "#007aff"
        },
        text: {
            primary: "#ffffff",
            secondary: "#ebebf599",
        },
        primary: {
            main: "#0a84ff",
        },
        secondary: {
            main: "#30d158",
        },
        divider: "#3a3a3c",
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                    padding: "8px 20px",
                    backgroundColor: "#ebebf599",
                    color: "#FFFFFF",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    ":active": { opacity: 0.7 },
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                root: {
                    borderRadius: "50%",
                    padding: "4px",
                    margin: "4px",
                    backgroundColor: "#3a3a3c",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                    ":active": { opacity: 0.7 },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: "#007aff",
                    backdropFilter: "blur(20px)",
                    borderBottom: "1px solid #3a3a3c",
                    boxShadow: "none",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "20px",
                    border: "1px solid #3a3a3c",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.5)",
                },
            },
        },
    },
});
