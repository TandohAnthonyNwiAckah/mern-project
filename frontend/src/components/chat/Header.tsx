import { IoSettingsOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";


interface HeaderProps {
  onToggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <div className="bg-blue-500 text-white p-3 flex items-center justify-between shadow-md">
      <div className="flex items-center">
       
        <button 
           onClick={onToggleSidebar}
        className="mr-2 p-1 rounded-full hover:bg-blue-500">
          < RxHamburgerMenu  className="text-xl" />
        </button>
      
        <div className="ml-2">
          <h1 className="font-semibold">XupChat Group Chat</h1>
          <p className="text-xs opacity-80">Small groups, big conversations.</p>
        </div>
      </div>


      <button className="p-1 rounded-full hover:bg-blue-500">
        <IoSettingsOutline className="text-xl" />
      </button>
    </div>
  );
};


export default Header;
