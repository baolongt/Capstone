import { Box, Stack } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/layouts/header";
import Sidebar from "./components/layouts/sidebar";
import Dashboard from "./pages/dashboard";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import DocumentManagement from "./pages/document-management";
import UserManagement from "./pages/user-management";
import Setting from "./pages/setting";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import React from "react";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Box>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Header />
          <Stack direction={"row"}>
            <Sidebar />
            <Box flexGrow={1} p={2}>
              <Routes>
                <Route path={"/"} element={<Dashboard />} />
                <Route path={"/documents"} element={<DocumentManagement />} />
                <Route path={"/users"} element={<UserManagement />} />
                <Route path={"/setting"} element={<Setting />} />
              </Routes>
              <ToastContainer
                position="bottom-left"
                autoClose={3000}
                hideProgressBar={true}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
                style={{
                  marginBottom: "24px",
                  marginLeft: "56px",
                }}
              />
            </Box>
          </Stack>
        </BrowserRouter>
      </QueryClientProvider>
    </Box>
  );
};

export default App;