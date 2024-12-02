import React, { useState, useEffect, useCallback } from "react";
import List from "./List";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

const Board = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("boardData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setLists(parsedData);
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
      }
    }
  }, []);

  const saveToLocalStorage = useCallback((data) => {
    localStorage.setItem("boardData", JSON.stringify(data));
  }, []);

  const addList = (title) => {
    const newLists = [...lists, { id: `${Date.now()}-${Math.random()}`, title, cards: [] }];
    setLists(newLists);
    saveToLocalStorage(newLists);
  };

  const deleteList = (index) => {
    const updatedLists = lists.filter((_, listIndex) => listIndex !== index);
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const renameList = (index, newTitle) => {
    const updatedLists = lists.map((list, listIndex) =>
      listIndex === index ? { ...list, title: newTitle } : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const addCard = (listIndex, title) => {
    const newCard = {
      id: `${Date.now()}-${Math.random()}`,
      title,
      description: "",
      dueDate: "",
    };

    const updatedLists = lists.map((list, index) =>
      index === listIndex
        ? { ...list, cards: [...list.cards, newCard] }
        : list
    );

    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const updateCard = (listIndex, cardIndex, updatedCard) => {
    const updatedLists = lists.map((list, index) =>
      index === listIndex
        ? {
            ...list,
            cards: list.cards.map((card, cIndex) =>
              cIndex === cardIndex ? { ...card, ...updatedCard } : card
            ),
          }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const deleteCard = (listIndex, cardIndex) => {
    const updatedLists = lists.map((list, index) =>
      index === listIndex
        ? { ...list, cards: list.cards.filter((_, cIndex) => cIndex !== cardIndex) }
        : list
    );
    setLists(updatedLists);
    saveToLocalStorage(updatedLists);
  };

  const handleDragEnd = useCallback(
    (result) => {
      const { source, destination, type } = result;

      if (!destination) return;

      const newLists = Array.from(lists);

      if (type === "list") {
        const [reorderedList] = newLists.splice(source.index, 1);
        newLists.splice(destination.index, 0, reorderedList);

        setLists(newLists);
        saveToLocalStorage(newLists);
        return;
      }

      const sourceListIndex = parseInt(source.droppableId, 10);
      const destListIndex = parseInt(destination.droppableId, 10);

      if (sourceListIndex === destListIndex) {
        const list = newLists[sourceListIndex];
        const updatedCards = Array.from(list.cards);
        const [movedCard] = updatedCards.splice(source.index, 1);
        updatedCards.splice(destination.index, 0, movedCard);

        newLists[sourceListIndex] = { ...list, cards: updatedCards };
      } else {
        const sourceList = newLists[sourceListIndex];
        const destList = newLists[destListIndex];

        const sourceCards = Array.from(sourceList.cards);
        const destCards = Array.from(destList.cards);

        const [movedCard] = sourceCards.splice(source.index, 1);
        destCards.splice(destination.index, 0, movedCard);

        newLists[sourceListIndex] = { ...sourceList, cards: sourceCards };
        newLists[destListIndex] = { ...destList, cards: destCards };
      }

      setLists(newLists);
      saveToLocalStorage(newLists);
    },
    [lists, saveToLocalStorage]
  );

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
        <Droppable droppableId="lists" direction="horizontal" type="list">
          {(provided) => (
            <div
              className="flex gap-4 overflow-x-scroll"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {lists.map((list, index) => (
                <List
                  key={`list-${list.id}`}
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
