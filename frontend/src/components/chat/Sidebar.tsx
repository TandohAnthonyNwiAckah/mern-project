import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface SidebarProps {
  isVisible: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="hidden lg:flex flex-col w-1/4 bg-white shadow-md">
      <div className="p-4  border-gray-300 flex justify-between items-center">
        <h2 className="text-lg font-semibold">TODO</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          <AiOutlineClose className="h-6 w-6" /> 
        </button>
      </div>
      <div className="flex-1 overflow-y-auto">
    
        <ul className="space-y-2 p-4">
          <li className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
           ...
          </li>
          <li className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          ...
          </li>
          <li className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 cursor-pointer">
          ...
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;