// MUI
import {
    Button,
    Container,
    Divider,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';

import { AppBar as MUIAppBar } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

import { RowListExtended } from '../../_coms/components';
import { useState } from 'react';




const AppBar = (props: any) => {
    const [mode, setMode] = useState<number>(0);

    const refer = {
        0: "Day",
        1: "Week",
        2: "Month",
        3: "Year"
    }

    return (
        <MUIAppBar sx={{ position: "relative" }}>
            <Container disableGutters>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <RowListExtended>
                        <IconButton
                            edge="start"
                            color="inherit"
                            sx={{ marginRight: "4px" }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Button
                            variant="contained"
                            sx={{ marginLeft: "4px" }}
                            onClick={() => setMode(mode == 3 ? 0 : mode + 1)}
                        >
                            {refer[mode]}
                        </Button>
                    </RowListExtended>
                    <RowListExtended>
                        <IconButton
                            edge="start"
                            color="inherit"
                            sx={{ marginRight: "4px" }}
                        >
                            <SearchRoundedIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            color="inherit"
                            sx={{ marginLeft: "4px" }}
                        >
                            <CalendarTodayIcon />
                        </IconButton>

                    </RowListExtended>
                </Toolbar>
            </Container>
        </MUIAppBar>
    )
};

export { AppBar };