"use client";

import React from "react";

interface ModalAction {
  label: string; // Texto del botón
  onClick: () => void; // Función que se ejecuta al hacer clic
  className?: string; // Clases adicionales para personalizar el botón
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: ModalAction[]; // Lista de acciones (botones)
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, actions }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-neutral-800 rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        {title && (
          <h2 className="text-xl font-bold mb-4 text-black dark:text-white">
            {title}
          </h2>
        )}
        <div className="mb-4 text-black dark:text-neutral-200">{children}</div>
        <div className="flex justify-end gap-2">
          {/* Renderiza los botones basados en las acciones */}
          {actions?.map((action, index) => (
            <button
              key={index}
              onClick={action.onClick}
              className={`p-2 rounded-md ${action.className || "bg-blue-500 text-white hover:bg-blue-600"}`}
            >
              {action.label}
            </button>
          ))}
          {/* Botón de cerrar por defecto */}
          {!actions && (
            <button
              onClick={onClose}
              className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Cerrar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;