import React, { useState } from "react";
import Card from "./Card";
import { Droppable, Draggable } from "react-beautiful-dnd";

const List = ({
  list,
  index,
  addCard,
  deleteList,
  renameList,
  updateCard,
  deleteCard,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleRename = () => {
    renameList(list.id, newTitle);
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={list.id.toString()} index={index}>
      {(provided) => (
        <div
          className="bg-gray-100 p-4 rounded shadow w-64 flex-shrink-0"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div className="flex justify-between items-center mb-4" {...provided.dragHandleProps}>
            {isEditing ? (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <button
                  onClick={handleRename}
                  className="bg-blue-500 text-white px-2 rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <h2
                className="font-bold text-lg cursor-pointer"
                onClick={() => setIsEditing(true)}
              >
                {list.title}
              </h2>
            )}
            <button
              onClick={() => deleteList(list.id)}
              className="text-red-500 hover:underline"
            >
              Delete
            </button>
          </div>
          <Droppable droppableId={list.id.toString()} type="card">
            {(provided) => (
              <div
                className="flex flex-col gap-2"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {list.cards.map((card, index) => (
                  <Card
                    key={card.id}
                    card={card}
                    index={index}
                    listId={list.id}
                    updateCard={updateCard}
                    deleteCard={deleteCard}
                  />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <button
            onClick={() => {
              const title = prompt("Enter card title:");
              if (title) addCard(list.id, title);
            }}
            className="bg-green-500 text-white px-2 py-1 rounded mt-4 w-full"
          >
            Add Card
          </button>
        </div>
      )}
    </Draggable>
  );
};

export default List;
