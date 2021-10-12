import { useState, useEffect } from 'react';
import './App.css';

function App() {

const [users, setUsers] = useState([]);
const [todos, setTodos] = useState([]);
const [currentUser, setCurrentUser] = useState("");
const userpage = "http://jsonplaceholder.typicode.com/users"
const todopage = "http://jsonplaceholder.typicode.com/todos"

useEffect(() => {
  
  async function loadUsers() {
    const response = await fetch(userpage);
    const usersFromAPI = await response.json();
    setUsers(usersFromAPI);
  }
  loadUsers();
}, [])

useEffect(() => {
  async function loadTodos() {
    const response = await fetch(todopage);
    const todosFromAPI = await response.json();
    setTodos(todosFromAPI);
  }
  loadTodos();
}, [currentUser])


console.log(users, todos)

  return (
    <div className="App">
 
      {users.map((user) => (
        <div>
        <h3>{user.name}</h3>
        <button onClick={() => setCurrentUser(user.name)}>See Details</button>
        <button onClick={() => setCurrentUser(user.id)}>See To-Dos</button>
        
        {currentUser === user.name && <div className="details">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>Phone #: {user.phone}</p>
        <p>Company: {user.company.name}</p>
        <p>Website: <span id="website">{user.website}</span></p>
        </div>
        }
        </div>
      ))}
       
         
    </div>
  );
}

export default App;
