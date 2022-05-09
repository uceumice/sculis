import { Paper } from '@mui/material';

import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';

import { PinkDark, PinkLight } from './app/themes/PinkDark';
import { ThemeProvider } from '@mui/material/styles';
import { useLocalStorageState } from './app/hooks';


import { Dash } from './app/components/dash/dash';
import { Subs } from './app/components/subs/subs';
import { Cale } from './app/components/cale/cale';
import { Navi } from './app/components/navi/navi';



export type SculisTheme = "light" | "dark"


export default function App() {
  const [theme, setTheme] = useLocalStorageState<SculisTheme>("dark", "theme");

  const themeSwitch = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <ThemeProvider theme={theme === 'light' ? PinkLight : PinkDark}>
      <Paper className='fixed
        w-full h-full
        flex flex-col
        select-none'
      >
        <div style={{ display: "contents" }}>
          <Routes>
            <Route
              path='dashboard'
              element={<Dash themeSwitch={themeSwitch} />}
            />
            <Route
              path='substitution'
              element={<Subs />}
            />
            <Route
              path='calendar'
              element={<Cale />}
            />
            {/* redirect */}
            <Route
              path='/'
              element={<Navigate to="/dashboard" />}>
            </Route>
            <Route
              path='*'
              element={<Navigate to="/dashboard" replace />}>
            </Route>
          </Routes>
          <Navi />
        </div>
        
      </Paper>
    </ThemeProvider>
  );
};
