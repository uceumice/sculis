import { Container } from '@mui/material';
import { Filter } from '../../../../apis/types';

import { DatePicker } from './datepicker/datepicker';
import { NotiConfig } from './noticonfig/noticonfig';
import { SubsFilters } from './subsfilters/subsfilters';

export type SubBarType = "notification" | "filter" | "date" | null;

type SubBarProps = {
    subbar: SubBarType,

    dates: Date[] | null,

    date: Date | null,
    setDate: Function,

    filters: Filter[],
    setFilters: Function

    nes: boolean,
    setNES: Function
};

const SubBar = (props: SubBarProps) => {
    return (
        < Container disableGutters
            sx={{
                backgroundColor: "background.default"
            }}
        >
            {
                props.subbar === 'filter' ? (
                    <SubsFilters filters={props.filters} setFilters={props.setFilters} nes={props.nes} setNES={props.setNES}/>
                ) : props.subbar === 'date' ? (
                    <DatePicker
                        date={props.date}
                        setDate={props.setDate}

                        dates={props.dates}
                    />
                ) : props.subbar === 'notification' ? (
                    <NotiConfig />
                ) : null
            }
        </Container >)
};

export { SubBar };