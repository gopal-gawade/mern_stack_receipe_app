import {
    Box,
    Card,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import fast from "../assets/images/chopsticks-155276_1280.png";
import tea from "../assets/images/tea-153336_640.png";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CenterDiv } from "../assets/styles/Styles";

const Blog = () => {
    const location = useLocation();
    const params = useParams();
    const theme = useTheme();
    const navigate = useNavigate();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));

    const blogs = [
        {
            id: 1,
            image: fast,
            heading: "Health Benefits of Fasting",
            subheading: "Fasting, the practice of abstaining from food and drink for a period of time, has been used for centuries for its numerous health benefits. While it may seem counterintuitive to deprive oneself of sustenance, the advantages of fasting are undeniable.",
            article: [
                {
                    id: 1,
                    heading: "Weight Loss: One of the most obvious benefits of fasting is weight loss. By restricting caloric intake, the body is forced to burn stored fat for energy, leading to a reduction in body mass. This, in turn, reduces the risk of obesity-related diseases such as diabetes, heart disease, and certain types of cancer.",
                },
                {
                    id: 2,
                    heading: "Improved Insulin Sensitivity: Fasting has been shown to improve insulin sensitivity, which is critical for preventing type 2 diabetes. When the body is in a fasted state, it becomes more efficient at using insulin, reducing the risk of developing insulin resistance.",
                },
                {
                    id: 3,
                    heading: "Increased Human Growth Hormone (HGH) Production: Fasting has been linked to increased production of HGH, a hormone that promotes cellular regeneration and growth. Higher levels of HGH can lead to improved muscle mass, bone density, and skin health.",
                },
                {
                    id: 4,
                    heading: "Enhanced Autophagy: Autophagy is the process by which the body breaks down and recycles damaged cells and proteins. Fasting has been shown to stimulate autophagy, leading to a more efficient removal of cellular waste and a reduction in the risk of age-related diseases.",
                },
                {
                    id: 5,
                    heading: "Better Mental Clarity and Focus: Fasting has been practiced for centuries as a means of spiritual and mental discipline. The mental clarity and focus that result from fasting are due to the increased production of a protein called brain-derived neurotrophic factor (BDNF), which promotes neural health and function.",
                },
                {
                    id: 6,
                    heading: "Increased Longevity: Some studies have suggested that fasting may promote longevity by reducing oxidative stress and improving cellular function. While more research is needed to confirm this, the existing evidence is promising.",
                },
                {
                    id: 7,
                    heading: "Reduced Inflammation: Fasting has anti-inflammatory effects, which can help to reduce the risk of chronic diseases such as heart disease, cancer, and Alzheimer's disease.",
                },
                {
                    id: 8,
                    heading: "Improved Digestive Health: Fasting gives the digestive system a break, allowing it to rest and repair itself. This can lead to improved digestion, reduced symptoms of irritable bowel syndrome (IBS), and a stronger immune system",
                },
            ],
        },
        {
            id: 2,
            image: tea,
            heading: "Reasons Why Too Much Sugar Is Bad for You",
            subheading: "Consuming high amounts of sugar has become a common habit in today's world, but it can have severe consequences on our health. From causing energy crashes to damaging our skin, excessive sugar intake can wreak havoc on our bodies.",
            article: [
                {
                    id: 1,
                    heading: "Weight Gain and Obesity: Consuming too much sugar leads to a rapid increase in calorie intake, causing weight gain and obesity. This, in turn, increases the risk of developing life-threatening diseases like diabetes, heart disease, and certain types of cancer.",
                },
                {
                    id: 2,
                    heading: "Energy Crashes and Mood Swings: Sugar gives us a temporary energy boost, but it's followed by a crash, leaving us feeling lethargic and sluggish. This rollercoaster of energy levels can also lead to mood swings, anxiety, and depression.",
                },
                {
                    id: 3,
                    heading: "Skin Issues: A diet high in sugar can cause inflammation in the body, leading to skin issues like acne, premature aging, and rosacea. It can also reduce the skin's natural ability to regenerate, making it look dull and tired.",
                },
                {
                    id: 4,
                    heading: "Increased Risk of Chronic Diseases: Excessive sugar consumption has been linked to an increased risk of chronic diseases like heart disease, type 2 diabetes, and certain types of cancer. This is because sugar can cause inflammation in the body, leading to oxidative stress and cell damage.",
                },
                {
                    id: 5,
                    heading: "Tooth Decay and Gum Disease: The bacteria in our mouth feed on sugar, producing acid that can damage our teeth and gums. This can lead to tooth decay, cavities, and gum disease if left untreated.",
                },
                {
                    id: 6,
                    heading: "Disrupts Gut Health: A diet high in sugar can disrupt the balance of good and bad bacteria in our gut, leading to digestive issues like bloating, cramps, and diarrhea. This can also weaken our immune system, making us more susceptible to illnesses.",
                },
                {
                    id: 7,
                    heading: "Affects Cognitive Function: Consuming high amounts of sugar has been shown to impair cognitive function, including memory and learning ability. It can also increase the risk of dementia and Alzheimer's disease.",
                },
                {
                    id: 8,
                    heading: "Leads to Addiction: Sugar activates the brain's reward system, releasing feel-good hormones like dopamine. This can lead to addiction, making it difficult to cut down on sugar intake even when we know it's harming our health.",
                },
            ],
        },
    ];

    return (
        <div>
            <Box sx={{ backgroundColor: "background.default", color: "text.primary" }}>
                <Toolbar />

                <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
                    {params.id === "id" ||
                        params.id > blogs.length ||
                        Number(params.id) === 0 ||
                        location.pathname === "/" ?
                        <>
                            {location.pathname === "/" ?
                                <>
                                    <span>Blogs</span>

                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary", cursor: "pointer" }}
                                        onClick={() => navigate("/blog/id")}
                                    >
                                        Read more blogs
                                    </Typography>
                                </> :
                                <span>Blogs</span>
                            }
                        </> :
                        <>
                            <span>Blog</span>

                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", cursor: "pointer" }}
                                onClick={() => navigate("/blog/id")}
                            >
                                Read more blogs
                            </Typography>
                        </>
                    }
                </Typography>

                {location.pathname.includes("/blog") ?
                    <Box>
                        {params.id === "id" ||
                            params.id > blogs.length ||
                            Number(params.id) === 0 ?
                            <>
                                {blogs.map((v) => {
                                    return (
                                        <Box key={v.id}>
                                            <Typography variant="h6">
                                                {v.heading}
                                            </Typography>
                                            <br />

                                            <Grid container spacing={4}>
                                                <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                                                    <Card>
                                                        <CenterDiv sx={{ backgroundColor: "background.paper" }}>
                                                            <img
                                                                src={v.image}
                                                                alt=""
                                                                height={matches ? "150px" : "200px"}
                                                                width={"auto"}
                                                                style={{ padding: "12px" }}
                                                            />
                                                        </CenterDiv>
                                                    </Card>
                                                </Grid>

                                                <Grid size={{ xs: 12 }}>
                                                    <Typography variant="body1">
                                                        {v.subheading}
                                                    </Typography>

                                                    <ol>
                                                        {v.article.map((v) => {
                                                            return (
                                                                <li key={v.id}>
                                                                    <Typography
                                                                        variant="body1"
                                                                        sx={{ color: "text.secondary", lineHeight: 2 }}
                                                                    >
                                                                        {v.heading}
                                                                    </Typography>
                                                                </li>
                                                            );
                                                        })}
                                                    </ol>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    );
                                })}
                            </> :
                            <>
                                <Box>
                                    <Typography variant="h6">
                                        {blogs[params.id - 1].heading}
                                    </Typography>
                                    <br />

                                    <Grid container spacing={4}>
                                        <Grid size={{ lg: 6, md: 6, sm: 12, xs: 12 }}>
                                            <Card>
                                                <CenterDiv sx={{ backgroundColor: "background.paper" }}>
                                                    <img
                                                        src={blogs[params.id - 1].image}
                                                        alt=""
                                                        height={matches ? "150px" : "200px"}
                                                        width={"auto"}
                                                        style={{ padding: "12px" }}
                                                    />
                                                </CenterDiv>
                                            </Card>
                                        </Grid>

                                        <Grid size={{ xs: 12 }}>
                                            <Typography variant="body1">
                                                {blogs[params.id - 1].subheading}
                                            </Typography>

                                            <ol>
                                                {blogs[params.id - 1].article.map((v) => {
                                                    return (
                                                        <li key={v.id}>
                                                            <Typography
                                                                variant="body1"
                                                                sx={{ color: "text.secondary", lineHeight: 2 }}
                                                            >
                                                                {v.heading}
                                                            </Typography>
                                                        </li>
                                                    );
                                                })}
                                            </ol>
                                        </Grid>
                                    </Grid>
                                </Box>
                            </>
                        }
                    </Box> :
                    <Grid
                        container
                        spacing={4}
                        sx={{ cursor: "pointer" }}
                    >
                        {blogs.map((v) => {
                            return (
                                <Grid
                                    size={{ lg: 6, md: 6, sm: 12, xs: 12 }}
                                    key={v.id}
                                    onClick={() => navigate(`blog/${v.id}`)}
                                >
                                    <Box sx={{ width: "100%", textAlign: "center" }}>
                                        <Card>
                                            <CenterDiv sx={{ backgroundColor: "background.paper" }}>
                                                <img
                                                    src={v.image}
                                                    alt=""
                                                    height={"150px"}
                                                    width={"auto"}
                                                    style={{ padding: "12px" }}
                                                />
                                            </CenterDiv>
                                        </Card>
                                        <br />

                                        <Typography variant="h6">
                                            {v.heading}
                                        </Typography>

                                        <Typography
                                            variant="body1"
                                            sx={{ color: "text.secondary", mt: 1 }}
                                        >
                                            {v.subheading}
                                        </Typography>
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>
                }
            </Box>
        </div>
    );
};

export default Blog;
