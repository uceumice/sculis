import { useState } from 'react';

import { useNavigate, useLocation } from "react-router-dom";


import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';

import CompareArrowsRoundedIcon from '@mui/icons-material/CompareArrowsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import CalendarTodayRoundedIcon from '@mui/icons-material/CalendarTodayRounded';

type Screen = "/dashboard" | "/calendar" | "/substitution"

const Navi = () => {
    let navigate = useNavigate();
    let location = useLocation();

    const [screen, setScreen] = useState<Screen>(location.pathname as Screen);

    const handleNavigation = (v: Screen) => {
        setScreen(v);
        navigate(v)
    };

    return (
        <BottomNavigation value={screen} onChange={(e, v) => handleNavigation(v)}>
            <BottomNavigationAction label="Kalendar"
                disableRipple
                value="/calendar"
                icon={<CalendarTodayRoundedIcon />}
            />
            <BottomNavigationAction label="Übersicht"
                disableRipple
                value="/dashboard"
                icon={<HomeRoundedIcon />}
            />
            <BottomNavigationAction label="Vertretung"
                disableRipple
                value="/substitution"
                icon={<CompareArrowsRoundedIcon />}
            />
        </BottomNavigation >
    )
}

export { Navi };