import  { useState, useEffect, createContext, useContext } from "react";
import PropTypes from 'prop-types';
import { Xumm } from "xumm"; // Ensure xumm is installed
  
  // Replace with your API key and secret
  const xumm = new Xumm(
    "0c2388da-7eb1-4654-94a1-65f15ebdb394", // API Key
    "402370a8-46c6-4d87-b65b-ff59624f07f6"  // API Secret
  );
  
  
const AccountContext = createContext();

export const useAccount = () => useContext(AccountContext);

export const AccountProvider = ({ children }) => {
AccountProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
  const [account, setAccount] = useState("");
  const [appLoading, setAppLoading] = useState(true);

  const connectAccount = async () => {
    try {
      const authResponse = await xumm.authorize({
        force_network: 'TESTNET' // This forces the use of testnet
      });
      
      if (authResponse.account) {
        setAccount(authResponse.account);
        localStorage.setItem("account", authResponse.account);
      }
  
      console.log('Auth response:', authResponse);
  
      // The SignIn payload creation might not be necessary if using OAuth2
      // Remove if it's causing issues or not needed
      if (xumm?.payload) {
        await xumm.payload
          .create({
            TransactionType: "SignIn",
          })
          .then(payload => {
            console.log(payload);
          });
      }
    } catch (error) {
      console.error("Authorization failed:", error);
    }
  };

  const disconnectAccount = async () => {
    await xumm.logout();
    setAccount("");
    localStorage.removeItem("account");
  };

  useEffect(() => {
    const account = localStorage.getItem("account");
    if (account) setAccount(account);

    setAppLoading(false);

    xumm.user.account.then(a => {
      if (a) {
        setAccount(a);
        localStorage.setItem("account", a);
      }
    });
  }, []);

  return (
    <AccountContext.Provider
      value={{
        account,
        appLoading,
        connectAccount,
        disconnectAccount,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};