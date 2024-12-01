import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

const Card = ({ card, index, listId, updateCard, deleteCard }) => {
  const [showModal, setShowModal] = useState(false);
  const [editedCard, setEditedCard] = useState({ ...card });

  const handleSave = () => {
    updateCard(listId, card.id, editedCard);
    setShowModal(false);
  };

  return (
    <Draggable draggableId={card.id.toString()} index={index}>
      {(provided) => (
        <>
          <div
            className="bg-white p-2 rounded shadow cursor-pointer"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            onClick={() => setShowModal(true)}
          >
            <h3>{card.title}</h3>
          </div>
          {showModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded shadow w-96">
                <h2 className="font-bold text-lg mb-2">Edit Card</h2>
                <input
                  type="text"
                  value={editedCard.title}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, title: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Card Title"
                />
                <textarea
                  value={editedCard.description}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, description: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                  placeholder="Description"
                ></textarea>
                <input
                  type="date"
                  value={editedCard.dueDate}
                  onChange={(e) =>
                    setEditedCard({ ...editedCard, dueDate: e.target.value })
                  }
                  className="border p-2 rounded w-full mb-2"
                />
                <div className="flex justify-between">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => deleteCard(listId, card.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-4 py-2 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </Draggable>
  );
};

export default Card;
