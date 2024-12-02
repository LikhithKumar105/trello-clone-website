import React, { useState } from "react";
import Card from "./Card";
import { Droppable } from "react-beautiful-dnd";

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
    renameList(index, newTitle);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-100 p-4 rounded shadow w-64 flex-shrink-0">
      <div className="flex justify-between items-center mb-4">
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
          onClick={() => deleteList(index)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
      <Droppable droppableId={`${index}`} type="card">
        {(provided) => (
          <div
            className="flex flex-col gap-2"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {list.cards.map((card, cardIndex) => (
              <Card
                key={`card-${card.id || cardIndex}`}
                card={card}
                index={cardIndex}
                listIndex={index}
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
          if (title) addCard(index, title);
        }}
        className="bg-green-500 text-white px-2 py-1 rounded mt-4 w-full"
      >
        Add Card
      </button>
    </div>
  );
};

export default List;
