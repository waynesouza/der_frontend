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
    const [isExpanded, setIsExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
            <div className="sidebar-header">
                <div className="logo-space">
                    <img src="../../logo.svg" alt="Logo" className="logo-image" onClick={toggleSidebar} />
                </div>
            </div>
            {isExpanded && (
                <div>
                    <Entity name="Entidade 1" type="entity" onDragStart={onDragStart} />
                    <Entity name="Entidade 2" type="entity" onDragStart={onDragStart} />
                </div>
            )}
        </div>
    );
};

export default Sidebar;
