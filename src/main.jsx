import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { QuizProvider } from "./context/QuizProvider.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          backgroundColor: "#f4f4f4",
          paddingBlock: "18px",
          paddingInline: "9px",
          color: "#1c1c1c",
        },
      }}
    />
    <QuizProvider>
      <App />
    </QuizProvider>
  </BrowserRouter>
);
