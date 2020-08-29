import React from 'react'
import {
    Container ,
    ListGroup ,
    ListGroupItem ,
    Button
} from 'reactstrap'

import {
    CSSTransition ,
    TransitionGroup
} from 'react-transition-group'

class List extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            notes : [
                {
                    Title : "something" ,
                    date : Date.now ,
                    Note : "Lore ipsum something something" ,
                    id : 1
                }, {
                    Title : "something2" ,
                    date : Date.now ,
                    Note : "Lore ipsum something something2" ,
                    id : 2
                }
            ] ,
        }
    }

    handleNote = ()=> {
        const note = prompt('Enter the Note') ;
        if(note) {
            this.setState(prevState=>({
                notes : [...prevState.notes, { 
                    Title : "something3" ,
                    date : Date.now ,
                    Note : note ,
                    id : prevState.notes.length + 1
                }]
            }))
        }
    }

    onDeleteNote = (id)=>{
        this.setState(prevState =>{
            return {notes : prevState.notes.filter(note=> note.id !== id)}
        })
    }

    render() {
        const { notes } = this.state
        return (
            <>
                <Container>
                    <Button color="dark" onClick={this.handleNote}>Add Note</Button>
                    <ListGroup>
                        <TransitionGroup className="notes-list">
                            {notes.map((note)=>{
                                return <CSSTransition key={note.id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        <h1>{note.Title}</h1>
                                        <p>{note.date}</p>
                                        <p>{note.Note}</p>
                                        <Button 
                                            className="remove-btn" 
                                            color="danger"
                                            size="sm"
                                            onClick={()=>this.onDeleteNote(note.id)}
                                        >Delete Note</Button>
                                    </ListGroupItem>
                                </CSSTransition>
                            })}
                        </TransitionGroup>
                    </ListGroup>
                </Container>
            </>
        )
    }
}

export default List