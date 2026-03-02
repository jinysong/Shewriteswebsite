import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import { BookOpen, User } from "lucide-react";

export function Navigation() {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-8 right-8 z-50 flex gap-4" aria-label="Main navigation">
      <Button
        onClick={() => navigate("/catalog")}
        variant="outline"
        className="bg-black/30 backdrop-blur-md text-white border-white/30 hover:bg-black/50 hover:text-white transition-all"
        aria-label="View book catalog"
      >
        <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
        Catalog
      </Button>
      <Button
        onClick={() => navigate("/author")}
        variant="outline"
        className="bg-black/30 backdrop-blur-md text-white border-white/30 hover:bg-black/50 hover:text-white transition-all"
        aria-label="View author profile"
      >
        <User className="w-4 h-4 mr-2" aria-hidden="true" />
        Author
      </Button>
    </nav>
  );
}