import { Box, Typography } from "@mui/material";
import Container from "@mui/material/Container";
import { Route, Routes } from "react-router-dom";
import FinalScreen from "./pages/FinalScreen";
import Questions from "./pages/Questions";
import Settings from "./pages/Settings";
function App() {
  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Typography variant="h2" fontWeight="bold">
                  Quiz App
                </Typography>
                <Settings />
              </>
            }
          />
          <Route path="/settings" element={<Settings />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/scorecard" element={<FinalScreen />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default App;
