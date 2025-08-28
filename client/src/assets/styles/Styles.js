import styled from "@emotion/styled";
import { Box, Button, Card } from "@mui/material";

export const SpaceBetweenDiv = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2px",
    padding: "8px"
});

export const StartDiv = styled(Box)({
    display: "flex",
    justifyContent: "start",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2px",
    padding: "8px"
});

export const CenterDiv = styled(Box)({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2px",
    padding: "8px"
});


export const CenterColDiv = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "2px",
    padding: "8px"
});

export const StartColDiv = styled(Box)({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "start",
    textAlign: "left",
    flexWrap: "wrap",
    gap: "2px",
    padding: "8px"
});

export const RecipeCard = styled(Card)({
    width: "100%",
    textAlign: "center",
    position: "relative",
    transition: "all 200ms",
    "&:hover": {
        transform: "translateY(-2px)",
    },
});

export const RecipeCardContent = styled(Box)({
    width: "100%",
    overflow: "hidden",
    height: "250px",
});

export const RecipeSaveButton = styled(Box)({
    position: "absolute",
    top: "8px",
    right: "8px",
    background: "#FFFFFF",
    padding: "8px",
});

export const RecipeCardEmpty = styled(Box)({
    width: "100%",
    overflow: "hidden",
    height: "250px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

export const SectionBox1 = styled(Box)({
    width: "100%",
    minHeight: "400px",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
});

export const SectionBox2 = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
});

export const SectionBox3 = styled(Box)({
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
});

export const DarkButton = styled(Button)({
    backgroundColor: '#007aff',
    color: '#FFFFFF'
})

export const RecipeImgBox = styled(Box)({
    width: "100%",
    maxHeight: "350px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    overflow: "hidden",
    marginBottom: "4px",
});
