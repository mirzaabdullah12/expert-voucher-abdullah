import { Form, InputGroup, Dropdown } from "react-bootstrap";
import { FaSearch, FaBell, FaCog } from "react-icons/fa";
import "../styles/header.css";
import projectData from '../data/projectData.json';
import lineImage from '../assets/line (2).png';

const Header = () => {
  const headerData = projectData.components.header;
  const searchBox = headerData.elements.searchBox;
  
  return (
    <header className="top-header">
      <div className="logo d-flex align-items-center">
        <img src="/src/assets/expert.png" alt="logo" style={{width: '29px', height: '28px', marginRight: '10px'}} />
        <span style={{fontSize: '25px', fontWeight: 'bold'}}>{headerData.elements.logo}</span>
      </div>

      <div className="header-icons ms-4">
        <InputGroup className="search-box" style={{width: '250px', marginRight: '5px'}}>
          <InputGroup.Text style={{borderRadius: '8px 0 0 8px', color: 'white', borderRight: 'none', background: 'transparent', width: '0px', height: '20px', marginTop: '8px'}}>
            <img src="/src/assets/line (2).png" alt="line" style={{width: '20px', height: '20px', opacity: '0.7'}} />
          </InputGroup.Text>
          <InputGroup.Text style={{borderRadius: '8px 0 0 8px', color: 'white'}}><FaSearch /></InputGroup.Text>
          <Form.Control placeholder={searchBox.placeholder} style={{borderRadius: '0 8px 8px 0'}} />
          <InputGroup.Text style={{borderRadius: '0 8px 8px 0', borderLeft: 'none', background: 'transparent', width: '0px', height: '20px', marginTop: '8px'}}>
            <img src="/src/assets/line (2).png" alt="line" style={{width: '20px', height: '20px', opacity: '0.7'}} />
          </InputGroup.Text>
        </InputGroup>
        <img src="/src/assets/three.png" alt="os" style={{width: '110px', height: '18px', marginRight: '15px'}} />
        <img src="/src/assets/uk.png" alt="uk" style={{width: '50px', height: '20px', marginRight: '10px', marginTop: '3px', borderRight: '1px solid white', paddingRight: '5px'}} />
        <img src="/src/assets/eng.png" alt="eng" style={{width: '45px', height: '25px', marginRight: '13px', borderRight: '1px solid white', paddingRight: '5px'}} />
        {headerData.elements.languageOptions.map((lang, index) => (
          <span key={index} className="lang">{}</span>
        ))}
        <div style={{marginLeft: 'auto', display: 'flex', alignItems: 'center'}}>
          <img
            src={headerData.elements.profileImage}
            alt="profile"
            className="avatar"
            style={{marginRight: '20px'}}
          />
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic" style={{backgroundColor: 'transparent', border: 'none', padding: '0'}}>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Action 1</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Action 2</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Action 3</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </header>
  );
};

export default Header;
