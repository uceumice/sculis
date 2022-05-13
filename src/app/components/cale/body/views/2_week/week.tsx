import { useEffect, useState } from "react";

//MUI
import { Paper } from "@mui/material";

// DATE MANIPULATION
import moment from "moment";

// ANIMATION
import Fade from 'react-reveal/Fade';

//
import { WeekChange } from "./weekchange";
import { WeekDay } from "./weekday";

const getWeekDates = (week: number, year: number, fdw: 0 | 1 = 1): Date[] => {
    let firstDayOfTheYear = moment(Date.UTC(year, 0, 1));
    let firstDayOfTheWeek = firstDayOfTheYear.add((-firstDayOfTheYear.weekday() + fdw) + (week - 1) * 7, "days");

    return Array<Date | null>(7).fill(null).map((_, wd) => moment(firstDayOfTheWeek).add(wd, "days").toDate());
}

type WeekProps = {
    size: {
        width: number
        height: number
    }
}

const Week = (props: WeekProps) => {
    const [year, setYear] = useState<number>(2022);
    const [week, setWeek] = useState<number>(moment().isoWeek());

    const [dates, setDates] = useState<Date[]>(getWeekDates(week, year));

    let getTileSize = () => {
        return {
            height: props.size.height / 4,
            width: props.size.width / 2
        }
    };

    useEffect(() => {
        setDates(getWeekDates(week, year));
    }, [week]);

    return (
        <Paper sx={{ overflowY: "hidden", borderRadius: 0, height: "100%", backgroundColor: (theme) => theme.palette.primary.main }}>
            <Fade cascade>
                <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
                    {[...Array(7).keys()].map(i => <WeekDay size={getTileSize()} date={dates[i]} />)}
                    <WeekChange size={getTileSize()} year={year} week={week} setWeek={setWeek} setYear={setYear} />
                </div>
            </Fade>
        </Paper >
    );
};

export { Week }