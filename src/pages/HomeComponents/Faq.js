import { useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import {
  Container,
  Box,
  Stack,
  TextField,
  Button,
  Typography,
  Link
} from "@mui/material";

import { styled, alpha } from "@mui/material/styles";

import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Faqs } from "./Texts";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  marginBottom: "15px",
  backdropFilter: "blur(80px)",
  borderRadius: 2,
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={
      <KeyboardArrowDownIcon sx={{ fontSize: "2rem", color: "#97c7ff" }} />
    }
    {...props}
  />
))(({ theme }) => ({
  borderRadius: "6px",
  background: '#007bff',
  paddingLeft: "55px",
  paddingRight: "30px",
  textAlign: 'center',
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(180deg)"
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  margin: "0px 55px",
  padding: 0,
  paddingBottom: 20
}));


export default function Hero() {
  const [number, setNumber] = useState(1);
  const { account } = useWeb3React();
  const [expanded, setExpanded] = useState("panel1");
  const [currentRarity, setCurrentRarity] = useState("common");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <Stack sx={{ py: 10 }} id="faq">
      <Container maxWidth="md">
        <Typography align="center" color="#212529" sx={{ fontFamily: 'Cheddar', fontSize: 100, mb: 5 }}>
          FAQ
        </Typography>
        {Faqs.map((item, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index + 1}`}
            onChange={handleChange(`panel${index + 1}`)}
          >
            <AccordionSummary>
              <Typography textAlign="center" fontSize={20} color="white">{item.q}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography sx={{ whiteSpace: "pre-line", py: 2 }} fontSize={20}>
                {item.a}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Container>
    </Stack>
  );
}
