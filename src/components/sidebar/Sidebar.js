import React, { useState } from 'react';
import './sidebar.css';

const Entity = ({ name, type, onDragStart }) => {


    return (
        <div draggable onDragStart={(e) => onDragStart(e, { name, type })} className="entity">
            {name}
        </div>
    );
};

const Sidebar = ({ onDragStart }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-header">Entidades</div>
            <Entity name="Entidade 1" type="entity" onDragStart={onDragStart} />
            <Entity name="Entidade 2" type="entity" onDragStart={onDragStart} />
        </div>
    );
};

export default Sidebar;
