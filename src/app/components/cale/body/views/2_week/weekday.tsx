import { useState } from "react";

// MUI
import { CardActionArea, Container, IconButton, Stack, Typography } from "@mui/material";

// ICONS
import { AddRounded } from "@mui/icons-material";

// ICONS 3D PARTY
import { SnowIcon, RainIcon, WindyIcon, FogIcon, CloudyIcon, DayCloudyIcon, NightCloudyIcon, DaySunnyIcon, NightClearIcon } from "../../../../../assets/icons";

//
import { TileBase } from "./tile";


type Icons1Set = "snow" | "rain" | "fog" | "wind" | "cloudy" | "partly-cloudy-day" | "partly-cloudy-night" | "clear-day" | "clear-night";

const getIcon = (key: Icons1Set) => {
    switch (key) {
        case "snow":
            return <SnowIcon />
        case "rain":
            return <RainIcon />
        case "fog":
            return <FogIcon />
        case "wind":
            return <WindyIcon />
        case "cloudy":
            return <CloudyIcon />
        case "partly-cloudy-day":
            return <DayCloudyIcon />
        case "partly-cloudy-night":
            return <NightCloudyIcon />
        case "clear-day":
            return <DaySunnyIcon />
        case "clear-night":
            return <NightClearIcon />
    }
}

type WeekDayProps = {
    size: { width: number, height: number }

    date: Date
}

const WeekDay = (props: WeekDayProps) => {
    const [weatherData, setWeatherData] = useState<{ icon: Icons1Set }>();

    
    return (
        <TileBase
            size={props.size}
        >
            <CardActionArea
                sx={{ width: "100%", height: "100%" }}
            >
                <Stack height="100%" width="100%">
                    <Container
                        sx={{
                            width: "100%",
                            display: "flex", flexDirection: "column",
                            alignItems: "start", justifyContent: "start"
                        }}
                    >
                        <div style={{
                            width: "100%",
                            display: "flex", flexDirection: "row",
                            alignItems: "center", justifyContent: "space-between",
                            padding: "8px 0 4px 0"
                        }}>
                            <div
                                style={{
                                    display: "flex", flexDirection: "row",
                                    alignItems: "center", justifyContent: "space-between"
                                }}
                            >
                                <Typography variant="button" color="primary" component="div" sx={{ marginRight: "8px" }}>{props.date.toLocaleString('de-DE', { weekday: "short" }).toUpperCase()}</Typography>
                                <Typography variant="button">{props.date.toLocaleString('de-DE', { day: "2-digit", month: "short" }).toUpperCase()}</Typography>
                            </div>
                            <IconButton
                                aria-label="settings"
                                color="primary"
                                size="small"

                                onTouchStart={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => { event.preventDefault() }}
                            >
                                {weatherData ? (
                                    getIcon(weatherData.icon)
                                ) : (
                                    // icon:dot | Bootstrap https://icons.getbootstrap.com/ | Bootstrap

                                    <svg
                                        fill="currentColor"
                                        viewBox="0 0 16 16"
                                        height="1em"
                                        width="1em"
                                    >
                                        <path fillRule="evenodd" d="M8 9.5a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                )
                                }
                            </IconButton>
                        </div>
                        <div style={{ paddingTop: "4px" }}>
                            <Typography
                                sx={{ posititon: "absolute", left: 0, top: 0 }}
                                variant="button"
                                fontSize="48px"
                                component="div"
                            >
                                🦥
                            </Typography>
                            <IconButton
                                sx={{ position: "absolute", left: "50%", top: "50%" }}
                                color="primary"
                                onTouchStart={(event) => event.stopPropagation()}
                                onMouseDown={(event) => event.stopPropagation()}
                                onClick={(event) => { event.preventDefault() }}
                            >
                                <AddRounded />
                            </IconButton>
                        </div>
                    </Container>
                </Stack>
            </CardActionArea>
        </TileBase >
    );


}

export { WeekDay };