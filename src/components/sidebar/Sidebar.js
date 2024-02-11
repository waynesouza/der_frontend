import React from 'react';

const Sidebar = ({ addEntity }) => {

    const createEntity = () => {
        const newEntity = { key: `Entity${Date.now()}`, color: "lightblue" };
        addEntity(newEntity);
    };

    return (
        <div>
            <button onClick={createEntity}>Adicionar Entidade</button>
        </div>
    );
}

export default Sidebar;
