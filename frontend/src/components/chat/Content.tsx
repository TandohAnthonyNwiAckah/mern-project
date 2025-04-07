import { Message } from '@/lib/types/message';
import { format } from 'date-fns';

 const Content = ({ 
  message, 
  isCurrentUser 
}: { 
  message: Message; 
  isCurrentUser: boolean 
}) => {
  return (
    <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs md:max-w-md rounded-lg p-3 relative ${
          isCurrentUser 
            ? 'bg-[#d9fdd3] rounded-tr-none' 
            : 'bg-white rounded-tl-none'
        } shadow-sm`}
      >
        {!isCurrentUser && (
          <div className="font-semibold text-blue-400 text-sm mb-1">
            {message.username}
          </div>
        )}
        <div className="text-gray-800">{message.text}</div>
        <div className={`text-xs mt-1 text-right ${isCurrentUser ? 'text-[#128c7e]' : 'text-gray-500'}`}>
          {format(new Date(message.timestamp), 'h:mm a')}
          {isCurrentUser && (
            <span className="ml-1 inline-block">✓✓</span>
          )}
        </div>
        
        <div
          className={`absolute top-0 w-3 h-3 ${
            isCurrentUser
              ? 'right-0 -mr-3 bg-[#d9fdd3] clip-path-right'
              : 'left-0 -ml-3 bg-white clip-path-left'
          }`}
        ></div>
      </div>
    </div>
  );
};


export default Content ;