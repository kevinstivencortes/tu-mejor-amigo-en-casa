import React from 'react';

const ConfirmacionModal = ({ show, onConfirm, onCancel }) => {
    if (!show) {
        return null;
    }

    const confirmarEliminacion = () => {
        onConfirm();
        onCancel(); // Cerrar el modal después de confirmar
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-10 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
                <p className="text-black">¿Estás seguro de que quieres eliminar esta mascota?</p>
                <div className="flex justify-end space-x-2 mt-5">
                    <button onClick={onCancel} className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
                    <button onClick={confirmarEliminacion} className="px-4 py-2 bg-red-500 text-white rounded">Confirmar</button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmacionModal;

