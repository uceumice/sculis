import {
    CardContent,
    Typography
} from "@mui/material";



import StyledCard from "../_coms/StyledCard";


/**
 * About Sculis Card
 */
export default function AboutSculis() {
    return (
        <StyledCard sx={{
            borderRadius: "20px",
            marginTop: "20px",
            marginBottom: "20px",
        }}
        >
            <CardContent>
                <Typography align="justify" component="div">

                    <Typography component="span">
                        {`So eine
                        einfache Aufgabe kann einen deutlichen zeitlichen Aufwand stellen. Die ist
                        nicht besonders kompliziert, aber schon wichtig. Auch der 
                         
                        `}
                    </Typography>
                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {"Vertretungsplan"}
                    </Typography>
                    <Typography component="span">
                        {` ist nicht immer überschaubar und erreichbar. 
                        Mal hat sich etwas geändert, man ist aber trotzdem 
                        in der Schule... obwohl man in der Zeit noch im 
                        Bett liegen könnte. Mit der Zeit sparsam umzugehen 
                        ist eine Kunst, und Sculis soll dabei Ihr vertrautes 
                        Instrument werden. 
                        `}
                    </Typography>
                </Typography>

            </CardContent>
        </StyledCard >
    );
};



