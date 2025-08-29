import { createContext} from "react";
import { useEffect } from "react";
import { useState } from "react";



const ChatContext = createContext();




const ChatProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
    

    return(
        <ChatContext.Provider value={{user, setUser}}>
            {children}
        </ChatContext.Provider>
    )
}

export { ChatContext, ChatProvider };
export default ChatProvider;