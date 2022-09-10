import { useState } from "react";
import { Button, Box, Stack, Typography, Hidden } from "@mui/material";
import { useWeb3React } from "@web3-react/core";
import useAuth from "hooks/useAuth";
import WalletModal from "./WalletModal";
import LogoutModal from "./LogoutModal";
import { ethers } from "ethers";

// export function BusdBalance() {
//   const { account } = useEthers();
//   const busdBalanceBigNumber = useTokenBalance(BusdAddress, account);
//   const busdBalance =
//     busdBalanceBigNumber && ethers.utils.formatUnits(busdBalanceBigNumber, 18);
//   return busdBalance;
// }

export default function ConnectButton({ sx }) {
  const { account } = useWeb3React();
  console.log("account", account);
  const [openLogin, setOpenLogin] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const { login, logout } = useAuth();

  const handleOpenLogin = () => {
    setOpenLogin(true);
  };
  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  const handleOpenLogout = () => {
    setOpenLogout(true);
  };
  const handleCloseLogout = () => {
    setOpenLogout(false);
  };

  return (
    <>
      {account ? (
        <>
          <Button
            onClick={handleOpenLogout}
            variant="outlined"
            color="secondary"
            sx={{
              borderRadius: 1,
              height: 52,
              fontSize: 20
            }}
          >
            {`${account.slice(0, 5)}...${account.slice(-5)}`}
          </Button>
        </>
      ) : (
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleOpenLogin}
          sx={{
            borderRadius: 1,
            height: 52,
            fontSize: 20
          }}
        >
          Connect Wallet
        </Button>
      )}

      <WalletModal login={login} open={openLogin} onClose={handleCloseLogin} />
      <LogoutModal
        logout={logout}
        open={openLogout}
        onClose={handleCloseLogout}
      />
    </>
  );
}
