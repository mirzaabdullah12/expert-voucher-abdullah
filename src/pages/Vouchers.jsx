import VoucherTable from "../components/VoucherTable";
import projectData from '../data/projectData.json';
import { FaSearch } from 'react-icons/fa';

const Vouchers = () => {
  const voucherData = projectData.components.vouchers;
  const vouchers = voucherData.data;
  
  return (
    <div className="content">
      <div className="content-header" style={{borderBottom: '1px solid #e8e8e8', paddingBottom: '10px'}}>
        <h5>Vouchers <span style={{color: '#AEAEAE', fontSize: '16px'}}>(30)</span></h5>

        <div className="actions" style={{marginTop: '3px'}}>
          <div style={{display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', padding: '0 8px'}}>
            <FaSearch style={{color: 'red', margin: '0 8px'}} />
            <input placeholder="Search" style={{border: 'none', outline: 'none', background: 'transparent', padding: '4px'}} />
          </div>
          <button className="btn-red" style={{height: '30px', width: '109px', backgroundColor: '#DB0406', fontSize: '12px'}}>+ Add New</button>
          <button className="btn-outline" style={{height: '30px', width: '109px', backgroundColor: '#DB0406', fontSize: '12px'}}>Preferences</button>
        </div>
      </div>

      <div style={{position: 'relative', height: '0', marginBottom: '0', marginTop: '20px'}}>
        <img src="/src/assets/redcolor.png" alt="Red Color" style={{position: 'absolute', width: '312px', height: '5px', top: '-5px', left: '0', borderTopLeftRadius: '6px'}} />
      </div>

      <VoucherTable vouchers={vouchers} columns={voucherData.columns} style={{marginLeft: '10px'}} />
    </div>
  );
};

export default Vouchers;
