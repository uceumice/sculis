import {
    Button,
    Container,
    IconButton,
    Toolbar,
    Typography
} from '@mui/material';

import stockImage from "../../../assets/stock.jpg";

import { AppBar as MUIAppBar } from '@mui/material';

import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';

import { useTheme } from '@mui/material/styles'
import { useState } from 'react';

type AppBarProps = {
    themeSwitch: Function
}

const AppBar = (props: AppBarProps) => {
    let theme = useTheme().palette.mode;
    let [expaded, setExpanded] = useState<boolean>(true);

    return (
        <MUIAppBar sx={{ position: "relative" }}>
            <Container disableGutters sx={{ height: "auto" }}>
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        onClick={() => props.themeSwitch()}
                    >
                        {
                            theme === 'light' ? (
                                <DarkModeRoundedIcon />
                            ) : (
                                <LightModeRoundedIcon />
                            )
                        }
                    </IconButton>
                    <Button
                        variant="text"
                        onClick={() => { }}
                        sx={{
                            backgroundColor: (theme) => theme.palette.background.default,
                            ":focus": {
                                backgroundColor: (theme) => theme.palette.background.default
                            },
                            ":hover": {
                                backgroundColor: (theme) => theme.palette.background.default
                            }
                        }}
                    >
                        <Typography
                            textAlign="center"
                            variant="body1"
                            sx={{
                                width: "100%",
                                background: (theme) => theme.custom.gradients.button,
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            {"SCULIS"}
                        </Typography>
                    </Button>

                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={() => window.open(
                            `https://dev-arpo49rh.us.auth0.com/authorize?response_type=token&client_id=9Pi5WMzxjEMXBIrCDXAxbFiko8tEBRMg&&redirect_uri=https://sculis.uceumice.com/callback`
                        )}
                    >
                        <LoginIcon />
                    </IconButton>
                </Toolbar>
            </Container>
        </MUIAppBar >
    );
};

export { AppBar };