import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Link,
  Tabs,
  Tab,
  Fab,
  ButtonGroup
} from "@mui/material";
import LinearProgress, {
  linearProgressClasses
} from "@mui/material/LinearProgress";
import Slider, { SliderThumb } from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ConnectButton from "components/ConnectButton";
import { useBearContract } from "hooks/useContract";
import { getErrorMessage } from "utils/getErrorMessage";
import { parseEther, _fetchData } from "ethers/lib/utils";
import { useSnackbar } from "notistack";
import { ethers } from "ethers";
import { varFadeInUp, MotionInView, varFadeInDown } from "components/animate";
import { getProofForAddress, getMerkleRoot, getVerify } from "utils/whitelist";

export default function Hero() {
  const [currentAddress, setCurrentAddress] = useState();
  const [mintAmount, setMintAmount] = useState(1);
  const [verified, setVerified] = useState();
  const [value, setValue] = useState(0);
  const { account } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const BearContract = useBearContract();
  const [isPresale, setIsPresale] = useState(false);

  const price = isPresale ? 0.2 : 0.25;
  const handleMintAmount = (type) => {
    if (type === "plus") {
      if (mintAmount < 20) setMintAmount(mintAmount + 1);
    } else {
      if (mintAmount > 1) setMintAmount(mintAmount - 1);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleMint = async () => {
    console.log("Root", getMerkleRoot());
    console.log("Proof", getProofForAddress(account));

    try {
      const txOptions = {
        value: ethers.utils.parseEther(
          (mintAmount * price).toFixed(2).toString()
        )
      };
      if (isPresale) {
        const tx = await BearContract.whitelistMint(
          mintAmount,
          getProofForAddress(account),
          txOptions
        );
        await tx.wait();
      } else {
        const tx = await BearContract.mint(mintAmount, txOptions);
        await tx.wait();
      }

      enqueueSnackbar("Minted successfully!", {
        variant: "success"
      });
    } catch (error) {
      console.log("[ERROR]:", error.error);
      enqueueSnackbar(getErrorMessage(error.error), {
        variant: "error"
      });
    }
  };

  const handleVerify = (address) => {
    const verified = getVerify(address);
    setVerified(verified);
    if (verified) {
      enqueueSnackbar("You are whitelisted!", {
        variant: "success"
      });
    } else {
      enqueueSnackbar("You are not whitelisted!", {
        variant: "error"
      });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const isPublic = await BearContract.OpenToPublic();
      console.log("IsPresale", isPublic);
      setIsPresale(!isPublic);
    }
    fetchData();
  });

  return (
    <Stack sx={{ mt: { xs: 0, md: -10 }, position: "relative" }}>
      <Stack
        sx={{ position: "relative", height: { md: "100vh", xs: "inherit" } }}
      >
        <Stack sx={{ width: 1, position: "relative" }}>
          <video width="100%" autoPlay loop muted>
            <source src="/assets/promo_video/main.mp4" />
          </video>
        </Stack>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ position: "absolute", height: 1, width: 1 }}
        >
          <MotionInView variants={varFadeInUp}>
            <Stack alignItems="center">
              <Typography fontSize={{ xs: 40, md: 140 }} color="white">
                GYRFALCON
              </Typography>
              <Typography fontSize={{ xs: 20, md: 80 }} mt={{ xs: 1, md: 5 }}>
                Get Your Race NFT
              </Typography>
            </Stack>
          </MotionInView>
        </Stack>
      </Stack>
      <Container maxWidth="lg" sx={{ mt: { xs: 0, md: 20 }, pb: 20 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={15} mt={10}>
          <Box flex={1} sx={{ position: "relative", borderRadius: 2 }}>
            <Stack sx={{ width: { xs: 0.8, md: 1 }, margin: "auto" }}>
              <video
                width="100%"
                autoPlay
                loop
                muted
                style={{ borderRadius: "20px" }}
              >
                <source src="/assets/promo_video/3.mp4" />
              </video>
            </Stack>
          </Box>

          <Stack
            alignItems="center"
            justifyContent="center"
            flex={1}
            spacing={3}
          >
            <Stack spacing={3}>
              <Typography variant="h4" textAlign="center">
                Welcome to the Power of the Falcons, The Era of Play to Earn
              </Typography>
              <Typography sx={{ fontSize: 20 }}>
                The falcons are out of the nest and are ready for you. Time for
                battles to run the world and for Falcons to make their Alfas
                proud.
              </Typography>
              <Typography sx={{ fontSize: 20 }}>
                Mint your Gyrfalcon NFT today at 0.2 ETH and join the community
                for the first P2E falcon racing game, enter weekly raffle draws
                for trips and get tokens to reach the moon
              </Typography>
            </Stack>

            <Stack spacing={3}>
              {isPresale ? (
                <Stack alignItems="center">
                  <Typography variant="h5" textAlign="center">
                    Now is Pre-sale
                  </Typography>
                  <Box sx={{ width: 1, height: "1px", bgcolor: "white" }} />
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleVerify(account)}
                    sx={{ mt: 1 }}
                  >
                    Check your whitelist
                  </Button>
                </Stack>
              ) : (
                <Typography variant="h5">Now is Public sale</Typography>
              )}

              <ButtonGroup size="large" color="secondary" sx={{ height: 50 }}>
                <Button onClick={() => handleMintAmount("minus")}>-</Button>
                <Button sx={{ width: 140 }}>{mintAmount}</Button>
                <Button onClick={() => setMintAmount(20)}>MAX</Button>
                <Button onClick={() => handleMintAmount("plus")}>+</Button>
              </ButtonGroup>
              <Typography textAlign="center">
                Total: {price * mintAmount} ETH
              </Typography>
              <Button
                sx={{ maxWidth: 400, width: 1, height: 50, fontSize: 26 }}
                variant="contained"
                color="secondary"
                onClick={handleMint}
              >
                MINT
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
