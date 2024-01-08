import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import Canvas from "./components/Canvas";

const App = () => {
    const handleDragStart = (event, entity) => {
        event.dataTransfer.setData("application/reactflow", JSON.stringify(entity));
        event.dataTransfer.effectAllowed = "move";
    };

    return (
      <div className="container mt-3">
        <h2 className="mb-3">React Canvas Draggable Shapes Example</h2>
          <Sidebar onDragStart={handleDragStart} />
          <Canvas />
      </div>
    );
};

export default App;
