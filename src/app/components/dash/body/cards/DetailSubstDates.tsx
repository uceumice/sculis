import {
    CardContent,
    CardMedia,
    Divider,
    Link,
    Typography
} from "@mui/material";

import StyledCard from "../_coms/StyledCard";
import StyledHeader from "../_coms/StyledHeader";

import webmSubstDates from "../../../../assets/subst_dates.mp4";


export default function DetailSubstDates() {
    return (
        <StyledCard sx={{
            borderRadius: "20px",
            marginTop: "20px",
            marginBottom: "20px",
        }}
        >
            <StyledHeader title="vertretung" />
            <CardMedia
                component="video"
                autoPlay
                loop
                src={webmSubstDates}
            >
            </CardMedia>
            <CardContent sx={{ width: "100%" }}>
                <Typography variant="body1" align="justify" component="div">
                    <Typography component="span">
                        {`
                        Die 
                        `}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" Vertretungsseite "}
                    </Typography>

                    <Typography component="span">
                        {`
                        liefert einen Überblick über die Vertretung 
                        für eine ausgewählte Klasse, ein gewünschtes Datum. 
                        Die 
                        `}
                    </Typography>

                    <Typography
                        component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}>
                        {" Datenquellen können über APIs festgelegt werden. "}
                    </Typography>

                    <Typography component="span">
                        {`
                         Gerade sind nur die Testdaten für eine Stufe verfügbar.
                         Die Funktionalität wird erweitert.
                        `}
                    </Typography>
                    <Divider sx={{ marginY: "20px" }} />
                    <Typography component="span">
                        {`
                        Man kann die Vertretungsdaten direkt an die API 
                        schicken oder dem Sculis eine bereits aufgestellte 
                        Seite parsen lassen und die Daten anzeigen. Der 
                        Web-Scraper liest gerade die Vertretungsseite des 
                        Gymnasiums der Stadt Frechen ab. Der Script ist 
                        in Python geschrieben.
                        `}
                    </Typography>

                    <Divider sx={{ marginY: "20px" }} />

                    <Typography component="span"
                        sx={{
                            background: (theme) => theme.custom.gradients.button,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            cursor: "pointer"
                        }}
                        onClick={() => window.open("https://sculis-api.uceumice.com/redoc#tag/Substitution")}
                    >
                        {`
                        Siehe die APIs.
                        `}
                    </Typography>
                    <Link href="/v2">
                    </Link>
                </Typography>
            </CardContent>
        </StyledCard >
    );
};