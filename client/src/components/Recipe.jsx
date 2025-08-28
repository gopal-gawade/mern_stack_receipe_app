import {
    Avatar,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    CircularProgress,
    useMediaQuery,
    useTheme,
    Skeleton,
    TextField,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import success from "../assets/images/success.png";
import error from "../assets/images/error.png";
import empty from "../assets/images/cookie-icon.png";
import { useContext, useEffect, useState } from "react";
import BookmarkAddIcon from "@mui/icons-material/BookmarkAdd";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import { modeContext } from "../App";
import { useLocation, useNavigate } from "react-router-dom";
import Sections from "./Sections";
import axios from "axios";
import ReactPaginate from "react-paginate";
import Categories from "./Categories";
import {
    RecipeCard,
    RecipeCardContent,
    RecipeCardEmpty,
    RecipeSaveButton,
    StartDiv,
} from "../assets/styles/Styles";

const Recipe = () => {
    const [ids, setIds] = useState([]);
    const [keyword, setKeyword] = useState("");
    const mode = useContext(modeContext);
    const navigate = useNavigate();
    const location = useLocation();
    const userInfo = JSON.parse(sessionStorage.getItem("userInfo"));
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [description, setDescription] = useState("");
    const theme = useTheme();
    const Smalldialog = useMediaQuery(theme.breakpoints.down("sm"));
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 8;
    const endOffset = itemOffset + itemsPerPage;
    const currentItems = mode.data.filter((v) => !keyword ? v : v.name.toLowerCase().includes(keyword.toLowerCase())).slice(itemOffset, endOffset);
    const pageCount = Math.ceil(mode?.data?.filter((v) => !keyword ? v : v.name.toLowerCase().includes(keyword.toLowerCase())).length / itemsPerPage);

    const handlePageClick = (event) => {
        const newOffset =
            (event.selected * itemsPerPage) %
            mode?.data?.filter((v) =>
                !keyword ? v : v.name.toLowerCase().includes(keyword.toLowerCase())
            ).length;
        setItemOffset(newOffset);
    };

    useEffect(() => {
        mode.fetchData();
        setKeyword("");
    }, [navigate, mode.category]);

    const savedRecipesID = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_KEY}/recipes/savedRecipes/ids/${userInfo.userID}`);
            const data = await res.data;
            setIds(data?.data);
        } catch (err) {
            console.log(err);
        }
    };

    const saveRecipe = async (key) => {
        setMessage("Please wait!");
        setDescription("Please do not close the window or go back");
        setOpen(true);
        try {
            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);
            await axios.put(`${import.meta.env.VITE_API_KEY}/recipes`, {
                userID: userInfo.userID,
                recipeID: key,
            });
            setMessage("Success!");
            setDescription("Saved Successfully.");
            setOpen(true);

            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);

            savedRecipesID();
            mode.fetchData();
        } catch (err) {
            setMessage("Error!");
            setDescription("Something went wrong!");
            setOpen(true);
            setTimeout(() => {
                setOpen(false);
                setMessage("");
                setDescription("");
            }, [2000]);
        }
    };

    useEffect(() => {
        savedRecipesID();
    }, []);

    return (
        <div>
            {location.pathname.includes("myrecipelist") || location.pathname.includes("mysavedlist") ?
                <>
                    <Toolbar />
                    <Sections />
                    <Categories />
                </> :
                null
            }

            <Typography variant="h5" sx={{ fontWeight: 600, my: 2 }}>
                {location.pathname.includes("myrecipelist") ?
                    "My" :
                    location.pathname.includes("mysavedlist") ? "Saved" : "Explore"}{" "}
                Recipes
            </Typography>

            <TextField
                fullWidth
                size="small"
                placeholder="Search"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                sx={{ mb: 2 }}
            />

            <Grid container spacing={4} sx={{ mb: 6 }}>
                {mode.loading ?
                    <>
                        {Array.from(Array(4).keys()).map((v, i) => {
                            return (
                                <Grid size={{ lg: 3, md: 4, sm: 6, xs: 12 }} key={i}>
                                    <RecipeCard sx={{ backgroundColor: "background.card" }}>
                                        <RecipeCardContent>
                                            <Skeleton
                                                variant="rectangular"
                                                animation="wave"
                                                width={"100%"}
                                                height={"100%"}
                                            />
                                        </RecipeCardContent>

                                        <Typography variant="h6" sx={{ fontWeight: 500, p: 1 }}>
                                            <Skeleton
                                                animation="wave"
                                                width={"100%"}
                                            />
                                        </Typography>

                                        <StartDiv>
                                            <Skeleton
                                                animation="wave"
                                                variant="circular"
                                                width={24}
                                                height={24}
                                                sx={{ backgroundColor: "secondary.main", mx: 1 }}
                                            />

                                            <Typography
                                                variant="body2"
                                                sx={{ color: "text.secondary" }}
                                            >
                                                <Skeleton
                                                    animation="wave"
                                                    width={"120px"}
                                                />
                                            </Typography>
                                        </StartDiv>
                                    </RecipeCard>
                                </Grid>
                            );
                        })}
                    </> :
                    <>
                        {!mode?.loading &&
                            mode?.data?.filter((v) => !keyword ? v : v.name.toLowerCase().includes(keyword.toLowerCase()))?.length === 0 ?
                            <Grid size={{ xs: 12 }}>
                                <RecipeCard>
                                    <RecipeCardEmpty>
                                        <img
                                            src={empty}
                                            height={"120px"}
                                            width={"120px"}
                                            alt=""
                                        />

                                        <Typography variant="h6">
                                            No Recipes
                                        </Typography>
                                    </RecipeCardEmpty>
                                </RecipeCard>
                            </Grid> :
                            <>
                                {location.pathname.includes("mysavedlist") ?
                                    <>
                                        {currentItems.filter((v) => ids.includes(v._id)).map((v) => {
                                            return (
                                                <Grid
                                                    size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
                                                    key={v._id}
                                                >
                                                    <RecipeCard
                                                        sx={{ backgroundColor: "background.card" }}
                                                        onClick={() =>
                                                            userInfo === null
                                                                ? navigate("/login")
                                                                : navigate(`/myrecipes/${v._id}`)
                                                        }
                                                    >
                                                        <RecipeCardContent>
                                                            <img
                                                                src={v?.imageUrl}
                                                                alt=""
                                                                height={"100%"}
                                                                width={"100%"}
                                                            />
                                                        </RecipeCardContent>

                                                        <Typography
                                                            variant="h6"
                                                            sx={{ fontWeight: 500, p: 1, cursor: "pointer" }}
                                                        >
                                                            {v.name?.length > 18
                                                                ? `${v.name?.slice(0, 18)}...`
                                                                : v.name}
                                                        </Typography>

                                                        <StartDiv>
                                                            <Avatar sx={{ backgroundColor: "secondary.main", width: 24, height: 24, mx: 1 }}>
                                                                <AccessTimeFilledIcon />
                                                            </Avatar>

                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: "text.secondary" }}
                                                            >
                                                                {v.cookingTime} Minutes
                                                            </Typography>
                                                        </StartDiv>
                                                    </RecipeCard>
                                                </Grid>
                                            );
                                        })}
                                    </> :
                                    <>
                                        {currentItems.map((v) => {
                                            return (
                                                <Grid
                                                    size={{ lg: 3, md: 4, sm: 6, xs: 12 }}
                                                    key={v._id}
                                                >
                                                    <RecipeCard sx={{ backgroundColor: "background.card" }}>
                                                        <RecipeCardContent>
                                                            <img
                                                                src={v.imageUrl}
                                                                alt=""
                                                                height={"100%"}
                                                                width={"100%"}
                                                            />

                                                            {v.userOwner === userInfo?.userID ||
                                                                userInfo === null ? null : (
                                                                <RecipeSaveButton
                                                                    sx={{
                                                                        cursor:
                                                                            v.userOwner === userInfo?.userID ||
                                                                                userInfo === null
                                                                                ? "no-drop"
                                                                                : "pointer",
                                                                        color:
                                                                            ids?.includes(v._id) && userInfo !== null
                                                                                ? "#30d158"
                                                                                : "#FFCC00",
                                                                    }}
                                                                    onClick={() => ids?.includes(v._id) ? console.log("") : saveRecipe(v._id)}
                                                                >
                                                                    {userInfo === null ?
                                                                        <BookmarkAddIcon /> :
                                                                        <>
                                                                            {ids?.includes(v._id) ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                                                                        </>
                                                                    }
                                                                </RecipeSaveButton>
                                                            )}
                                                        </RecipeCardContent>

                                                        <Typography
                                                            variant="body1"
                                                            sx={{ fontWeight: 500, p: 1, cursor: "pointer" }}
                                                            onClick={() => userInfo === null ? navigate("/login") : navigate(`/myrecipes/${v._id}`)}
                                                        >
                                                            <u>
                                                                {v.name?.length > 18 ? `${v.name?.slice(0, 18)}...` : v.name}
                                                            </u>
                                                        </Typography>

                                                        <StartDiv>
                                                            <Avatar sx={{ backgroundColor: "secondary.main", width: 24, height: 24, mx: 1 }}>
                                                                <AccessTimeFilledIcon />
                                                            </Avatar>

                                                            <Typography
                                                                variant="body2"
                                                                sx={{ color: "text.secondary" }}
                                                            >
                                                                {v.cookingTime} Minutes
                                                            </Typography>
                                                        </StartDiv>
                                                    </RecipeCard>
                                                </Grid>
                                            );
                                        })}
                                    </>
                                }
                            </>
                        }
                    </>
                }

                {mode.loading ? null : (
                    <Grid size={{ xs: 12 }}>
                        <div className="pagination-div">
                            <ReactPaginate
                                breakLabel="..."
                                nextLabel=">"
                                onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={pageCount}
                                previousLabel="<"
                                renderOnZeroPageCount={null}
                                activeClassName={"item active "}
                                breakClassName={"item break-me "}
                                containerClassName={"pagination"}
                                disabledClassName={"disabled-page"}
                                marginPagesDisplayed={2}
                                nextClassName={"item next "}
                                pageClassName={"item pagination-page "}
                                previousClassName={"item previous"}
                            />
                        </div>
                    </Grid>
                )}
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
                        <CircularProgress color="success" />
                        : message?.includes("Success") ?
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
    );
};

export default Recipe;
