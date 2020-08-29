import React from 'react'
import { 
    Collapse ,
    Container ,
    Navbar ,
    NavbarToggler ,
    NavbarBrand ,
    Nav ,
    NavLink, 
    NavItem,
} from 'reactstrap'

class NavbarComponent extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isOpen : false 
        }
    }

    toggle = ()=>{
        this.setState({
            isOpen : !this.state.isOpen
        })
    }

    render() {
        return (
            <>
                <Navbar 
                    color="dark" 
                    dark 
                    expand="sm" 
                    className="mb-5">
                        <Container>
                            <NavbarBrand href="/">Notes</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />
                            <Collapse isOpen={this.state.isOpen} navbar>
                                <Nav className="ml-auto" navbar>
                                    <NavItem>
                                        <NavLink href="http://localhost:3000/">Home</NavLink>
                                    </NavItem>
                                </Nav>
                            </Collapse>
                        </Container>
                </Navbar>
            </>
        )
    }
}

export default NavbarComponent