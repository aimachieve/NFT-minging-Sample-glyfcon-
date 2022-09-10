import { Stack, Box, Typography, Container, IconButton } from "@mui/material";
import { Icon } from "@iconify/react";
import discordIcon from "@iconify/icons-cib/discord";
import twitter from "@iconify/icons-cib/twitter";
import linkedin from "@iconify/icons-cib/linkedin";
import instagram from "@iconify/icons-cib/instagram";
import telegram from "@iconify/icons-cib/telegram";
import menuConfig from "./MenuConfig";
import { Link as ScrollLink } from "react-scroll";
export default function MainFooter() {
  return (
    <Stack
      textAlign="center"
      sx={{
        pb: 2,
        py: 8
        // backgroundImage: "url(/images/bg.svg)",
        // backgroundSize: "100% 100%",
        // backgroundPosition: "left 200px",
        // backgroundRepeat: "no-repeat"
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={1}>
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

          <Typography variant="caption">
            COPYRIGHT ©GYRFALCON. ALL RIGHTS RESERVED.
          </Typography>
        </Stack>
      </Container>
    </Stack>
  );
}
