import React, { useState } from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [lists, setLists] = useState(
    JSON.parse(localStorage.getItem("boardData")) || []
  );

  const saveToLocalStorage = (data) => {
    localStorage.setItem("boardData", JSON.stringify(data));
  };

  const addList = (title) => {
    const newLists = [...lists, { id: Date.now(), title, cards: [] }];
    setLists(newLists);
    saveToLocalStorage(newLists);
  };

  const deleteList = (id) => {
    const updatedLists = lists.filter((list) => list.id !== id);
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const renameList = (id, newTitle) => {
    const updatedLists = lists.map((list) =>
      list.id === id ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const addCard = (listId, title) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? { ...list, cards: [...list.cards, { id: Date.now(), title, description: "", dueDate: "" }] }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const updateCard = (listId, cardId, updatedCard) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? {
            ...list,
            cards: list.cards.map((card) =>
              card.id === cardId ? { ...card, ...updatedCard } : card
            ),
          }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const deleteCard = (listId, cardId) => {
    const updatedLists = lists.map((list) =>
      list.id === listId
        ? { ...list, cards: list.cards.filter((card) => card.id !== cardId) }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const handleDragEnd = (result) => {
    console.log(result);
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "list") {
      const reorderedLists = Array.from(lists);
      const [movedList] = reorderedLists.splice(source.index, 1);
      reorderedLists.splice(destination.index, 0, movedList);
      setLists(reorderedLists);
      saveToLocalStorage(reorderedLists);
    } else {
      const sourceList = lists.find((list) => list.id.toString() === source.droppableId);
      const destinationList = lists.find(
        (list) => list.id.toString() === destination.droppableId
      );

      const [movedCard] = sourceList.cards.splice(source.index, 1);

      if (sourceList === destinationList) {
        sourceList.cards.splice(destination.index, 0, movedCard);
      } else {
        destinationList.cards.splice(destination.index, 0, movedCard);
      }

      setLists([...lists]);
      saveToLocalStorage(lists);
    }
  };

  return (
    <div className="p-4">
      <button
        onClick={() => {
          const title = prompt("Enter list title:");
          if (title) addList(title);
        }}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add List
      </button>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="board"
          direction="horizontal"
          type="list"
        >
          {(provided) => (
            <div
              className="flex gap-4 overflow-x-scroll"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <List
                  key={list.id}
                  list={list}
                  index={index}
                  addCard={addCard}
                  deleteList={deleteList}
                  renameList={renameList}
                  updateCard={updateCard}
                  deleteCard={deleteCard}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Board;

