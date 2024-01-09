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
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar onDragStart={handleDragStart} />
          <Canvas />
        </div>
    );
};

export default App;
