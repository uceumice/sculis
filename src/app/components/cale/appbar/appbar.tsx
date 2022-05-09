// MUI
import {
    Container,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';

import { AppBar as MUIAppBar } from '@mui/material';

const AppBar = () => {
    return (
        <MUIAppBar sx={{ position: "relative" }}>
            <Container disableGutters>
                <Toolbar sx={{ justifyContent: "center" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => { }}
                    >
                        <Typography>
                            {". . . . "}
                        </Typography>
                    </IconButton>
                </Toolbar>
            </Container>
        </MUIAppBar>
    )
};

export { AppBar };