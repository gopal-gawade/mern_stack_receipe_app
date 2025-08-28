import { Toolbar } from "@mui/material";
import Categories from "../components/Categories";
import Form from "../components/Form";
import Recipe from "../components/Recipe";
import Blog from "../components/Blog";
import Sections from "../components/Sections";

const Home = () => {
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));

    return (
        <div>
            <Toolbar />
            <Sections />
            <Categories />
            <Recipe />
            {userInfo === null ?
                <Form /> :
                null
            }
            <Blog />
        </div>
    );
};

export default Home;
