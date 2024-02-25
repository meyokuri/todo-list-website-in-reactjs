import React, { useState, useEffect } from "react";
import img from "../assets/img.webp";
import "../styles/main.css";

function TodoList() {
  const storageList = localStorage.getItem("List");

  const [list, setList] = useState(storageList ? JSON.parse(storageList) : []);
  const [newItem, setNewItem] = useState([]);

  useEffect(() => {
    localStorage.setItem("List", JSON.stringify(list));
  }, [list]);

  function addItem(form) {
    form.preventDefault();
    if (!newItem) return;

    setList([...list, { text: newItem, isCompleted: false }]);
    setNewItem("");
    document.getElementById("input-enter").focus();
  }

  function clickButton(index) {
    const listAux = [...list];
    listAux[index].isCompleted = !listAux[index].isCompleted;
    setList(listAux);
  }

  function deleteButton(index) {
    const listAux = [...list];
    listAux.splice(index, 1);
    setList(listAux);
  }

  function deleteAll() {
    setList([]);
  }

  return (
    <div>
      <h1>Lista de Tarefas</h1>
      <form onSubmit={addItem}>
        <input
          id="input-enter"
          type="text"
          value={newItem}
          onChange={(e) => {
            setNewItem(e.target.value);
          }}
          placeholder="Coloque aqui uma tarefa."
        />
        <button type="submit" className="addButton">
          Adicionar
        </button>
      </form>
      <div className="listaTarefas">
        <div style={{ textAlign: "center" }}>
          {list.length < 1 ? (
            <img className="icon-central" src={img} />
          ) : (
            list.map((item, index) => (
              <div
                key={index}
                className={item.isCompleted ? "item completo" : "item"}
              >
                <span
                  onClick={() => {
                    clickButton(index);
                  }}
                >
                  {item.text}
                </span>
                <button
                  onClick={() => {
                    deleteButton(index);
                  }}
                  className="del"
                >
                  Deletar
                </button>
              </div>
            ))
          )}

          {list.length > 0 && (
            <button
              onClick={() => {
                deleteAll();
              }}
              className="deleteAll"
            >
              Deletar Todas
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
