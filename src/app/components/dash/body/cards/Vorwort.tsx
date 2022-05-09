import {
    CardContent,
    Container,
    Divider,
    Typography
} from '@mui/material';

import Marquee from "react-marquee-slider";

import StyledCard from '../_coms/StyledCard';
import StyledHeader from '../_coms/StyledHeader';

const emojis = [
    "👩‍🏫", "🧑‍🏫", "👨‍🏫", "👩‍💻", "🧑‍💻", "👨‍💻", "🙋‍♀️", "🙋", "🙋‍♂️", "🤖", "👾", "🥸"
]

export default function Vorwort() {
    return (
        <StyledCard sx={{
            borderRadius: "20px",
            marginTop: "20px",
            marginBottom: "20px",
        }}>
            <StyledHeader title="vorwort" />
            <Container sx={{ height: "100px" }} disableGutters>
                <Marquee
                    velocity={55}
                    scatterRandomly
                    direction="ltr"
                    resetAfterTries={1000}
                    onFinish={() => { }}
                    onInit={() => { }}
                >
                    {
                        emojis.map((emoji, index) => <Typography key={index}>{emoji}</Typography>)
                    }
                </Marquee>
            </Container>
            <CardContent>

                <Typography sx={{ marginBottom: "20px" }} align="justify">
                    {`
                    Die Entwicklung von Sculis wurde mitten 
                    Februar angefangen (kann man auch bei der GitHub sehen). 
                    Man konnte in der kurzen Zeitspanne nicht alles, was 
                    man vorher geplant hat, schaffen. Vieles ist noch in 
                    der Ausarbeitung oder einer aktiven Implementationsphase. 
                    `}
                </Typography>


                <Divider />
                <Typography align="justify" sx={{ marginY: "20px" }}>
                    <Typography component="span" >
                        {`
                        Was man aber bereits einigermaßen fest stehen hat, ist das 
                        `}
                    </Typography>
                    <Typography component="span" sx={{
                        background: (theme) => theme.custom.gradients.button,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        {"Frontend."}
                    </Typography>
                    <Typography component="span" >
                        {`Design und Interaktion sind größtenteils, nicht ohne Hilfe von `}
                    </Typography>
                    <Typography component="span" sx={{
                        background: (theme) => theme.custom.gradients.button,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        cursor: "pointer"
                    }}
                        onClick={() => window.open("https://mui.com/")}
                    >
                        {"@MUI/material"}
                    </Typography>
                    <Typography component="span" >
                        {` Bibliothek implementiert. Diese kann man schon auch erfahren.`}
                    </Typography>
                </Typography>
                <Divider />
                <Typography align="justify" sx={{ marginY: "20px" }}>
                    <Typography component="span">
                        {`
                        Gerade sind nur die 
                        `}
                    </Typography>
                    <Typography component="span" sx={{
                        background: (theme) => theme.custom.gradients.button,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        cursor: "pointer"
                    }}
                        onClick={() => window.open("https://sculis-api.uceumice.com/redoc")}
                    >
                        {"Test-APIs"}
                    </Typography>
                    <Typography component="span">
                        {`
                        funktional. Bald müssen aber auch die restlichen 
                        Schnittstellen auch umgesetzt, getestet und an das 
                        Frontend angeschlossen werden. 
                        `}
                    </Typography>
                </Typography>
                <Divider />
                <Typography align="justify" sx={{ marginY: "20px" }}>
                    <Typography component="span" >
                        {`
                    
                    `}
                    </Typography>
                    <Typography component="span" sx={{
                        background: (theme) => theme.custom.gradients.button,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                    }}>
                        {"Authentisierung, E-Mail, SMS, Datenbanken, Sicherheit, SEO und viel mehr"}
                    </Typography>
                    <Typography component="span">
                        {`
                         kommt noch. Das Projekt wird größer, wie auch die Motivation des Sculis Teams. 
                        `}
                    </Typography>
                </Typography>
            </CardContent>
            <Typography variant="body2" align="center" sx={{ marginBottom: "20px" }}>
                {
                    `🪛  🧭  🔮  💻`
                }
            </Typography>
        </StyledCard >
    );
}