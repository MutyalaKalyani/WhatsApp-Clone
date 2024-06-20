import React, { useContext, useEffect } from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import Chatdialog from "./Chatdialog";
import { AccountContext } from "./Contextapi/Accountprovider";
import Signinpage from "./Authpage_v2_component/signinpage";

// Styled components for styling the Messenger component
const Component = styled(Box)`
  height: 100vh;
  background: #dcdcdc;
`;

const Header = styled(AppBar)`
  background-color: #00a884;
  height: 6rem;
  box-shadow: none;
`;

// Functional component representing the Messenger
const Messenger = () => {
  const { account } = useContext(AccountContext);

  return (
    // If account exists, then show Chat page; otherwise, show SignIn page
    account ? (
      <>
        <Component>
          <Header>
            <Toolbar></Toolbar>
          </Header>
          <Chatdialog /> {/* Chat page when user is logged in */}
        </Component>
      </>
    ) : (
      <>
        <Signinpage /> {/* Sign-in page when user is not logged in */}
      </>
    )
  );
};

export default Messenger;
