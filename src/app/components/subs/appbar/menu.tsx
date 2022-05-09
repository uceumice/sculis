import {
    Box,
    Button,
    Card,
    Container,
    Divider,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    List,
    ListItem,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography
} from "@mui/material";


import { useEffect, useState } from "react";

import { alpha } from '@mui/material/styles';

import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'; import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';

import { useLocalStorageState } from "../../../hooks";
import { fetchSourceInfo, fetchSourceUUIDbyQID } from "../../../apis";

const Settings = () => {
    const [source, setSource] = useState<string | null>(null);
    const [sourceData, setSourceData] = useState<any | undefined>(null);

    const [data, setData] = useLocalStorageState<any[] | null>([], 'substitution-sources-data')
    const [sources, setSources] = useLocalStorageState<string[]>([], 'substitution-sources-uuid');

    const [adding, setAdding] = useState<boolean>(false);


    useEffect(() => {
        if (data) {
            let filtered = [...data].filter(v => v.uuid === source);
            if (filtered.length > 0) {
                setSourceData(filtered[0]);
            } else {
                if (source) {
                    fetchSourceInfo(source).then(
                        v => {
                            setData(data.concat([v]));
                        }
                    );
                };
            };
        } else {
            if (source) {
                fetchSourceInfo(source).then(
                    v => {
                        setData([v]);
                    }
                );
            };
        };
    }, []);

    return (
        <Card sx={{
            borderRadius: '0',
            marginTop: "0",
            marginBottom: "0px",
            border: "none",
            width: "100%",
            height: "100%",
        }}
            variant="outlined"
        >
            <List>
                <ListItem>
                    <Container disableGutters>
                        <Typography color="GrayText" textAlign="center">Quellen</Typography>
                        <SourceManager />
                    </Container>
                </ListItem>
                {/* <ListItem>
                    ababa
                </ListItem> */}
            </List>
        </Card>

    );
};

const SourceManager = (props: any) => {
    const [adding, setAdding] = useState<boolean>(false);
    const [source, setSource] = useState<string>();

    const [sources, setSources] = useState<string[]>([]);


    return (
        <Box
            sx={{
                display: "flex", flexDirection: "row",
                alignItems: "start", justifyContent: "space-between"
            }}
            marginY="14px"
        >
            <FormControl
                size="small"
                color="info"
                sx={{
                    width: "100%"
                }}

            >
                {
                    adding || sources.length == 0 ? <SourceInput sources={sources} setSources={setSources} /> : <SourceSelection source={source} setSource={setSource} sources={sources} />
                }
            </FormControl>
            {sources.length > 0 ? <IconButton size="medium" onClick={() => setAdding(!adding)} >
                {adding ? <HighlightOffRoundedIcon /> : <AddCircleOutlineRoundedIcon />}
            </IconButton > : null
            }
        </Box >
    );
};

type SourceSelectionProps = {
    source?: string,
    setSource: Function

    sources: string[]
};

const SourceSelection = (props: SourceSelectionProps) => {
    let _select: { disabled: boolean, label: string, icon: any };

    // conditional paramters
    let _lab = "Daten-Quelle";

    let _val = props.source ? props.source : '';

    const handleSelectionSource = (event: SelectChangeEvent) => props.setSource(event.target.value);

    return <Box>

        <InputLabel
            id="source-select"
        >
            {_lab}
        </InputLabel>,

        <Select

            labelId="source-select" id="source-select"
            label={_lab}
            value={_val}

            onChange={handleSelectionSource}

            MenuProps={{
                PaperProps: {
                    sx: {
                        borderRadius: "0px",
                        marginTop: "20px",
                        backgroundColor: "transparent"
                    }
                },
                BackdropProps: {
                    sx: {
                        backgroundColor: (theme) => theme.palette.mode === "light" ? alpha("#000000", .3) : alpha("#ffffff", .025)
                    }
                },
                sx: {
                    padding: "0px"
                }
            }}
        >
            {
                props.sources.map(
                    (src, i0) => (
                        <MenuItem
                            key={i0}
                            value={i0.toString()}
                            sx={{
                                ":focus": {
                                    backgroundColor: "transparent"
                                },
                                ":hover": {
                                    backgroundColor: "transparent"
                                },
                                "&.Mui-selected": {
                                    backgroundColor: "transparent",
                                    ":hover": {
                                        backgroundColor: "transparent"
                                    }
                                },
                                backgroundColor: "transparent"
                            }}

                            TouchRippleProps={{
                                color: "transparent"
                            }}

                            disableRipple
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    backgroundColor: (theme) => theme.palette.background.default,
                                    paddingY: "5px",
                                    paddingX: "15px",
                                    width: "fit-content",
                                    borderRadius: "999px"
                                }}
                                flexDirection="row"
                                justifyContent="space-between"
                                alignItems="center"
                                width="100%"
                            >
                                <Typography variant="body2">{src}</Typography>
                            </Box>
                        </MenuItem>
                    )
                )
            }
        </Select >
    </Box>;
};

type SourceInputProps = {
    sources: string[],
    setSources: Function
};

const SourceInput = (props: SourceInputProps) => {
    const [qid, setQID] = useState<string>('');

    const [valid, setValid] = useState<boolean>();
    const [msg, setMSG] = useState<string>();

    const validateInput = (event) => {
        if (event.target.value.length < 8) {
            setMSG("Length < 8");
            setValid(false);
        } else {
            setValid(true);
            setMSG("");
        };
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        validateInput(event);

        if (event.target.value.match("^[a-zA-Z0-9_]{0,8}$")) {
            event.target.value = event.target.value.toUpperCase();
            setQID(event.target.value);
        } else {
            event.target.value = qid;
        }
    };

    const handleSubmitQID = () => {
        console.log("STARTED");
        fetchSourceUUIDbyQID(qid).then(
            (data) => {
                if (data) {
                    setMSG("");
                    props.setSources(...props.sources, data.uuid);
                } else {
                    if (data == undefined) {
                        setMSG("Keine Verbindung zum Server");
                    } else {
                        setMSG("Ungültiges QID");
                    }
                };
            }
        );
        console.log("ENDED");
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "row"
                }}
            >
                <TextField
                    size="small" fullWidth

                    placeholder="CODE"

                    color={msg ? "error" : "info"}

                    onChange={event => handleChange(event)}

                    onBlur={(event) => {
                        validateInput(event);
                        setMSG("");
                    }}

                    onFocus={(event) => {
                        validateInput(event);
                    }}

                    InputProps={{
                        sx: { borderRadius: 10 },
                        startAdornment: <InputAdornment position="start">QID╶</InputAdornment>
                    }}

                    inputProps={{
                        onKeyPress: (event) => { if (event.key === "Enter") handleSubmitQID() }
                    }}
                />
                <Divider flexItem orientation="vertical" sx={{ marginX: "10px" }} variant="middle" />
                <Button color="info" onClick={handleSubmitQID} disabled={!valid} onBlur={() => setMSG("")}>
                    submit
                </Button>
            </Box>
            <Typography variant="caption" color="error" marginLeft="15px">{msg}</Typography>
        </Box>
    );
};

export { Settings as Menu };