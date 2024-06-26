import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import ChatProvider from "./context/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ChatProvider>
    <App />
  </ChatProvider>
);
