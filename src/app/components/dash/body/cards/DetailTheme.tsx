import {
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";

import StyledCard from "../_coms/StyledCard";
import StyledHeader from "../_coms/StyledHeader";

import webmTheme from "../../../../assets/theme.webm";


export default function DetailDashboard() {
    return (
        <StyledCard sx={{
            borderRadius: "20px",
            marginTop: "20px",
            marginBottom: "20px",
        }}
        >
            <StyledHeader title="palette" />
            <CardMedia
                component="video"
                autoPlay
                loop
                src={webmTheme}
            >
            </CardMedia>
            <CardContent sx={{ width: "100%" }}>
                <Typography variant="body1" align="justify">
                    <Typography component="span">
                        {`Es gibt eine `}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {"helle "}

                    </Typography>
                    <Typography component="span">
                        {`und eine`}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" dunkle "}

                    </Typography>
                    <Typography component="span">
                        {`
                        Farben-Palette. Als Default wird die Palette ihres Geräts 
                        festgelegt, entsprechend "light" oder "dark".
                        `}
                    </Typography>
                </Typography>
            </CardContent>
        </StyledCard >
    );
};