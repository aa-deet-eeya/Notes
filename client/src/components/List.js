import React from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import axios from "axios";
import { CSSTransition, TransitionGroup } from "react-transition-group";

class List extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: [],
      loading: false,
    };
  }

  componentDidMount = () => {
    axios.get("/api/notes").then((res) => {
      this.setState(() => {
        return {
          notes: res.data,
          loading: true,
        };
      });
      console.log(this.state.notes)
    });
    
  };

  handleNote = () => {
    const note = prompt("Enter the Note");
    if (note) {
      this.setState((prevState) => ({
        notes: [
          ...prevState.notes,
          {
            title: "something3",
            date: Date.now,
            note: note,
            _id: prevState.notes.length + 1,
          },
        ],
      }));
    
      axios.post('/api/notes', {
          title : "somethingsomething",
          note : note
      })
    }
  };

  onDeleteNote = (id) => {
    this.setState((prevState) => {
      return { notes: prevState.notes.filter((note) => note._id !== id) };
    });
  };

  render() {
    const { notes } = this.state;
    return (
      <>
        <Container>
          <Button color="dark" onClick={this.handleNote}>
            Add Note
          </Button>
          <ListGroup>
            <TransitionGroup className="notes-list">
              {notes.map((note) => {
                return (
                  <CSSTransition key={note._id} timeout={500} classNames="fade">
                    <ListGroupItem>
                      <h1>{note.title}</h1>
                      <p>{note.date}</p>
                      <p>{note.note}</p>
                      <Button
                        className="remove-btn"
                        color="danger"
                        size="sm"
                        onClick={() => this.onDeleteNote(note._id)}
                      >
                        Delete Note
                      </Button>
                    </ListGroupItem>
                  </CSSTransition>
                );
              })}
            </TransitionGroup>
          </ListGroup>
        </Container>
      </>
    );
  }
}

export default List;
