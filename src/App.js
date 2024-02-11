import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./components/sidebar/Sidebar";
import Canvas from "./components/Canvas";

const App = () => {

    const [nodeDataArray, setNodeDataArray] = useState([]);

    const addEntity = (newEntity) => {
        console.log([...nodeDataArray, newEntity]);
        setNodeDataArray([...nodeDataArray, newEntity]);
    };

    return (
        <div style={{ display: 'flex', height: '100vh' }}>
          <Sidebar addEntity={addEntity} />
          <Canvas nodeDataArray={nodeDataArray} />
        </div>
    );
};

export default App;
