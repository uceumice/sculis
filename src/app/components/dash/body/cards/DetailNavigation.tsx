// MUI
import {
    CardContent,
    CardMedia,
    Typography
} from "@mui/material";

// SUBS
import StyledCard from "../_coms/StyledCard";
import StyledHeader from "../_coms/StyledHeader";

import webmNavigation from "../../../../assets/navigation.webm";


export default function DetailNavigation() {
    return (
        <StyledCard sx={{
            borderRadius: "20px",
            marginTop: "20px",
            marginBottom: "20px",
        }}
        >
            <StyledHeader title="in detail" />
            <CardMedia
                component="video"
                autoPlay
                loop
                src={webmNavigation}
            >
            </CardMedia>
            <CardContent sx={{ width: "100%" }}>
                <Typography variant="body1" align="justify">
                    <Typography component="span">
                        {`
                    Sculis ist in 3 Bereiche zu unterteilen: 
                    `}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" Plan,"}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" Übersicht"}
                    </Typography>
                    <Typography component="span">
                        {`
                        und  
                        `}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" Vertretung."}
                    </Typography>
                    <Typography component="span">
                        {` Vollständig implementiert sind zwar nur die Übersichtseite 
                        und die Vertretungsseite. "Plan" braucht ein bisschen 🤏 mehr Zeit. 
                        `}
                    </Typography>
                </Typography>
            </CardContent>
        </StyledCard >
    );
}