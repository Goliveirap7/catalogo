import React, { useState } from 'react';
import { toast } from 'react-toastify';

const CsvUploader = ({ onUpload, category }) => {
    const [file, setFile] = useState(null);
    
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleUpload = () => {
        if (!file) {
            toast.error('⚠️ Selecciona un archivo CSV primero');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const products = parseCsv(e.target.result);
                if(products.length > 0) {
                    onUpload(products);
                    toast.success(`✅ ${products.length} productos cargados de ${category}`);
                } else {
                    toast.warning('⚠️ El archivo no contiene productos válidos');
                }
            } catch (error) {
                toast.error(`❌ Error: ${error.message}`);
            }
        };
        reader.readAsText(file, 'UTF-8');
    };

    const parseCsv = (csvText) => {
        const rows = csvText.split(/\r\n|\n|\r/);
        if(rows.length < 2) throw new Error('El archivo está vacío');
        
        const header = rows[0].toLowerCase().split(';');
        if(!header.includes('productos') || !header.includes('precios') || !header.includes('imagen')) {
            throw new Error('Formato inválido. Encabezados requeridos: PRODUCTOS;PRECIOS;IMAGEN');
        }

        return rows.slice(1).map((row, index) => {
            try {
                if(!row.trim()) return null;
                
                const columns = row.split(';').map(c => c.trim());
                if(columns.length < 3) throw new Error(`Fila ${index + 1}: Formato incorrecto`);

                let [nombre, precio, imagen = ''] = columns;
                
                // Validaciones básicas
                if(!nombre || !precio) throw new Error(`Fila ${index + 1}: Nombre o precio faltante`);
                
                // Procesar precio
                const precioLimpio = precio.replace('S/', '')
                                         .replace(/[^\d.,]/g, '')
                                         .replace(',', '.');
                const precioNumerico = parseFloat(precioLimpio);
                if(isNaN(precioNumerico)) throw new Error(`Fila ${index + 1}: Precio inválido`);

                // Manejar imagen faltante
                const tieneImagen = !!imagen.trim();
                if(!tieneImagen) {
                    console.warn(`Advertencia: Fila ${index + 1} - Imagen no especificada`);
                }

                return {
                    name: nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, ""),
                    price: precioNumerico,
                    image: tieneImagen ? imagen : '/imagenes/placeholder.jpg',
                    hasImageWarning: !tieneImagen,
                    category: category.toLowerCase()
                };
                
            } catch (error) {
                toast.error(error.message);
                return null;
            }
        }).filter(Boolean);
    };

    return (
        <div className="csv-uploader">
            <div className="uploader-header">
                <h3>Cargar productos para {category}</h3>
                <div className="file-input-container">
                    <input 
                        type="file" 
                        accept=".csv" 
                        onChange={handleFileChange}
                        className="csv-file-input"
                    />
                    <button 
                        onClick={handleUpload}
                        className="upload-button"
                        disabled={!file}
                    >
                        📤 Subir CSV
                    </button>
                </div>
                
                {file && (
                    <div className="file-details">
                        <p>📄 Archivo: {file.name}</p>
                        <p>📦 Tamaño: {(file.size / 1024).toFixed(1)} KB</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CsvUploader;