import { GraduationCap, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = ({ size = "default" }: { size?: "default" | "large" }) => {
  const isLarge = size === "large";
  
  return (
    <Link to="/" className="flex items-center gap-2 group">
      <div className={`relative flex items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent ${isLarge ? 'w-12 h-12' : 'w-10 h-10'} shadow-soft group-hover:shadow-glow transition-all duration-300`}>
        <GraduationCap className={`${isLarge ? 'w-7 h-7' : 'w-5 h-5'} text-primary-foreground`} />
        <Sparkles className="w-3 h-3 text-warning absolute -top-1 -right-1 animate-pulse" />
      </div>
      <span className={`font-display font-bold ${isLarge ? 'text-3xl' : 'text-xl'} bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`}>
        Neolearn
      </span>
    </Link>
  );
};

export default Logo;
