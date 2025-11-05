import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (email && password) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в систему!",
      });
      
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 animate-scale-in">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="TrendingUp" className="text-white" size={28} />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LeaseTech
            </span>
          </Link>
          <h1 className="text-2xl font-bold mt-4">Вход в систему</h1>
          <p className="text-muted-foreground mt-2">
            Введите ваши данные для доступа
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Icon 
                name="Mail" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Icon 
                name="Lock" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded" />
              <span className="text-muted-foreground">Запомнить меня</span>
            </label>
            <button type="button" className="text-primary hover:underline">
              Забыли пароль?
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            <Icon name="LogIn" className="mr-2" size={20} />
            Войти
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Нет аккаунта?{" "}
            <Link to="/register" className="text-primary hover:underline font-medium">
              Зарегистрироваться
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Login;
