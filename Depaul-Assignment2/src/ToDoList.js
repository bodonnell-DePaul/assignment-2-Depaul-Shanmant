import React, { useState } from 'react';
import { ListGroup, Tab, Row, Col, Container, Form, Button } from 'react-bootstrap';
import { todos } from './todoItems'; // Import the static array
import './ToDoList.css'; // Ensure you have this file

const ToDoList = () => {
  const [todoItems, setTodoItems] = useState(todos); // Static array initialized

  const getVariant = (dueDate) => {
    const currentDate = new Date();
    const dueDateObj = new Date(dueDate);
    const diffTime = Math.abs(dueDateObj - currentDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays > 7) return 'primary';
    if (diffDays <= 7 && diffDays > 4) return 'success';
    if (diffDays <= 4 && diffDays > 2) return 'warning';
    return 'danger';
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    const { newTodo, newDueDate } = event.target.elements;

    const newTodoItem = {
      title: newTodo.value,
      description: 'Lorem ipsum dolor sit amet...', // Placeholder description
      dueDate: newDueDate.value,
    };

    setTodoItems((prevItems) => [...prevItems, newTodoItem]);
    event.target.reset(); // Reset form after submission
  };

  return (
    <Container className="todo-container">
      <h1 className="todo-header">Assignment 2: ToDo List</h1>
      <Row>
        <Col sm={4}>
          <Form onSubmit={handleAddTodo} className="todo-form">
            <Form.Group controlId="newTodo">
              <Form.Label>ToDo Item</Form.Label>
              <Form.Control  type="text" placeholder="Add todo item" required />
            </Form.Group>
            <Form.Group controlId="newDueDate">
              <Form.Label htmlFor="newDueDate">Due Date</Form.Label> 
              <Form.Control id="newDueDate" type="date" required />
            </Form.Group>
            <Button variant="primary" type="submit" className="add-todo-btn">
              Add Todo
            </Button>
          </Form>
        </Col>
        <Col sm={8}>
          <Row>
            <Tab.Container defaultActiveKey="#todo0">
              <Col sm={4}>
                <ListGroup className="todo-list" role="tablist">
                  {todoItems.map((todo, index) => (
                    <ListGroup.Item
                      key={index}
                      action
                      href={`#todo${index}`}
                      variant={getVariant(todo.dueDate)}
                      role="tab"
                    >
                      {todo.title}
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Col>
              <Col sm={8}>
                <Tab.Content>
                  {todoItems.map((todo, index) => (
                    <Tab.Pane eventKey={`#todo${index}`} key={index} role="tabpanel">
                      <p contentEditable="true">{todo.description}</p>
                      <Form.Group controlId={`dueDate${index}`}>
                        <Form.Control  type="date" defaultValue={todo.dueDate} />
                      </Form.Group>
                    </Tab.Pane>
                  ))}
                </Tab.Content>
              </Col>
            </Tab.Container>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ToDoList;
