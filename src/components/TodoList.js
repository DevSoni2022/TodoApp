import React, { useState } from "react";
import {
  PlusIcon,
  InfoIcon,
  EditIcon,
  DeleteIcon,
  Update,
  PlusIconMob,
} from "./ImgStore";
import NoTask from "./NoTask.js";
const TodoList = ({ isMobile }) => {
  const [toDoData, setTodoData] = useState([]);
  const [title, setTitle] = useState("");
  const [discription, setDiscription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [idToDelete, setIdtoDelete] = useState(null);
  const [isupdate, setIsUpdate] = useState(false);
  const [isupdateId, setIsUpdateID] = useState(false);

  const AddToDo = (id, title, discription) => {
    const item = {
      id: id,
      title: title,
      discription: discription,
      isEdit: false,
      isEditClicked: false,
    };
    setTodoData([...toDoData, item]);
    setTitle("");
    setDiscription("");
  };
  const editHandle = (e, ele) => {
    if (!ele.isEdit) {
      e.stopPropagation();
      let copytoDoData = toDoData;
      let modifyProperty = (copytoDoData, targetId, newProperty) => {
        let targetObj = copytoDoData.find((obj) => obj.id === targetId);
        if (targetObj) {
          targetObj.isEdit = newProperty;
        }
      };

      modifyProperty(copytoDoData, ele.id, !ele.isEdit);
      copytoDoData = [...copytoDoData];
      setTodoData(copytoDoData);
    } else if (ele.isEdit && !ele.isEditClicked) {
      let copytoDoData = toDoData;
      let modifyProperty = (copytoDoData, targetId, newProperty) => {
        let targetObj = copytoDoData.find((obj) => obj.id === targetId);
        if (targetObj) {
          targetObj.isEditClicked = newProperty;
        }
      };
      modifyProperty(copytoDoData, ele.id, !ele.isEditClicked);
      copytoDoData = [...copytoDoData];
      setTitle(ele.title);
      setTodoData(copytoDoData);
      setDiscription(ele.discription);
      setIsUpdate(true);
      setIsUpdateID(ele.id);
    }
  };
  const deletItem = (e, id) => {
    e.stopPropagation();
    setIdtoDelete(id);
    setShowModal(true);
  };
  const deleteModal = () => {
    let copytoDoData = toDoData;
    let newTodo = copytoDoData.filter((ele) => ele.id !== idToDelete);
    setTodoData(newTodo);
    setShowModal(false);
  };
  const noDelete = () => {
    setShowModal(false);
  };
  const updateList = (id, title, discription) => {
    let newData = toDoData;
    let getIndex = newData.findIndex((ele) => ele.id == id);
    newData[getIndex] = {
      id: id,
      title: title,
      discription: discription,
      isEdit: false,
      isEditClicked: false,
    };
    newData = [...newData];
    setTodoData(newData);
    setIsUpdate(false);
    setTitle("");
    setDiscription("");
  };
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
            className="discription"
            placeholder="Input..."
            value={discription}
            onChange={(e) => setDiscription(e.target.value)}
          />
        </div>
        <div>
          {!isupdate ? (
            <span
              className={title && discription ? "enabled" : "disabled"}
              onClick={() => AddToDo(Date.now(), title, discription)}
            >
              {" "}
              {isMobile ? <PlusIconMob /> : <PlusIcon />}
            </span>
          ) : (
            <span onClick={() => updateList(isupdateId, title, discription)}>
              {" "}
              <Update />
            </span>
          )}
        </div>
      </div>
      {toDoData && toDoData.length > 0 ? (
        <div className="top-list">
          <div className="List-container">
            {!isMobile
              ? toDoData &&
                toDoData.map((ele, index) => {
                  return (
                    <div
                      key={ele.id}
                      className="list-item"
                      onClick={(e) => (e.stopPropagation(), editHandle(e, ele))}
                    >
                      <div className="content">
                        <div className="title">{ele.title}</div>
                        <div className="discription">{ele.discription}</div>
                      </div>
                      {ele.isEdit ? (
                        <>
                          <span onClick={(e) => editHandle(e, ele)}>
                            {ele.isEditClicked ? (
                              <img src={"/edit.svg"} alt="img" />
                            ) : (
                              <EditIcon />
                            )}
                          </span>
                          <span onClick={(e) => deletItem(e,ele.id)}>
                            <DeleteIcon />
                          </span>{" "}
                        </>
                      ) : (
                        <InfoIcon />
                      )}
                    </div>
                  );
                })
              : toDoData &&
                toDoData.map((ele, index) => {
                  return (
                    <>
                      <div className="top-list-container">
                        <div
                          key={ele.id}
                          className="list-item"
                          onClick={(e) => (
                            e.stopPropagation(), editHandle(e, ele)
                          )}
                        >
                          <div className="content">
                            <div className="title">{ele.title}</div>
                            <div className="discription">{ele.discription}</div>
                          </div>
                          {
                            <span onClick={(e) => deletItem(e, ele.id)}>
                              <DeleteIcon />
                            </span>
                          }
                        </div>
                        {ele.isEdit ? (
                          <span
                            className="bottom-options"
                            onClick={(e) => editHandle(e, ele)}
                          >
                            {ele.isEditClicked ? (
                              <img src={"/edit.svg"} alt="img" />
                            ) : (
                              <EditIcon />
                            )}
                            <InfoIcon />
                          </span>
                        ) : (
                          ""
                        )}
                      </div>
                    </>
                  );
                })}
          </div>
        </div>
      ) : (
        <NoTask />
      )}
      {showModal && (
        <div className="modal-main">
          <div className="modal-content">
            <span className="modal-text">Delete this task ?</span>
            <div className="btn-container">
              <button onClick={() => deleteModal()}>Yes</button>
              <button onClick={() => noDelete()}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoList;
