import { AppBar, Box, Button, Toolbar} from "@mui/material";
import { Brightness4, Brightness7, ShoppingBag } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Navbar({mode, setMode}) {
    const navigate = useNavigate();
    return(
        <AppBar position="static">
            <Toolbar sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <Box sx={{display: "flex", alignItems: "center",}}>
                    <ShoppingBag fontSize="large" sx={{cursor: "pointer"}} onClick={() => {navigate("/")}}/>
                    <Button color="inherit" sx={{display: {xs:"none", sm: "block"}}} onClick={() => {navigate("/")}}>Home</Button>
                    <Button color="inherit" sx={{display: {xs:"none", sm: "block"}}} onClick={() => {navigate("/products")}}>Products</Button>
                    <Button color="inherit" sx={{display: {xs:"none", sm: "block"}}} onClick={() => {navigate("/products/add")}} >Add Products</Button>
                </Box>
                <Box>
                    <Button color="inherit" onClick={() => {setMode((mode==="light") ? "dark" : "light")}}
                    startIcon={(mode === 'dark') ? <Brightness7 /> : <Brightness4 />}
                    >
                        {(mode==="light")? "dark" : "light"} Mode
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;