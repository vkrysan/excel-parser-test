"use client"

import { useState } from 'react';
import * as XLSX from 'xlsx';
import Papa from 'papaparse';

export default function FileUploader({ onFileLoad }) {
  const [file, setFile] = useState(null);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    if (uploadedFile.name.endsWith('.csv')) {
      Papa.parse(uploadedFile, {
        header: true,
        complete: (results) => {
          onFileLoad(results.data);
        },
      });
    } else if (uploadedFile.name.endsWith('.xlsx')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        onFileLoad(worksheet);
      };
      reader.readAsArrayBuffer(uploadedFile);
    }
  };

  return (
    <div className="file-upload">
      <input
        type="file"
        accept=".csv, .xlsx"
        onChange={handleFileUpload}
        id="file-input"
      />
      <label htmlFor="file-input" className="custom-file-upload">
        Выбрать файл
      </label>
      {file && <p>Загружен файл: {file.name}</p>}
    </div>
  );
}
