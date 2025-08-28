import {
  Box,
  ThemeProvider,
} from "@mui/material";
import "./App.css";
import { createContext, useEffect, useState } from "react";
import {
  createBrowserRouter,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Home from "./screens/Home";
import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import Login from "./screens/Login";
import Register from "./screens/Register";
import MyRecipes from "./screens/MyRecipes";
import Recipe from "./components/Recipe";
import axios from "axios";
import Footer from "./components/Footer";
import { darkTheme, lightTheme } from "./assets/styles/Theme";

export const modeContext = createContext();

export const App = () => {
  const defaultmode = sessionStorage.getItem("mode") === "" || sessionStorage.getItem("mode") === null ?
    "light" :
    sessionStorage.getItem("mode");
  const [mode, setMode] = useState(defaultmode);
  const location = useLocation();
  const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [category, setCategory] = useState("All");

  useEffect(() => {
    sessionStorage.setItem("mode", mode);
  }, [mode]);

  useEffect(() => {
    if (userInfo === null && location.pathname.includes("myrecipes")) {
      navigate("/");
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_KEY}/recipes/?category=${category}`);
      const data = res.data;
      setLoading(false);

      if (userInfo !== null && location.pathname.includes("myrecipelist")) {
        setData(data?.filter((v) => v.userOwner === userInfo.userID).map((v) => v));
      }
      else {
        setData(data);
      }
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    window.onpopstate = () => {
      navigate("/");
    };
  }, [navigate]);

  return (
    <div className="App">
      <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
        <Navbar
          mode={mode}
          setMode={setMode}
        />

        <modeContext.Provider
          value={{
            mode: mode,
            setMode: setMode,
            data: data,
            loading: loading,
            setData: setData,
            fetchData: fetchData,
            category: category,
            setCategory: setCategory,
          }}
        >
          <Box
            sx={{
              backgroundColor: "background.default",
              color: "text.primary",
              minHeight: "100vh",
            }}
          >
            <Box
              sx={{
                p: 3,
                textAlign: "left",
                maxWidth: "1200px",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              {location.pathname === "/" ? <Home /> : null}
              <Outlet />
            </Box>
          </Box>

          <Footer />
        </modeContext.Provider>
      </ThemeProvider>
    </div>
  );
};

export const MainRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/blog/:id",
        element: <Blog />,
      },
      {
        path: "/myrecipes/:id",
        element: <MyRecipes />,
      },
      {
        path: "/myrecipelist",
        element: <Recipe />,
      },
      {
        path: "/mysavedlist",
        element: <Recipe />,
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ]
  }
]);
