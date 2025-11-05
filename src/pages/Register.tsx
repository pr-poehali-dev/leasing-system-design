import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Icon from "@/components/ui/icon";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive",
      });
      return;
    }

    if (formData.fullName && formData.email && formData.password && formData.role) {
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", formData.email);
      localStorage.setItem("userName", formData.fullName);
      localStorage.setItem("userRole", formData.role);
      
      toast({
        title: "Регистрация успешна",
        description: "Добро пожаловать в LeaseTech!",
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
          <h1 className="text-2xl font-bold mt-4">Регистрация</h1>
          <p className="text-muted-foreground mt-2">
            Создайте аккаунт для доступа к системе
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="fullName">ФИО</Label>
            <div className="relative">
              <Icon 
                name="User" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
              <Input
                id="fullName"
                placeholder="Иванов Иван Иванович"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Роль</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Выберите роль" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="client">Клиент</SelectItem>
                <SelectItem value="manager">Менеджер по лизингу</SelectItem>
                <SelectItem value="risk">Сотрудник отдела рисков</SelectItem>
                <SelectItem value="accountant">Бухгалтер</SelectItem>
                <SelectItem value="admin">Администратор</SelectItem>
              </SelectContent>
            </Select>
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
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтверждение пароля</Label>
            <div className="relative">
              <Icon 
                name="Lock" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-primary to-secondary hover:opacity-90"
            size="lg"
          >
            <Icon name="UserPlus" className="mr-2" size={20} />
            Зарегистрироваться
          </Button>

          <div className="text-center text-sm text-muted-foreground">
            Уже есть аккаунт?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Войти
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Register;
