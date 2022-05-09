import { useState } from 'react';

import {
    Button,
    Card,
    CardContent,
    List,
    ListItem,
} from "@mui/material";

import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import { EntryData } from '../../../../../apis/types';
import Entry from './entry/entry';


type BlockProps = {
    class_: any,
    entries: EntryData[],
    disabled?: boolean,
}

const Block = (props: BlockProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const openSwitch = () => {
        setOpen(!open);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                width: "100%"
            }}
        >
            <Card
                sx={{
                    borderRadius: "999px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onClick={props.disabled ? undefined : openSwitch}
            >
                <Button
                    sx={{
                        width: "100%",
                        margin: "0",
                        padding: "0",
                        opacity: ".75"
                    }}
                    disabled={props.disabled}
                    variant='text'
                >
                    {props.class_}
                    {
                        props.disabled ? (
                            null
                        ) : (
                            open ? (
                                <ExpandLessRoundedIcon />
                            ) : (
                                <ExpandMoreRoundedIcon />
                            )
                        )
                    }
                </Button>
            </Card>


            <Card
                sx={{
                    borderRadius: '25px',
                    marginTop: "5px",
                    marginBottom: "20px",
                    display: "flex"
                }}

                variant="elevation"
                elevation={1}
            >
                {open ? (
                    <CardContent sx={{ width: "100%" }}>
                        <List>
                            {
                                props.entries.map(
                                    (entry, index) =>
                                        <ListItem disableGutters key={index}>
                                            <Entry entry={entry} />
                                        </ListItem>
                                )
                            }
                        </List>
                    </CardContent>
                ) : (
                    null
                )}
            </Card>
        </div >
    )
};

export { Block };