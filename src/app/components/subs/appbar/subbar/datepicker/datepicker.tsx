import { useEffect, useState } from 'react';

// MUI
import {
    CircularProgress,
    Container,
    LinearProgress,
    TextField,
    Typography
} from "@mui/material";

// Picker
import {
    LocalizationProvider,
    StaticDatePicker
} from '@mui/lab';

// Date FNS
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { de } from 'date-fns/esm/locale'

type DatePickerProps = {
    dates: Date[] | null,

    date: Date | null,
    setDate: Function,
}

const DatePicker = (props: DatePickerProps) => {
    const [date, setDate] = useState<Date | null>(props.date);

    return (
        <Container disableGutters>
            {props.dates ? (
                <LocalizationProvider dateAdapter={AdapterDateFns} locale={de}>
                    <StaticDatePicker value={date}
                        onChange={(val: null | Date) => {
                            setDate(val);
                            props.setDate(val);
                        }}

                        shouldDisableDate={
                            (day) => props.dates ? !!props.dates.find(item => item.getTime() != day.getTime()) : true
                        }

                        open={false}
                        openTo="day"

                        disableCloseOnSelect={true}

                        onAccept={(val: Date | null) => {
                            setDate(val);
                            props.setDate(val);
                        }}


                        toolbarTitle={
                            <Typography>
                                {"Vertretung für"}
                            </Typography>
                        }

                        renderInput={(params) => <TextField {...params} />}
                        views={['day']}

                        displayStaticWrapperAs="desktop"
                    />
                </LocalizationProvider>
            ) : (
                <div style={{
                    width: "100%", height: "100%",
                    display: "flex",
                    justifyContent: "center", alignItems: "center",
                }}
                >
                    <CircularProgress sx={{ margin: "10px" }} />
                </div>
            )
            }
        </Container >
    )
}

export { DatePicker };