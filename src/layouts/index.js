import { useLocation, Outlet } from "react-router-dom";
import { Box, Hidden } from "@mui/material";
//
import MainNavbar from "./MainNavbar";
import MainFooter from "./MainFooter";

// ----------------------------------------------------------------------

export default function MainLayout() {
  return (
    <>
      <Box
        sx={{
          background: "url(/assets/backgrounds/1.png)",
          backgroundSize: "cover"
        }}
      >
        <MainNavbar />
        <Box>
          <Outlet />
        </Box>
        <MainFooter />
      </Box>
    </>
  );
}
