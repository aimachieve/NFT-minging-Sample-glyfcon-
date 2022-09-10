import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Typography
} from "@mui/material";
import { useBearContract } from "hooks/useContract";
import { getErrorMessage } from "utils/getErrorMessage";
import { parseEther } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";
import ReactAudioPlayer from "react-audio-player";

import Hero from "./HomeComponents/Hero";
import Faq from "./HomeComponents/Faq";

export default function Homepage() {
  const { account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const BearContract = useBearContract();

  return (
    <Box>
      <Hero />
      {/* <Faq /> */}
      {/* <ReactAudioPlayer src="deep-jungle.mp3" controls muted autoplay loop/> */}
    </Box>
  );
}
