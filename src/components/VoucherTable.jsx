import { Dropdown, Form } from "react-bootstrap";
import "../styles/table.css";
import { useState, useRef, useEffect } from "react";
import { BiBorderRadius } from "react-icons/bi";


const VoucherTable = ({ vouchers, columns }) => {
  const [columnOrder, setColumnOrder] = useState([
    'actions', 'name', 'type', 'amount', 'code', 'expiry', 'assign', 'status'
  ]);
  const [draggedColumn, setDraggedColumn] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [showViewImage, setShowViewImage] = useState({});
  const dragStartPos = useRef({ x: 0, y: 0 });
  const longPressTimer = useRef(null);

  const  columnHeaders = {
    name: 'Voucher Name',
    type: 'Type', 
    amount: 'Amount',
    code: 'Voucher Code',
    expiry: 'Expiry Date',
    assign: 'Assign To',
    status: 'Status',
    actions: <div style={{width: '0px', height: '10px', marginLeft: '25px'}}><img src="/src/assets/picture.png" alt="Actions" style={{width: '20px', height: '20px', marginTop: '-16px'}} /></div>,
              
              
  };
  
  

  const handleMouseDown = (e, columnKey) => {
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    
    longPressTimer.current = setTimeout(() => {
      setIsDragging(true);
      setDraggedColumn(columnKey);
    }, 500);
  };

  const handleMouseMove = (e) => {
    if (longPressTimer.current) {
      const distance = Math.sqrt(
        Math.pow(e.clientX - dragStartPos.current.x, 2) + 
        Math.pow(e.clientY - dragStartPos.current.y, 2)
      );
      if (distance > 5) {
        clearTimeout(longPressTimer.current);
      }
    }
  };

  const handleMouseUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleDragStart = (e, columnKey) => {
    setDraggedColumn(columnKey);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, index) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    setDragOverIndex(null);
    
    if (draggedColumn) {
      const draggedIndex = columnOrder.indexOf(draggedColumn);
      if (draggedIndex !== dropIndex) {
        const newOrder = [...columnOrder];
        newOrder.splice(draggedIndex, 1);
        newOrder.splice(dropIndex, 0, draggedColumn);
        setColumnOrder(newOrder);
      }
    }
    setDraggedColumn(null);
    setIsDragging(false);
  };

  const handleTouchStart = (e, columnKey) => {
    const touch = e.touches[0];
    dragStartPos.current = { x: touch.clientX, y: touch.clientY };
    
    longPressTimer.current = setTimeout(() => {
      setIsDragging(true);
      setDraggedColumn(columnKey);
    }, 500);
  };

  const handleTouchMove = (e) => {
    if (longPressTimer.current) {
      const touch = e.touches[0];
      const distance = Math.sqrt(
        Math.pow(touch.clientX - dragStartPos.current.x, 2) + 
        Math.pow(touch.clientY - dragStartPos.current.y, 2)
      );
      if (distance > 5) {
        clearTimeout(longPressTimer.current);
      }
    }
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e) => handleMouseMove(e);
    const handleGlobalMouseUp = () => handleMouseUp();
    
    if (longPressTimer.current) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }
    
    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const renderCell = (voucher, columnKey) => {
    switch(columnKey) {
      case 'name':
        return (
          <>
            {showViewImage[voucher.id] ? (
              <div style={{height: '35px', display: 'flex', alignItems: 'center'}}>
        
              </div>
            ) : (
              vouchers.indexOf(voucher) === 0 ? (
                <div style={{height: '35px', display: 'flex', alignItems: 'center'}}>
                  Birthday Gift
                </div>
              ) : voucher.name
            )}
          </>
        );
      case 'type':
        return 'Gift';
      case 'amount':
        return `£${voucher.amount}`;
      case 'code':
        return 'fhf56w7r8';
      case 'expiry':
        return 'Feb 23, 2025';
      case 'assign':
        return 'Marcus Septimus';
      case 'status':
        return <Form.Check type="switch" defaultChecked className="status-switch-green" style={{width: '30px', height: '15px'}} />;
      case 'actions':
        return (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <Dropdown drop="end" className="voucher-actions-dropdown">
              <Dropdown.Toggle variant="success" id={`dropdown-${voucher.id}`} className="voucher-actions-toggle" style={{backgroundColor: 'transparent', border: 'none', padding: '0'}}>
                <i 
                  className="bi bi-three-dots-vertical" 
                  style={{color: 'black', cursor: 'pointer'}}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu className="voucher-actions-menu">
                <Dropdown.Item
                  className="voucher-actions-item voucher-actions-item--view"
                  onClick={() => setShowViewImage(prev => ({
                    ...prev,
                    [voucher.id]: !prev[voucher.id]
                  }))}
                >
                  <span className="voucher-actions-item__row">
                    <span className="voucher-actions-item__label">View</span>
                    <span className="voucher-actions-item__chev">›</span>
                  </span>
                </Dropdown.Item>
                <Dropdown.Item className="voucher-actions-item voucher-actions-item--delete">
                  <span className="voucher-actions-item__row">
                    <span className="voucher-actions-item__label">Delete</span>
                    <span className="voucher-actions-item__chev">›</span>
                  </span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        );
      default:
        return '';
    }
  };

  return (
    <table className="voucher-table">
      <thead>
        <tr>
          {columnOrder.map((columnKey, index) => (
            <th
              key={columnKey}
              draggable={isDragging}
              onDragStart={(e) => handleDragStart(e, columnKey)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, index)}
              onMouseDown={(e) => handleMouseDown(e, columnKey)}
              onTouchStart={(e) => handleTouchStart(e, columnKey)}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                backgroundColor: draggedColumn === columnKey ? '#e3f2fd' : 
                               dragOverIndex === index ? '#f5f5f5' : '',
                border: draggedColumn === columnKey ? '2px solid #2196f3' : '',
                opacity: draggedColumn === columnKey ? 0.8 : 1,
                transition: 'all 0.2s ease',
                position: 'relative',
                paddingRight: '30px'
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <span>{columnHeaders[columnKey]}</span>
                {columnOrder.indexOf(columnKey) !== 0 && (
                  <span style={{ 
                    position: 'absolute', 
                    right: '8px', 
                    top: '50%', 
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                    padding: '2px 4px',
                    borderRadius: '3px',
                    fontSize: '14px'
                  }}>
                    ⋮
                  </span>
                )}
              </span>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {vouchers.map((voucher) => (
          <tr key={voucher.id}>
            {columnOrder.map((columnKey) => (
              <td key={columnKey}>
                {renderCell(voucher, columnKey)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default VoucherTable;
