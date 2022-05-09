import { useState } from 'react';

// MUI
import {
    Container,
    Box,
    Button,
    FormControl,
    Divider,
    Select,
    MenuItem,
    Fab,
    Typography,
    InputLabel,
    SelectChangeEvent,
    ListItem,
    List,
    IconButton
} from "@mui/material";

import { alpha } from '@mui/material/styles';

// Icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ExploreRoundedIcon from '@mui/icons-material/ExploreRounded';
import ExploreOffRoundedIcon from '@mui/icons-material/ExploreOffRounded';

// Types
import { Filter } from '../../../../../apis/types';

// TYPES

type Subject = {
    id: string,
    name: string
}
type Group = {
    id: string,
    name: string
};

type Groups = {
    id: string,
    group: Group[],
}

// JSON Test Data
var dataSIDs: Array<Subject> = require('./_data/subjects.json');
var dataGIDs: Array<Groups> = require('./_data/groups.json');

type SubsFiltersProps = {
    nes: boolean,
    setNES: Function,

    filters: Filter[],
    setFilters: Function
}

const SubsFilters = (props: SubsFiltersProps) => {
    // input data
    const [siddata, setSIDdata] = useState<Subject[]>(dataSIDs);
    const [giddata, setGIDdata] = useState<Groups | null>(null);

    // inputs
    const [sid, setSID] = useState<string | null>(null);
    const [gid, setGID] = useState<string | null>(null);

    // editor mode
    const [editing, setEditing] = useState<boolean>(false);
    const [SFI, setSFI] = useState<any | null>(null);

    // validation input
    const [msg, setMSG] = useState<string | null>(null);

    // CHANGE
    const changeSID = (sid: string) => {
        setSID(sid);
        changeGIDdata(sid);
        resetGID();
    };
    const changeGID = (_gid: string) => setGID(_gid);
    const changeGIDdata = (sid: string) => setGIDdata(dataGIDs.filter((group) => { return group.id === sid })[0]);
    const changeMSG = (msg: string) => setMSG(msg);
    const changeSFI = (t: any) => setSFI(t);

    // RESET
    const resetSID = () => {
        setSID(null);
        resetGIDdata();
        resetGID();
    };
    const resetGID = () => setGID(null);
    const resetGIDdata = () => setGIDdata(null);
    const resetMSG = () => setMSG(null);
    const resetSFI = () => setSFI(null);

    // EDITING

    const enterEditing = () => setEditing(true);
    const quitEditing = () => {
        resetSID();
        resetGID();
        resetMSG();
        resetSFI();
        //
        setEditing(false);
    };

    // SELECTION HANDLERS

    const handleSelection_SID = (e: SelectChangeEvent) => {
        let _sid = e.target.value as string;
        if (sid !== _sid) {
            changeSID(_sid);
            resetMSG();
        };
    };

    const handleSelection_GID = (e: SelectChangeEvent) => {
        let _gid = e.target.value as string;
        if (gid !== _gid) {
            setGID(_gid);
            resetMSG();
        };
    };

    const handleSelection_SFI = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        let [sid, gid] = e.currentTarget.value.split(",");
        //
        changeSFI(
            {
                sid: sid,
                gid: gid
            }
        );
        //
        enterEditing();
        //
        changeSID(sid);
        changeGID(gid)
    };

    // HANDLE BUTTONS

    const handleSaveChanges = () => {
        if (sid) {
            if (gid) {
                if (props.filters.length > 0) {
                    if (props.filters.some(f => f.sid === sid && f.gid.includes(gid))) {
                        changeMSG("Gleicher Filter existiert bereits!");
                    } else if (props.filters.some(f => f.sid === sid && !f.gid.includes(gid))) {
                        let filter = { sid: sid, gid: [gid] };
                        getFilters().filter(f => f.sid === sid).forEach(f => [...f.gid].forEach(_ => filter.gid.push(_)));
                        //
                        props.setFilters([...getFilters().filter(f => f.sid !== sid), { sid: filter.sid, gid: [...filter.gid] }]);
                        //
                        quitEditing();
                    } else {
                        props.setFilters([...getFilters(), { sid: sid, gid: [gid] }]);
                        //
                        quitEditing();
                    }
                } else {
                    props.setFilters([...getFilters(), { sid: sid, gid: [gid] }]);
                    //
                    quitEditing();
                };
            } else {
                changeMSG("Wähle einen Kurs!");
            };
        } else {
            changeMSG("Wähle einen Fach!");
        };
    };

    const handleDelete = () => {
        props.setFilters([...getFilters()]);
        //
        quitEditing();
    };

    // HELPERS

    const getFilters = (): Filter[] => {
        if (props.filters) {
            if (SFI) {
                let temf: Filter[] = [];
                props.filters.forEach(
                    f => {
                        if (f.sid === SFI.sid) {
                            let gid_s = f.gid.filter(g => g !== SFI.gid);
                            if (gid_s.length > 0) {
                                temf.push({ sid: f.sid, gid: gid_s });
                            }
                        } else {
                            temf.push(f);
                        };
                    }
                );
                return temf;
            } else {
                return props.filters;
            };
        } else {
            return [];
        };
    };

    return (
        <Container disableGutters>
            <List
                sx={{
                    paddingY: "20px",
                    display: "flex",
                    flexWrap: "wrap",
                    padding: "8px",
                }}
            >
                {
                    props.filters.length > 0 ? (
                        <ListItem key={-1} >
                            <Button
                                onClick={() => props.setNES(!props.nes)}
                                startIcon={props.nes ? <ExploreRoundedIcon /> : <ExploreOffRoundedIcon />}
                                color='primary'
                                variant='contained'
                            >
                                {props.nes ? "all subjects" : "strict"}
                            </Button>
                        </ListItem>
                    ) : null
                }
                {
                    props.filters.map(
                        (f, i0) =>
                            <ListItem key={i0} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingX: "16px" }} disablePadding>
                                <IconButton color="inherit" sx={{
                                    marginY: "8px"
                                }}>
                                    <Typography component="div"
                                        width='24px' height='24px'
                                        fontSize='1rem' lineHeight="24px"
                                    >
                                        {f.sid}
                                    </Typography>
                                </IconButton>
                                <Divider orientation="vertical" flexItem variant="fullWidth" sx={{ marginRight: "12px", marginLeft: "4px" }} />
                                <Box sx={{ display: "flex", justifyContent: "end", flexWrap: "wrap", width: "100%" }}>
                                    {
                                        f.gid.map(
                                            (g, i1) => <IconButton
                                                sx={{
                                                    marginY: "8px",
                                                    marginX: "8px"
                                                }}
                                                value={f.sid + "," + g}
                                                color="default"

                                                onClick={
                                                    (e) => handleSelection_SFI(e)
                                                }
                                                key={(i0 * 10 + i1)}
                                            >
                                                <Typography component="div" height="24px" width="24px" fontSize='1rem' lineHeight="24px">
                                                    {g}
                                                </Typography>

                                            </IconButton>
                                        )
                                    }
                                </Box>
                            </ListItem>
                    )
                }

            </List>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    paddingY: "20px",
                    paddingTop: "10px"
                }}
            >
                <Container
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center"
                    }}
                >
                    {
                        editing ? (
                            <Container
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    flexDirection: "column",
                                    alignItems: "center"
                                }}
                            >
                                <div style={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "space-around",
                                    margin: "0 12px"
                                }}
                                >
                                    <FormControl
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.background.default
                                        }}
                                        fullWidth
                                    >
                                        <InputLabel id="subject-select-label">
                                            {"Fach"}
                                        </InputLabel>
                                        <CustomSelect
                                            labelId="subject-select-label"
                                            id="subject-select"
                                            value={sid ? sid : ''}
                                            label="Subject"
                                            onChange={handleSelection_SID}
                                        >
                                            {
                                                siddata.map((s, i0) => {
                                                    return <MenuItem value={s.id} key={i0}>{s.name}</MenuItem>
                                                })
                                            }
                                        </CustomSelect>
                                    </FormControl>
                                    <Divider orientation="vertical" sx={{ padding: "5px" }} />
                                    <FormControl
                                        sx={{
                                            backgroundColor: (theme) => theme.palette.background.default
                                        }}
                                        fullWidth
                                    >
                                        <InputLabel id="subject-select-label">
                                            {"Gruppe"}
                                        </InputLabel>
                                        <CustomSelect
                                            labelId="groups-select-label"
                                            id="groups-select"
                                            value={gid ? gid : ''}
                                            label="Group"
                                            onChange={handleSelection_GID}
                                            disabled={!giddata}
                                        >
                                            {
                                                giddata ? (
                                                    giddata.group.map(
                                                        (g, i0) =>
                                                            <MenuItem value={g.id} key={i0}>
                                                                {g.name}
                                                            </MenuItem>
                                                    )
                                                ) : (
                                                    <MenuItem disabled>
                                                        {"Lädt . . ."}
                                                    </MenuItem>
                                                )
                                            }
                                        </CustomSelect>
                                    </FormControl>
                                </div>
                                <Divider sx={{ margin: "10px" }} flexItem />
                                {
                                    msg ? (
                                        <Typography variant="caption" color="error">
                                            {msg}
                                        </Typography>
                                    ) : (
                                        null
                                    )
                                }
                            </Container>
                        ) : (
                            null
                        )
                    }
                    <Box
                        sx={{
                            marginTop: "10px",
                            display: "flex",
                            justifyContent: editing ? "space-between" : "center",
                            width: "100%",
                        }}
                    >
                        {
                            editing ?
                                <Button
                                    sx={{
                                        visibility: SFI ? "visible" : "hidden",
                                        width: "140px",
                                    }}
                                    color="error"
                                    onClick={
                                        SFI ? handleDelete : undefined
                                    }
                                >
                                    {
                                        SFI ? "löschen" : null
                                    }
                                </Button>
                                : null
                        }
                        <Fab
                            size='small'
                            sx={{
                                transform: editing ? "rotate(45deg)" : "",
                                transition: "all 200ms ease-in-out"
                            }}
                            onClick={editing ? quitEditing : enterEditing}
                            color={editing ? "error" : "info"}
                        >
                            <AddRoundedIcon />
                        </Fab>
                        {
                            editing ? (
                                <Button
                                    color="success"
                                    onClick={handleSaveChanges}
                                    sx={{
                                        width: "140px"
                                    }}
                                >
                                    {
                                        SFI ? "Bestätigen" : "Hinzufügen"
                                    }
                                </Button>
                            ) : (
                                null
                            )
                        }
                    </Box>
                </Container>
            </Box >
        </Container >
    )
};


// CUSTOM STYLES

const CustomSelect = (props: any) => {
    return (
        <Select
            MenuProps={{
                sx: {
                    display: "flex", width: "100%", justifyContent: "center", alignItems: "center"
                },
                BackdropProps: {
                    sx: {
                        backgroundColor: (theme) => alpha(theme.palette.background.default, .98)
                    }
                }
            }}
            {...props}
        >
            {props.children}
        </Select>
    )
};

export { SubsFilters };