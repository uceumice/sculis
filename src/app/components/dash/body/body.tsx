import {
    Box,
    Container,
    Divider,
    List,
    ListItem,
    Paper,
    Typography
} from '@mui/material';

// animation
import Zoom from 'react-reveal/Zoom'

// cards
import DevelopmentNotice from './cards/Vorwort';
import Introduction from './cards/Introduction';
import NotMobileWarning from './cards/NotMobileWarning';
import TutorialNavigation from './cards/DetailNavigation';
import TutorialDashboard from './cards/DetailTheme';
import TutorialSubstDates from './cards/DetailSubstDates';


//icons
import NavigateNextRoundedIcon from '@mui/icons-material/NavigateNextRounded';
import { GitHubLogo } from '../../_coms/components';

const Body = () => {
    return (
        <Paper sx={{ borderRadius: 0, overflowY: "auto", height: "100%" }}>
            <Container disableGutters sx={{ userSelect: "text" }}>

                <List
                    sx={{
                        margin: 0,
                        padding: 0
                    }}
                >

                    <Zoom opposite cascade>
                        <ListItem>
                            <NotMobileWarning />
                        </ListItem>

                        <Paper
                            sx={{
                                borderRadius: 0,
                                display: "flex",
                                flexDirection: "row",
                            }}
                        >
                            <Container
                                sx={{
                                    // background: (theme) => theme.custom.gradients.button,
                                    borderImageSource: (theme) => theme.custom.gradients.button,
                                    alignItems: "center",
                                    display: "flex"
                                }}
                            >
                                <Typography align="left" component="div" variant="body2" fontFamily="monospace">
                                    Hier geht's zum GitHub
                                </Typography>
                            </Container>
                            <Divider sx={{
                                borderImageSlice: "1",
                                borderImageSource: (theme) => theme.custom.gradients.button,
                                marginY: "5px"
                            }}
                                orientation="vertical"
                                flexItem
                            />
                            
                            <Box sx={{ margin: "5px" }}>
                                <GitHubLogo to="https://github.com/uceumice" />
                            </Box>
                        </Paper>



                        <ListItem>
                            <Introduction />
                        </ListItem>

                        <ListItem>
                            <DevelopmentNotice />
                        </ListItem>

                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />
                        <Typography align="center">
                            {"⚗️                🔭              🔬                  🕳 "}
                        </Typography>
                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />

                        <ListItem>
                            <TutorialNavigation />
                        </ListItem>

                        <ListItem>
                            <TutorialDashboard />
                        </ListItem>

                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />
                        <Typography align="center">
                            {" Was ist hier neu zu sehen? . . . 🧑‍🔬 ✨ "}
                        </Typography>
                        <Typography align="center" variant="caption" component="div" color="text.secondary">
                            {" Stand 3. März "}
                        </Typography>
                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />

                        <ListItem>
                            <TutorialSubstDates />
                        </ListItem>

                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />
                        <Typography align="center">
                            {" Es folgt mehr . . . 🕳 "}
                        </Typography>
                        <Divider sx={{
                            borderImageSlice: "1",
                            borderImageSource: (theme) => theme.custom.gradients.button,
                            marginY: "20px"
                        }} />
                    </Zoom>
                </List >
            </Container >
        </Paper>
    );
};

export { Body };