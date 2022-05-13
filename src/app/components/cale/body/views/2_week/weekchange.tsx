import { NavigateBeforeRounded, NavigateNextRounded } from "@mui/icons-material"
import { CardActionArea, Stack, Typography } from "@mui/material"
import moment from "moment"
import { TileBase } from "./tile"

type WeekChangeProps = {
    size: { width: number, height: number }

    week: number
    year: number

    setWeek: Function
    setYear: Function
}

const WeekChange = (props: WeekChangeProps) => {
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
        <TileBase size={props.size}>
            <div style={{ width: "100%", height: "100%" }}>
                <div
                    style={{
                        height: "50%", width: "100%",
                        display: "flex", flexDirection: "column",
                        alignItems: "stretch", justifyContent: "space-around",
                        padding: "10px"
                    }}
                >
                    <Word word={`${props.year}`} lineHeight={props.size.height / 1.25} />
                    <Word word={`KW${props.week < 10 ? "0" + props.week : props.week}`} lineHeight={props.size.height / 1.75} />
                </div>
                <div
                    style={{
                        height: "50%", width: "100%",

                        display: "flex", flexDirection: "row",
                        alignItems: "stretch", justifyContent: "space-between"
                    }}
                >
                    <CardActionArea
                        sx={{
                            display: "flex", flexDirection: "row",
                            justifyContent: "center", alignItems: "center",
                        }}
                        onClick={prevWeekClick}
                    >
                        <NavigateBeforeRounded />
                    </CardActionArea>
                    <CardActionArea
                        sx={{
                            display: "flex", flexDirection: "row",
                            justifyContent: "center", alignItems: "center",
                        }}
                        onClick={nextWeekClick}
                    >
                        <NavigateNextRounded />
                    </CardActionArea>
                </div>
            </div>
        </TileBase >
    );
}

const Word = (props: { word: string, lineHeight: number }) => {
    return (
        <div
            style={{
                display: "flex", flexDirection: "row",
                justifyContent: "space-between", alignItems: "center"
            }}
        >
            {props.word.split("").map(letter => {
                return (
                    <Typography
                        variant="button"
                        color="primary"
                        sx={{
                            fontSize: props.lineHeight / 4,
                            lineHeight: "100%"
                        }}
                    >
                        {letter}
                    </Typography>
                )
            })}
        </div>
    )
}

export { WeekChange };