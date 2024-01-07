import React, { useState } from 'react';
import { FaHome, FaTools, FaUserCircle, FaAngleDown } from 'react-icons/fa'; // Importe ícones adicionais conforme necessário

function Sidebar() {
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

    return (
        <div className="sidebar">
            <div className="sidebar-menu">
                <div className="menu-item">
                    <FaHome /> <span>Home</span>
                </div>
                <div className="menu-item" onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}>
                    <FaTools /> <span>Tools</span> <FaAngleDown />
                    {isSubMenuOpen && (
                        <div className="submenu">
                            <div>Tool 1</div>
                            <div>Tool 2</div>
                            <div>Tool 3</div>
                        </div>
                    )}
                </div>
                <div className="menu-item">
                    <FaUserCircle /> <span>User</span>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
