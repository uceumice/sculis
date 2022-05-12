import { useState } from 'react';

import {
    Container,
    Toolbar,
    IconButton,
    Button
} from "@mui/material";


import { AppBar as MUIAppBar } from '@mui/material';

import { LoadingText, RowListExtended } from "../../_coms/components";

import MenuIcon from '@mui/icons-material/Menu';
import FilterListRoundedIcon from '@mui/icons-material/FilterListRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';


import { SubBar } from './subbar/subbar';
import { Menu } from './menu';
import { Filter } from '../../../apis/types';


type AppBarProps = {
    dates: Date[] | null,

    date: Date | null,
    setDate: Function,


    filters: Filter[],
    setFilters: Function

    nes: boolean,
    setNES: Function
}

function formatDate(date: Date) {
    return date.toLocaleString('de-DE', {
        weekday: "short",
        month: "short",
        day: "numeric"
    })
}

const AppBar = (props: AppBarProps) => {
    const [subbar, setSubBar] = useState<any>(null);
    const [menu, setMenu] = useState<boolean>(false);

    let handleSubBarChange = (pSubBar: any) => subbar === pSubBar ? setSubBar(null) : setSubBar(pSubBar);

    let handleMenuClick = () => setMenu(!menu);

    let _date = () => {
        if (process.env.NODE_ENV === "production") {
            if (props.date) {
                return formatDate(props.date);
            } else {
                return <LoadingText length={16} typographyProps={{ sx: { opacity: .6 }, color: "white" }}></LoadingText>;
            }
        } else if (process.env.NODE_ENV === "development") {
            return formatDate(new Date());
        }
    }

    return (
        <MUIAppBar style={{ position: "relative" }}>
            {menu ? <Menu /> : null}
            <Container disableGutters>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <RowListExtended>
                        <IconButton children={<MenuIcon />}
                            edge="start"
                            color="inherit"
                            onClick={() => handleMenuClick()}
                        />
                        <Button
                            variant="contained"
                            onClick={() => handleSubBarChange('date')}
                            sx={{
                                marginLeft: "10px",
                                background: (theme) => theme.custom.gradients.button
                            }}
                        >
                            {_date()}
                        </Button>
                    </RowListExtended>

                    <RowListExtended>
                        <IconButton children={<FilterListRoundedIcon />}
                            edge="start"
                            color="inherit"
                            onClick={() => handleSubBarChange('filter')}
                        />
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={() => handleSubBarChange('notification')}
                            children={<NotificationsRoundedIcon />}
                        />
                    </RowListExtended>
                </Toolbar>
                <SubBar
                    subbar={subbar}

                    dates={props.dates}

                    date={props.date} setDate={props.setDate}

                    filters={props.filters} setFilters={props.setFilters}
                    
                    nes={props.nes} setNES={props.setNES}
                />
            </Container>

        </MUIAppBar >
    )
};

export { AppBar };