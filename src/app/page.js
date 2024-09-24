"use client"

import { useState } from 'react';
import FileUploader from './components/FileUploader';
import DataTable from './components/DataTable';
import InventoryChart from './components/InventoryChart';

export default function Home() {
  const [inventoryData, setInventoryData] = useState([]);  

  return (
    <div>
      <h1 style={{ textAlign: 'center', padding: '20px' }}>Визуализация данных о запасах товаров</h1>
      <FileUploader onFileLoad={setInventoryData} />
      {inventoryData.length > 0 && (
        <>
          <DataTable data={inventoryData} />
          <InventoryChart data={inventoryData} />
        </>
      )}
    </div>
  );
}
