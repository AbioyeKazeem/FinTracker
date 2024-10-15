import React from "react";
import { Container } from "react-bootstrap";

const Footer=()=>{
    const currentYear = new Date().getFullYear();
    const owner = "2Skillz"
    return (
        <footer className="foot text-white text-center py-3">
         <Container>
            
            <p>&copy;{owner} {currentYear} </p>
         </Container>
        </footer>
    )
}
export default Footer;