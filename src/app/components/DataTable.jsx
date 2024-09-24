"use client"

import { useState } from 'react';

export default function DataTable({ data }) {
  const [tableData, setTableData] = useState(data);

  const handleInputChange = (e, index, key) => {
    const updatedData = [...tableData];
    updatedData[index][key] = e.target.value;
    setTableData(updatedData);
  };

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(tableData[0] || {}).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, index) => (
          <tr key={index}>
            {Object.keys(row).map((key) => (
              <td key={key}>
                <input
                  value={row[key]}
                  onChange={(e) => handleInputChange(e, index, key)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
