import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChatContext } from "@/context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const TheHeader = () => {
  const { user, setUser}: any = useContext(ChatContext);
  const navigate=useNavigate()
  return (
    <div className="flex justify-between max-w-5xl w-full items-center">
      <a className="text-4xl font-bold text-gray-400">shadcn-chat</a>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar} alt="PH" />
              <AvatarFallback>PH</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1 w-full">
              <button
                className="w-full"
                onClick={() => {
                  localStorage.removeItem("user");
                  localStorage.removeItem("token");
                  setUser();
                  navigate('/signin')
                }}
              >
                Đăng xuất
              </button>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default TheHeader;
