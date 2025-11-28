import { Bot, LogOut, Trash2 } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
  userEmail?: string;
  onClearChat?: () => void;
}

export const ChatHeader = ({
  title = "Asistente Virtual",
  subtitle = "En línea",
  userEmail,
  onClearChat,
}: ChatHeaderProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "No se pudo cerrar sesión",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Sesión cerrada",
        description: "Has cerrado sesión correctamente",
      });
      navigate("/auth");
    }
  };
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-3 p-4 max-w-4xl mx-auto">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>
        <div className="flex flex-col flex-1">
          <h1 className="font-semibold text-foreground">{title}</h1>
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {onClearChat && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClearChat}
              className="h-9 w-9"
              title="Borrar conversación"
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Borrar conversación</span>
            </Button>
          )}
          {userEmail && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="h-9 w-9"
              title="Cerrar sesión"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Cerrar sesión</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};
