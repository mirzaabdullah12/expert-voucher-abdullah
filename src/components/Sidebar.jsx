import React from 'react';
import { Nav } from 'react-bootstrap';
import "../styles/sidebar.css";
import projectData from '../data/projectData.json';

const Sidebar = () => {
  console.log('Project Data:', projectData);
  const menuItems = projectData.components.sidebar.menuItems;
  const sidebarStyles = projectData.components.sidebar.styling;
  
  return (
    <div className="sidebar border-end vh-100" style={{ width: sidebarStyles.width }}>
      <Nav className="flex-column p-3">
        {menuItems.map((item, index) => {
          return (
            <Nav.Item key={item.id || index} className="mb-3">
              <Nav.Link
                className={`d-flex justify-content-center align-items-center p-2 rounded ${item.id === 'settings' ? 'bg-danger' : ''}`}
                href={item.route || "#"}
                style={{ color: 'red' }}
              >
                <i className={`bi ${item.icon}`} style={{fontSize: '16px', color: item.id === 'settings' ? '#FFFFFF' : 'red'}}></i>
              </Nav.Link>
            </Nav.Item>
          );
        })}
      </Nav>
    </div>
  );
};
export default Sidebar;