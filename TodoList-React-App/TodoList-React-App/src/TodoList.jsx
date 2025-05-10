import "./TodoList.css";
import {useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import "./Todo.css";
import "./UpdateTodoTask.css";

export default function TodoList(){
    let [todos, setTodos] = useState([{text: "Practice on react", id: uuidv4().toString()}, {text: "Create an sample app", id: uuidv4().toString()}]);
    let [currTaskId, setCurrTaskId] = useState(null);
    let [currTaskText, setCurrTaskText] = useState("");
    let iconStyle = {color: "red"};
    //Add Task
    let AddTask = (evt)=>{
        evt.preventDefault();
        let newTask = document.getElementsByClassName("inputField")[0].value;
        setTodos((prevTodos)=>{
            return [...prevTodos, {text: newTask, id: uuidv4().toString()}]
        })
        document.getElementsByClassName("inputField")[0].value="";
    }

    //Delete Task
    let deleteTask = (id)=>{
        setTodos((prevTodos)=>{
            return (prevTodos.filter((todo)=>{return todo.id !== id}));
        });
    }

    //Clear all Tasks
    let clearAllTasks = (id)=>{
        setTodos((prevTodos)=>{
            return prevTodos.filter((todo)=>{
                    return todo.id == id;
            })
        })
    }

    //Update task
    let updateTask = (id)=>{
        let task = todos.filter((todo)=>{
            return todo.id == id;
        })
        if(task[0]){
            let updateTaskBox = document.getElementsByClassName("UpdateTodoTask")[0];
            let todoListBox = document.getElementsByClassName("Todo");
            let inputForm = document.getElementsByClassName('inputForm')[0];
            let clearBtn = document.getElementsByClassName('clearAllTaskBtnBox')[0];
            for(let todoList of todoListBox){
                todoList.style.display="none";
            }
            inputForm.style.display="none";
            clearBtn.style.display="none";
            updateTaskBox.style.display="inline-block";   
            setCurrTaskId(id);
            setCurrTaskText(task[0].text);
        }
    }


    // Save Task 
    let saveTask = ()=>{
        console.log("Save button pressed");
            let updateTaskBox = document.getElementsByClassName("UpdateTodoTask")[0];
            let todoListBox = document.getElementsByClassName("Todo");
            let inputForm = document.getElementsByClassName('inputForm')[0];
            let clearBtn = document.getElementsByClassName('clearAllTaskBtnBox')[0];
            for(let todoList of todoListBox){
                todoList.style.display="";
            }
            inputForm.style.display="";
            clearBtn.style.display="";
            updateTaskBox.style.display="none"; 
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                todo.id === currTaskId ? { ...prevTodos, text: currTaskText } : todo
            )
            )

            setCurrTaskId(null);
            setCurrTaskText("");
    }

    return (
        <div className="TodoList">

            <h3 className="heading">TODO-LIST-APP</h3>

            <form className="inputForm">
            <input type="text" placeholder="Enter Task" className="inputField"></input>
            <button className='addTaskBtn' onClick={AddTask}>Add Task</button>
            </form>

            <hr></hr>

            {todos.length > 0 ? <div> {todos.map((todo)=>(
                 <div className="Todo">
                 <p className="TaskText">{todo.text}</p>
                 <div>
                 <i className="fa-solid fa-pen fa-lg deleteBtn" style={{color: "white"}} onClick={()=>{updateTask(todo.id)}}></i>
                 &nbsp; &nbsp;
                 <i className="fa-solid fa-trash fa-lg deleteBtn" style={iconStyle} onClick={()=>{deleteTask(todo.id)}}></i>
                </div>
                </div>
            ))} </div>: <p>No Task</p>}

           
            {todos.length > 0 ? 
            <div className="clearAllTaskBtnBox">
            <button onClick={()=>{clearAllTasks("0")}} className="clearAllTaskBtn">
            <p>Clear All Tasks</p>
            <i className="fa-solid fa-trash fa-lg deleteBtn" style={{color:"orange", marginLeft: "8px"}}></i>
            </button>
            </div> : ""}

            <div className="UpdateTodoTask" style={{display:"none"}}>
            <textarea className="updateTextArea" value={currTaskText} onChange={(evt)=>setCurrTaskText(evt.target.value)}></textarea>
            <div className="SaveBtn" onClick={saveTask}>
            <button>Save</button>
            </div>
            </div>

        </div>
         
    )
}