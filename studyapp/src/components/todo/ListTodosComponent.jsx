import { useEffect, useState } from "react";
import { Button, Col, Container, Dropdown, Row, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { DeleteTodoReminderApi, deleteTodoApi, retrieveAllTodosForUsernameApi, setTodoReminderApi } from "./api/TodoApiService";
import { useAuth } from "./security/AuthContext";
export function formatDate(date) {
    const year = date[0]
    const month = parseInt(date[1]) < 10 ? ('0'+date[1]) : date[1]
    const day = parseInt(date[2]) < 10 ? ('0'+date[2]) : date[2]
    return (year+'-'+month+'-'+day)
}
function ListTodosComponent() {
    const today = new Date();
    const authContext = useAuth()
    const username = authContext.username
    const navigate = useNavigate()
    const targetDate = new Date(today.getFullYear() + 12, today.getMonth(), today.getDay());
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null) 
    const [reminder, setReminder] = useState(null)

    useEffect(
        () => refreshTodos(), []
    )
    function refreshTodos() {
        retrieveAllTodosForUsernameApi(username)
            .then(response => {
                console.log(response)
                setTodos(response.data)
            })
            .catch(error => console.log(error))
    }

    function deleteTodo(id) {
        deleteTodoApi(username, id)
        .then(
            () => {
                // 1. display message
                // 2. update todos list
                setMessage(`Deletion of todo with id: ${id}`)
                refreshTodos()
            }


        )
        .catch(error => console.log(error))
        console.log(id)
    }

    function updateTodo(id) {
        navigate(`/todo/${id}`)
    }
    function addNewTodo() {
        navigate(`/todo/-1`)
    }
    return (
    //     <Container>
    //         <h1>Things you want to do.</h1>
    //         <hr></hr>
    //             {message && <div className="alert alert-warning">{message}</div>}
    //             <Table striped bordered hover>
    //                 <thead>
    //                     <tr>
    //                     <th>Description</th>
    //                     <th>Target Date</th>
    //                     <th>Delete</th>
    //                     <th>Update</th>
    //                     </tr>
    //                 </thead>
    //                 <tbody>
    //                 {todos.map((todo)=>{
    //                     return (
    //                         <tr key={todo.id}>
    //                             <td>{todo.description}</td>
    //                             <td>{formatDate(todo.targetDate)}</td>
    //                             <td><Button className="btn-danger" onClick={()=>{deleteTodo(todo.id)}}>&#x2715;</Button></td>
    //                             <td><Button className="btn-primary" onClick={()=>{updateTodo(todo.id)}}><span style={{fontSize:'18px'}}>&#9998;</span></Button></td>
    //                         </tr>
    //                     )
    //                 }
    //                 )
    //             }
    //   </tbody>
    // </Table>
    // <Button className="button-primary m-3" onClick={addNewTodo}>Add Todo</Button>
    // </Container>
    <div>
    <br></br>
    <h1 style={{'fontSize':'50px', 'color':'#1A7CFA'}}>Your Tasks</h1>
    <br></br>
    <p className="p-button">
        <div className="circular-button mb-2" onClick={addNewTodo} style={{'marginRight':'20px'}}> + </div>
    </p>
    <div style={{'display':'flex', 'flex-direction':'row', 'justifyContent':'center'}}>
    </div>
    <div style={{'display':'flex','justifyContent':'center'}}>
            <Container>
            <Row>
                <Col><h2>Description</h2></Col>
                <Col><h2>Target Date</h2></Col>
                <Col><h3>Settings</h3></Col>
            </Row>
            <hr></hr>
            <br></br>

            {todos.map((todo)=> (
                    <div key={todo.id} style={{'backgroundColor':'#feeeef', 'borderRadius':'10px', 'margin':'10px'}}>
                    <Row>
                    <Col>
                    <span style={{'fontSize':'20px', 'marginRight':'20px'}}>{todo.description}</span>
                    </Col>
                    <Col>
                    <span style={{'fontSize':'20px'}}>{formatDate(todo.targetDate)}</span>
                    </Col>
                    <Col>
                    <Dropdown>
                        <Dropdown.Toggle id="dropdown-button-light-example1" variant="white">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16"> <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/> <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/> </svg>
                        </Dropdown.Toggle>

                        <Dropdown.Menu variant="light">
                        <Dropdown.Item onClick={()=>{updateTodo(todo.id)}}>Edit</Dropdown.Item>
                        <Dropdown.Item onClick={()=>{deleteTodo(todo.id)}}>Delete Todo</Dropdown.Item>
                        {console.log(todo.reminder)}
                        {todo.reminder ? 
                        (<Dropdown.Item onClick={()=>{DeleteTodoReminderApi(username, todo.id)}}>Delete Reminder</Dropdown.Item>)
                        :
                        (<div>
                            {/* setTodoReminderApi(username, todo.id, "daily", "omrman4@gmail.com"); setReminder("daily") */}
                            <Dropdown.Item onClick={()=>{navigate(`/reminder/daily/${todo.id}`)}}>Add Daily Reminder</Dropdown.Item>
                            {/* setTodoReminderApi(username, todo.id, "weekly", "omrman4@gmail.com"); setReminder("weekly") */}
                            <Dropdown.Item onClick={()=>{navigate(`/reminder/weekly/${todo.id}`)}}>Add Weekly Reminder</Dropdown.Item>
                         </div>)
                        }
                        </Dropdown.Menu>
                    </Dropdown>
                    </Col>
                    </Row>
                    <br></br>

                    </div>
                ))}
                </Container>

        </div>    
    </div>
    )
}

export default ListTodosComponent;