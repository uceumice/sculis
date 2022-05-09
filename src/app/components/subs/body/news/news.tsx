import { useEffect, useState } from 'react';

import {
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    ListItem,
    Paper,
    Typography
} from '@mui/material';

import { LoadingText } from '../../../_coms/components';

type NewsProps = {
    data: string[] | null
}

const News = (props: NewsProps) => {
    const [open, setOpen] = useState<boolean>(false);

    const openSwitch = () => {
        setOpen(!open);
    };

    return (
        <ListItem disableGutters disablePadding>
            <Card
                sx={{
                    borderRadius: '0',
                    marginTop: "0",
                    marginBottom: "20px",
                    border: "none",
                    width: "100%"
                }}
                variant="outlined"
            >
                <CardHeader
                    disableTypography
                    title={
                        <div
                            style={{ display: "flex", justifyContent: "center" }}
                        >
                            {
                                props.data ? (
                                    <Button
                                        sx={{
                                            background: (theme) => theme.custom.gradients.button,
                                            WebkitBackgroundClip: "text",
                                            WebkitTextFillColor: "transparent",

                                            fontWeight: "bold"
                                        }}
                                        onClick={openSwitch}
                                        disabled={props.data.length <= 0}
                                    >
                                        {props.data.length > 0 ? "Nachrichten" : "Keine Nachrichten"}
                                    </Button>
                                ) : (
                                    <LoadingText length={16} intervaal={80}></LoadingText>
                                )
                            }
                        </div>
                    }
                />
                {
                    open && props.data && props.data.length > 0 ? (
                        < CardContent>
                            {
                                props.data.map(
                                    (v, i) =>
                                        <div key={i}>
                                            <div
                                                style={{
                                                    margin: "10px 0px",
                                                    display: "flex"
                                                }}
                                            >
                                                <Typography
                                                    sx={{
                                                        marginRight: "10px"
                                                    }}
                                                    fontWeight="bold"
                                                >
                                                    {" § "}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                >
                                                    {v}
                                                </Typography>
                                            </div>
                                            <Divider />
                                        </div>
                                )
                            }
                        </CardContent>
                    ) : (
                        <Divider />
                    )
                }
            </Card >
        </ListItem>
    )
};

export { News };