/* eslint-disable no-unused-vars */
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <Box
        sx={{ flexGrow: 1 }}
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <AppBar position="fixed">
          <Toolbar
            style={{
              backgroundColor: "#17594A",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              Chat App
              <Button
                color="inherit"
                style={{ marginLeft: 40 }}
                onClick={() => {
                  navigate("/");
                }}
              >
                Home
              </Button>
              {isLoggedIn ? (
                <Button
                  color="inherit"
                  style={{ display: "flex", alignItems: "center", gap: 5 }}
                  onClick={() => {
                    handleLogout();
                  }}
                >
                  Sign out
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                    onClick={() => {
                      navigate("/register");
                    }}
                  >
                    Register
                  </Button>
                  <Button
                    color="inherit"
                    style={{ display: "flex", alignItems: "center", gap: 5 }}
                    onClick={() => {
                      navigate("/login");
                    }}
                  >
                    Log In
                  </Button>
                </>
              )}
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default Navbar;
