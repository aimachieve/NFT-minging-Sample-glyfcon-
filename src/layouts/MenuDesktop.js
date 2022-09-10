import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
// material
import {
  Stack,
  Container,
  Typography,
  Link,
  Paper,
  Menu,
  MenuItem,
  Box,
  Button,
  IconButton
} from "@mui/material";
import { styled } from "@mui/styles";
import ConnectButton from "components/ConnectButton";
// import Whitepaper from "./whitepaper.pdf";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Logo from "components/Logo";
import { Icon } from "@iconify/react";
import discordIcon from "@iconify/icons-cib/discord";
import twitter from "@iconify/icons-cib/twitter";
import linkedin from "@iconify/icons-cib/linkedin";
import instagram from "@iconify/icons-cib/instagram";
import telegram from "@iconify/icons-cib/telegram";
import SettingMode from "components/settings/SettingMode";
import menuConfig from "./MenuConfig";
// ----------------------------------------------------------------------

const LinkStyle = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  fontWeight: 900,
  letterSpacing: 2,
  fontSize: 20,
  padding: 8,
  border: "3px solid transparent",
  color: "white",
  cursor: "pointer",
  transition: "all 0.3s",
  "&:hover": { color: "yellow", borderBottom: "3px solid yellow" }
}));

// ----------------------------------------------------------------------

export default function MainNavbar() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={5}
      sx={{ width: 1, position: "relative", zIndex: 9, mt: 4 }}
    >
      <Logo sx={{ width: 160 }} />
      <Stack direction="row" alignItems="center" spacing={3}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <IconButton
            href="https://www.instagram.com/gyrfalcon.nft/"
            target="_blank"
          >
            <Icon icon={instagram} color="white" />
          </IconButton>
          <IconButton href="https://discord.gg/9V7j3fTDAB" target="_blank">
            <Icon icon={discordIcon} color="white" />
          </IconButton>
          <IconButton href="https://t.me/gyrfalconnft" target="_blank">
            <Icon icon={telegram} color="white" />
          </IconButton>
          <IconButton href="https://twitter.com/gyrfalconNft" target="_blank">
            <Icon icon={twitter} color="white" />
          </IconButton>
        </Stack>
        <ConnectButton />
      </Stack>
    </Stack>
  );
}
