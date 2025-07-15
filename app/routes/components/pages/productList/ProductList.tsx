import { Button } from "@mui/material";
import { useNavigate } from "react-router";

export default function ProductList() {

    const navigate = useNavigate()
    const handleClick = () => {
        navigate('/products/addProduct')
    }

    return (
        <div>
            <header className="flex justify-end">
                <Button variant="contained" onClick={handleClick}>Add Product</Button>
            </header>
        </div>
    )
}