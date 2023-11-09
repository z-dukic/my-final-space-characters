import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const finalSpaceCharacters = [
  {
    id: 'gary',
    name: 'Gary Goodspeed',
    thumb: '/images/gary.png',
  },
  {
    id: 'cato',
    name: 'Little Cato',
    thumb: '/images/cato.png',
  }
];

function App() {
  const [characters, updateCharacters] = useState(finalSpaceCharacters);
  const [expandedCharacter, setExpandedCharacter] = useState(null);

  const toggleExpansion = (id) => {
    if (expandedCharacter === id) {
      setExpandedCharacter(null);
    } else {
      setExpandedCharacter(id);
    }
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(characters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    updateCharacters(items);
  }

  function handleAddConnectorClick() {
    // Create a new character object with a unique ID (you can use a library like uuid to generate a unique ID)
    const newCharacter = {
      id: `new-${Date.now()}`, // Unique ID based on the current timestamp
      name: 'New Connector', // Name of the new connector
      thumb: '/images/default.png', // Default image path (replace with your desired image)
    };

    // Update the characters array by appending the new character
    updateCharacters([...characters, newCharacter]);
  }

  return (
    <div className="App">
      <div class="container"></div>
      <div class="left">
        <header className="App-header">
          <h1>Final Space Characters</h1>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <div className="characters-container">
                  <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
                    {characters.map(({ id, name, thumb, expanded }, index) => {
                      return (
                        <Draggable key={id} draggableId={id} index={index}>
                          {(provided) => (
                            <li
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <div className="characters-thumb">
                                <img src={thumb} alt={`${name} Thumb`} />
                              </div>
                              <p>{name}</p>
                              <button class="button-6" role="button" onClick={() => toggleExpansion(id)}>
                                {expanded ? 'Collapse' : 'Expand'}
                              </button>
                            </li>
                          )}
                        </Draggable>
                      );
                    })}
                    {provided.placeholder}
                  </ul>

                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div>
            <button class="button-6" role="button" onClick={handleAddConnectorClick}>Add a new connector</button>
          </div>
        </header>
      </div>
      <div class="right">
        {expandedCharacter && (
          <div className="expanded-card">
            {characters.map(({ id, name, thumb }) => {
              if (id === expandedCharacter) {
                return (
                  <div key={id}>
                    <div className="characters-thumb">
                      <img src={thumb} alt={`${name} Thumb`} />
                    </div>
                    <p>{name}</p>
                    {/* Render additional information here */}
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
