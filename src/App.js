import react, { useState, useEffect } from "react";
import axios from "axios";
import './App.modules.css';

const BASE_URL = "http://localhost:5000/api";

function App() {
  const [todos, setTodos] = useState(null);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    getTodos();
  },[]);


  const getTodos = () => {
    axios
    .get(`${BASE_URL}/todos`)
    .then((res) => setTodos(res.data))
    .catch((err) => console.error(err));

  }
  const handleAddTodo = () => {
    axios
    .post(`${BASE_URL}/todo/new`, {
      title: "i'm a software engineer"
    })
    .then((res) => {
      setTodos([...todos,res.data]);
      setTodo("");

    })
    .catch((err) => console.error(err));
  }

  const handleDeleteTodo = (id) => {
    axios
    .delete(`${BASE_URL}/todo/delete/${id}`)
    .then((res) => {
      setTodos(todos.filter((todo) => todo._id !== res.data._id))

    })
    .catch((err) => console.error(err));
  }

  const handleTodoClick = (id) => {
    axios
    .get(`${BASE_URL}/todo/toggleStatus/${id}`)
    .then((res) => getTodos())
    .catch((err) => console.error(err));
  }
  return (
    <div className="App">
      <div className="todo-input-wrapper">
        <input
        className="todo-input-bar"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder='Add a new todo'
        />
        <div className="add-button" onClick={handleAddTodo}>
          +
        </div>

      </div>


      <div className="todos-list">
        {!todos || !todos.length ? (
          <h3 style={{textAlign: "center"}}>No Todos Found</h3>

        ):(
          todos.map((todo) => (
            <div className="todo" key={todo._id}>
              <span
              onClick={() => handleTodoClick(todo._id)}
              className={todo.complete ? "complete" : ""}
              id='todo-title'
              >
                {todo.title}
              </span>
              <span
              className="delete"
              onClick={() => handleDeleteTodo(todo._id)}
              >
              <butto>delete</butto>

              </span>
            </div>
          ))
        )} 

      </div>
    </div>
  );
}

export default App;
