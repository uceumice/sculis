import { useState } from 'react';

import {
    Box,
    Button,
    Card,
    IconButton,
    Typography
} from '@mui/material';

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { EntryData } from '../../../../../../apis/types';

type ColorVariant = {
    dark: string,
    light: string
}

type Colors = {
    raumwechsel: ColorVariant,
    eva: ColorVariant,
    teams: ColorVariant,
    ausfall: ColorVariant,
    divers: ColorVariant,
    vertretung: ColorVariant
}

const statusColors: Colors = {
    raumwechsel: {
        dark: "#40ff7c",
        light: "#4a9e65"
    },
    eva: {
        dark: "#73d1cd",
        light: "#469995"
    },
    teams: {
        dark: "#9f40ff",
        light: "#61009e"
    },
    ausfall: {
        dark: "#db8f8f",
        light: "#a82323"
    },
    divers: {
        dark: "#c4c4c4",
        light: "#636363"
    },
    vertretung: {
        dark: "#fdff91",
        light: "#fff01f"
    }
}

function statusToColor(status: string, theme: "light" | "dark"): string {
    return statusColors[status][theme];
}

type EntryProps = {
    entry: EntryData
}

export default function Entry(props: EntryProps) {
    const [open, setOpen] = useState<boolean>(false);

    const openSwitch = () => {
        setOpen(!open);
    };

    return (
        <Card
            sx={{
                borderRadius: '20px',
                width: "100%"
            }}
            variant="elevation"
            elevation={2}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    borderRadius: "999px",
                    width: "100%",
                    height: "max-content"
                }}
            >
                <Button sx={{ paddingX: "5px", color: (theme) => theme.palette.text.primary }}>{props.entry.subject}</Button>
                <Button sx={{ paddingX: "5px", color: (theme) => theme.palette.text.primary }}>{props.entry.group}</Button>
                <Button sx={{ paddingX: "5px", color: (theme) => theme.palette.text.primary, whiteSpace: "nowrap" }}>
                    {
                        props.entry.roomchange == null ? (
                            props.entry.room
                        ) : (
                            props.entry.room + " » " + props.entry.roomchange
                        )
                    }
                </Button>
                <IconButton
                    sx={{ paddingX: "5px", color: (theme) => statusToColor(props.entry.status, theme.palette.mode) }}
                    disabled={props.entry.notice ? false : true}
                    onClick={openSwitch}
                >
                    {
                        open ? (
                            <ExpandLessRoundedIcon />
                        ) : (
                            <ExpandMoreRoundedIcon />
                        )
                    }
                </IconButton>
            </Box>
            {
                open ? (
                    <Card
                        sx={{
                            borderRadius: '25px',
                            marginY: "20px",
                            marginX: "10px",
                        }}

                        variant="elevation"
                        elevation={3}
                    >
                        <div
                            style={{
                                padding: "5px 10px"
                            }}
                        >
                            <Typography
                                variant="body1"
                                sx={{
                                    paddingX: "10px"
                                }}
                                align="justify"
                            >
                                {props.entry.notice}
                            </Typography>
                        </div>
                    </Card>
                ) : (
                    null
                )
            }
        </Card >
    )
};