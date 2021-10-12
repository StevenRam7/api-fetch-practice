import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [todos, setTodos] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [buttonType, setButtonType] = useState("");
  const userpage = "http://jsonplaceholder.typicode.com/users";
  const todopage = "http://jsonplaceholder.typicode.com/todos";
  document.title = "Users & To-Do Lists";
  let time = Date.now();

  useEffect(() => {
    const abortController = new AbortController();
    async function loadUsers() { try{
      const response = await fetch(userpage, { signal: abortController.signal });
      const usersFromAPI = await response.json();
      setUsers(usersFromAPI);
    } catch(error) {
      console.log("Error!");
      throw error;
    }
  }
    loadUsers();
    return () => {
      console.log("Cleanup1");
      return abortController.abort();
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    async function loadTodos() { try{
      const response = await fetch(todopage, { signal: abortController.signal });
      const todosFromAPI = await response.json();
      setTodos(todosFromAPI);
    } catch(error) {
      console.log("Error!");
      throw error;
    }
  }
    loadTodos();
    return () => {
      console.log("Cleanup2");
      return abortController.abort();
    }
  }, [currentUser]);

  //console.log(users, todos, buttonType);
  let usersX = users.slice(0, 9);

  return (
    <div className="App">
      <h1>Users {"&"} To-Do Lists</h1>
      {usersX.map((user) => (
        <div>
          <h3>{user.name}</h3>
          {/*3 different buttons added*/}
          <button onClick={() => setCurrentUser(user.name)}>See Details</button>
          <button onClick={() => setCurrentUser(user.id) + setButtonType("C")}>
            Completed To-Dos
          </button>
          <button onClick={() => setCurrentUser(user.id) + setButtonType("I")}>
            Incomplete To-Dos
          </button>
          {/*Personal info for each user*/}
          {currentUser === user.name && (
            <div className="details">
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
              <p>Phone #: {user.phone}</p>
              <p>Company: {user.company.name}</p>
              <p>
                Website: <span id="website">{user.website}</span>
              </p>
            </div>
          )}
          {/*Separate lists for completed & incomplete to-dos*/}
          <div className="todo-info">
            {currentUser === user.id && buttonType === "C" &&
              todos.map((todo) =>
                todo.userId === currentUser && todo.completed === true ? (
                  <li>{todo.title}</li>
                ) : null
              )}
            {currentUser === user.id && buttonType === "I" &&
              todos.map((todo) =>
                todo.userId === currentUser && todo.completed === false ? (
                  <li>{todo.title}</li>
                ) : null
              )}
          </div>
        </div>
      ))}
      <p id="ret">{"Retrieved at: " + new Date(time).toLocaleString("en-US")}</p>
    </div>
  );
}

export default App;
