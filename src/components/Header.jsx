import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 lg:px-8 pt-8 pb-3">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
        title="Go to Home"
      >
        <img
          src="/logo.png"
          alt="Company Logo"
          className="h-6 w-auto object-contain"
        />
      </button>
    </header>
  );
}