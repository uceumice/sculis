import { Avatar, Backdrop, Box, Button, Card, CardActionArea, CardContent, CardHeader, Container, Divider, IconButton, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import moment from 'moment';

import Fade from 'react-reveal/Fade';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';

import { fetchWeatherData } from "../../../apis";
import { SnowIcon, RainIcon, WindyIcon, FogIcon, CloudyIcon, DayCloudyIcon, NightCloudyIcon, DaySunnyIcon, NightClearIcon } from "../../../assets/icons";
import { NavigateBeforeRounded, NavigateNextRounded } from "@mui/icons-material";

const getWeekDates = (week: number, year: number, fdy: 0 | 1 = 1): Date[] => {
    let firstDayOfTheYear = moment(Date.UTC(year, 0, 1));
    let firstDayOfTheWeek = firstDayOfTheYear.add((-firstDayOfTheYear.weekday() + fdy) + (week - 1) * 7, "days");

    return Array<Date | null>(7).fill(null).map((_, wd) => moment(firstDayOfTheWeek).add(wd, "days").toDate());
}

type Icons1Set = "snow" | "rain" | "fog" | "wind" | "cloudy" | "partly-cloudy-day" | "partly-cloudy-night" | "clear-day" | "clear-night";

type Data = {
    date: Date
    weather?: {
        icon?: Icons1Set
    }
}

function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}

const Body = () => {
    const ref = useRef(null);

    const [height, setHeight] = useState<number>();
    const [width, setWidth] = useState<number>();

    const [year, setYear] = useState<number>(2022);
    const [week, setWeek] = useState<number>(moment().week());

    const [days, setDays] = useState<Data[]>(getWeekDates(week, year).map(d => { return { date: d } }));

    useEffect(() => {
        setHeight((ref as React.RefObject<HTMLDivElement>).current?.clientHeight);
        setWidth((ref as React.RefObject<HTMLDivElement>).current?.clientWidth);
    }, [useWindowSize()])


    useEffect(() => {
        setDays(getWeekDates(week, year).map(_date => { return { date: _date } }));

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    fetchWeatherData(
                        position.coords.latitude,
                        position.coords.longitude,
                        days[0].date,
                        days[6].date
                    ).then(_data => {
                        let data_: Data[] = [];

                        _data.days.forEach(
                            _day => {
                                let date: Date = new Date(_day.datetime); date.setHours(0, 0, 0, 0);
                                let icon: Icons1Set = _day.icon;
                                data_.push({ date: date, weather: { icon: icon } })
                            }
                        );

                        setDays(data_);
                    }
                    );
                }
            );
        }
    }, [week])


    let size = {
        height: height! / 4,
        width: width! / 2
    }

    return (
        <Paper sx={{ overflowY: "hidden", borderRadius: 0, height: "100%", backgroundColor: (theme) => theme.palette.primary.main }} ref={ref}>
            <Fade cascade>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                    {
                        Array(7).fill(0).map((_, i) => <WeekDay size={size} data={days[i]} />)
                    }
                    <WeekControls size={size} year={year} week={week} setWeek={setWeek} setYear={setYear} />
                </div>
            </Fade>
        </Paper >
    );
};

type WeekConProps = {
    size: { width: number, height: number }

    week: number
    year: number

    setWeek: Function
    setYear: Function
}

const WeekControls = (props: WeekConProps) => {
    const nextWeekClick = () => {
        if (props.week <= moment(Date.UTC(props.year, 11, 31)).isoWeek()) {
            props.setWeek(props.week + 1);
        } else {
            props.setWeek(1);
            props.setYear(props.year + 1);
        }
    }

    const prevWeekClick = () => {
        if (props.week > 1) {
            props.setWeek(props.week - 1)
        } else {
            props.setYear(props.year - 1);
            props.setWeek(moment(Date.UTC(props.year - 1, 11, 31)).isoWeek());
        }
    }

    return (
        <WeekTile size={props.size}>
            <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column" }}>
                <CardActionArea
                    sx={{
                        width: "100%",
                        height: "50%",
                        padding: "10px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "stretch",
                        justifyContent: "space-around"
                    }}
                >
                    <Word word={`${props.year}`} lineHeight={props.size.height / 1.25} />
                    <Word word={`KW${props.week < 10 ? "0" + props.week : props.week}`} lineHeight={props.size.height / 1.75} />
                </CardActionArea>
                <div style={{ width: "100%", height: "50%", display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                    <CardActionArea
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={prevWeekClick}
                    >
                        <NavigateBeforeRounded />
                    </CardActionArea>
                    <CardActionArea
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        onClick={nextWeekClick}
                    >
                        <NavigateNextRounded />
                    </CardActionArea>
                </div>
            </div>


        </WeekTile >
    );
}

const Word = (props: { word: string, lineHeight: number }) => {
    return (
        <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            {props.word.split("").map(letter => <Letter lineHeight={props.lineHeight}>{letter}</Letter>)}
        </Box>
    )
}

const Letter = (props: { lineHeight: number, children: any }) => {
    return (
        <Typography
            variant="button"
            color="primary"
            sx={{
                fontSize: props.lineHeight / 4,
                lineHeight: "100%"
            }}
        >
            {props.children}
        </Typography>
    )
}


type WeekDayProps = {
    size: { width: number, height: number }

    data: Data,
}

const WeekDay = (props: WeekDayProps) => {
    const getIcon = (key: string) => {
        switch (key) {
            case "snow":
                return <SnowIcon />
                return;
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

    const mouseDown = e => {
        e.stopPropagation();
    }

    return (
        <WeekTile
            size={props.size}
        >
            <CardActionArea
                sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "start",
                    justifyContent: "start"
                }}
            >
                <CardHeader
                    avatar={
                        <Avatar sx={{ height: "2rem", width: "2rem", bgcolor: "transparent" }} aria-label="recipe">
                            <Typography variant="button" color="primary">{props.data.date.toLocaleString('de-DE', { weekday: "short" }).toUpperCase()}</Typography>
                        </Avatar>
                    }
                    title={<Typography variant="button">{props.data.date.toLocaleString('de-DE', { day: "2-digit", month: "short" }).toUpperCase()}</Typography>}
                    action={
                        <IconButton
                            aria-label="settings"
                            color="primary"

                            onTouchStart={(event) => event.stopPropagation()}
                            onMouseDown={(event) => event.stopPropagation()}
                            onClick={(event) => { event.preventDefault() }}
                        >
                            {props.data.weather && props.data.weather.icon ? (
                                getIcon(props.data.weather.icon)
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
                            )}
                        </IconButton>
                    }

                    sx={{ paddingBottom: "4px", width: "100%" }}
                />

                <CardContent sx={{ paddingTop: "4px" }}>
                    <Button
                        startIcon={<ApartmentRoundedIcon />}
                        variant="contained"
                        sx={{ paddingY: "4px", paddingX: "4px" }}
                        onTouchStart={(event) => event.stopPropagation()}
                        onMouseDown={(event) => event.stopPropagation()}
                        onClick={(event) => { event.preventDefault() }}
                    >
                        25
                    </Button>
                </CardContent>
            </CardActionArea>
        </WeekTile >
    );
}


type WeekTileProps = {
    size: { width: number, height: number }

    children: any
}
const WeekTile = (props: WeekTileProps) => {
    return (
        <Card
            sx={{
                height: props.size.height,
                width: props.size.width,
                borderRadius: 0,
                boxShadow: "none",
                cursor: "pointer"
            }}
        >
            {props.children}
        </Card>
    );
}

export { Body };