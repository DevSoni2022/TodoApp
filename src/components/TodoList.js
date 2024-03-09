import React, { useState, useEffect } from "react";
import { PlusIcon, InfoIcon, EditIcon, DeleteIcon } from "./ImgStore";
import NoTask from "./NoTask.js";
import DeleteModal from './DeleteModal/index.js'
const TodoList = () => {
  const [toDoData, setTodoData] = useState([]);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [showModal,setShowModal] = useState(false);
  const [idToDelete,setIdtoDelete] = useState(null)
  const AddToDo = (id, title, discription) => {

    const item = {
      id: id,
      title: title,
      discription: discription,
      isEdit: false,
    };
    setTodoData([...toDoData, item]);
    setTitle('')
    setDiscription('')
  };
  const editHandle = (e,ele) => {
    if (!ele.isEdit){
          e.stopPropagation();
    debugger
    let copytoDoData = toDoData;
    let modifyProperty = (copytoDoData, targetId, newProperty) => {
      let targetObj = copytoDoData.find((obj) => obj.id === targetId);
      if (targetObj) {
        targetObj.isEdit = newProperty;
      }
    };

   
      modifyProperty(copytoDoData, ele.id, !ele.isEdit);
      copytoDoData = [...copytoDoData];
      console.log(copytoDoData, "#$#@!$#@");
      setTodoData(copytoDoData);
    } 
    

   
  };
  const deletItem = (id) => {
    debugger
    // let copytoDoData = toDoData;
    // let newTodo = copytoDoData.filter((ele) => ele.id !== id);
    // setTodoData(newTodo);
setIdtoDelete(id)
    setShowModal(true)
  };
  const deleteModal=()=>{
     let copytoDoData = toDoData;
    let newTodo = copytoDoData.filter((ele) => ele.id !== idToDelete);
    setTodoData(newTodo);
    setShowModal(false)
  }
  const noDelete=()=>{
    setShowModal(false)
  }
  return (
    <div className="TodoList">
      <div className="todo-input">
        <div className="input-filed">
          <input
            className="title"
            placeholder="Title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="discriptiom"
            placeholder="Input..."
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>
        <div onClick={() => AddToDo(Date.now(), title, discription)}>
          {<PlusIcon />}
        </div>
      </div>
      {toDoData && toDoData.length > 0 ? (
        <div className="top-list">
          <div className="List-container">
            {toDoData &&
              toDoData.map((ele, index) => {
                return (
                  <div
                    key={ele.id}
                    className="list-item"
                    onClick={(e) =>(e.stopPropagation(), editHandle(e,ele))}
                  >
                    <div className="content">
                      <div className="title">{ele.title}</div>
                      <div className="discription">{ele.discription}</div>
                    </div>
                    {ele.isEdit ? (
                      <>
                        <span>
                          <EditIcon />
                        </span>{" "}
                        <span onClick={() => deletItem(ele.id)}>
                          <DeleteIcon />
                        </span>{" "}
                      </>
                    ) : (
                      <InfoIcon />
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      ) : (
        <NoTask />
      )}
      {
        showModal && <div className='modal-main'>
        <div className='modal-content'>
            <span className='modal-text'>Delete this task ?</span>
            <div className='btn-container'>
                <button onClick={()=>deleteModal()}>Yes</button>
                <button onClick={()=>noDelete()}>No</button>
            </div>
        </div>
    </div>
      }
    </div>
  );
};

export default TodoList;
