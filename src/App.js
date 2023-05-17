import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import { useState } from "react";
import { Paper, ThemeProvider, createTheme } from "@mui/material";
import { ProductProvider } from "./context/ProductContext";
import ProductList from "./components/ProductList";

function App() {
  const [mode, setMode] = useState("dark");

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <ProductProvider>
          <Paper elevation={3} sx={{minHeight: "100vh", borderRadius: "0"}}>
            <Navbar mode={mode} setMode={setMode} />

            <Routes>
              <Route path="/" element={<ProductList />}></Route>
              <Route path="/products" element={<ProductList />}></Route>
              <Route path="/products/add" element={<AddProduct />}></Route>
              <Route path="/products/edit/:id" element={<EditProduct />}></Route>
            </Routes>
          </Paper>
        </ProductProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
