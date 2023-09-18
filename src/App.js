import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import {AiOutlineDelete} from 'react-icons/ai'
import {BsCheckLg} from 'react-icons/bs'
function App() {
  const [isCompleteScreen,setCompleteScreen]=useState(false);
  const[allTodos,setTodos]=useState([]);
  const[newTitle,setNewTitle]=useState("");
  const[newDescription,setNewDescription]=useState("");
  const [completedTodos,setCompleteTodos]=useState([]);
  const handleAddTodo=()=>{
    let newTodoItem={
      title:newTitle,
      description:newDescription
    }
    let updatedTodoArr=[...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
  }
  const handleDeleteTodo=(index)=>{
    let reducedTodo=[...allTodos];
    reducedTodo.splice(index);
    localStorage.setItem('todolist',JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  }
  const handleCompleteTodo=(index)=>{
    let now=new Date();
    let dd=now.getDate();
    let mm=now.getMonth()+1;
    let yyyy=now.getFullYear();
    let h=now.getHours();
    let m=now.getMinutes();
    let s=now.getSeconds();
    let completedOn=dd+'-'+mm+'-'+yyyy+'at'+h+':'+m+':'+s;
    let filterdItem={
      ...allTodos[index],
      completedOn:completedOn


    }
    let updatedCompletedArr=[...completedTodos];
    updatedCompletedArr.push(filterdItem);
    setCompleteTodos(updatedCompletedArr);
    handleDeleteTodo(index);
    localStorage.setItem('completedTodos',JSON.stringify(updatedCompletedArr))
  }

  const handleDeleteCompletedTodo=(index)=>{
    let reducedTodo=[...completedTodos];
    reducedTodo.splice(index);
    localStorage.setItem('completedTodos',JSON.stringify(reducedTodo));
    setCompleteTodos(reducedTodo);

  }
  useEffect(()=>{
    let savedTodo= JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo= JSON.parse(localStorage.getItem('completedTodo'));
    if(savedTodo){
      setTodos(savedTodo);
    }
    if(savedCompletedTodo){
      setCompleteTodos(savedCompletedTodo);
    }
  },[])

  return (
    <div className="App">
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className='todo-input-item'>
            <label htmlFor="">Title</label>
            <input type="text" value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}  placeholder="what's the task title"/>
          </div>
          <div className='todo-input-item'>
            <label htmlFor="">Title Description</label>
            <input type="text"  value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}  placeholder="what's the task title"/>
          </div>
          <div className='todo-input-item'>
            <button type='button'  onClick={handleAddTodo}className='primary-btn'>Add</button>
          </div>
        </div>
        <div className="btn-area">
          <button className={`secondary-btn ${isCompleteScreen===false &&'active'}`}
          onClick={()=>setCompleteScreen(false)}>TOdo</button>
          <button className={`secondary-btn ${isCompleteScreen===true &&'active'}`} 
          onClick={()=>setCompleteScreen(true)}>Completed</button>
        </div>
        <div className="todo-list">

          
          { isCompleteScreen === false  && 
          allTodos.map((item,index)=>{
            return (

              <div className='todo-list-item' key={index}> 
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            
            <div>
              <AiOutlineDelete className='icon' 
              onClick={()=>handleDeleteTodo(index)} 
              title='delete'/>
  
       <BsCheckLg className='check-icon' 
        onClick={()=>handleCompleteTodo(index)} 
        title='Complete'/>
            </div>
          </div>
            )

          })}

          {/* true */}
          { isCompleteScreen === true && 
          completedTodos.map((item,index)=>{
            return (

              <div className='todo-list-item' key={index}>
              <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p><small>Completed on :{item.completedOn}</small></p>
            </div>
            
            <div>
              <AiOutlineDelete className='icon' 
              onClick={()=>handleDeleteCompletedTodo(index)} 
              title='delete?'/>
  
     
            </div>
          </div>
            )

          })}
        
      </div>
    </div>
    </div>
  );
}

export default App;
