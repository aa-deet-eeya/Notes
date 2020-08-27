import React from 'react'
import { connect } from 'react-redux'
import { getNotes } from '../actions/noteActions'
import PropTypes from 'prop-types'
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
    /*constructor(props) {
        super(props)

        this.state = {
            NotesList : [
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
    }*/

    componentDidMount() {
        this.props.getNotes();
    }

    handleNote = ()=> {
        const note = prompt('Enter the Note') ;
        if(note) {
            this.setState(prevState=>({
                NotesList : [...prevState.NotesList, { 
                    Title : "something3" ,
                    date : Date.now ,
                    Note : note ,
                    id : prevState.NotesList.length + 1
                }]
            }))
        }
    }

    onDeleteNote = (id)=>{
        this.setState(prevState =>{
            return {NotesList : prevState.NotesList.filter(note=> note.id !== id)}
        })
    }

    render() {
        console.log({state : this.state , pro : this.props , this : this })
        const { notes } = this.props.note
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

List.propTypes = {
    getNotes : PropTypes.func.isRequired ,
    notes : PropTypes.object.isRequired
}

const mapStateToProps = (state)=>({
    notes : state.notes
})

export default connect(mapStateToProps, { getNotes }) (List)