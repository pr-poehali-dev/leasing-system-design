import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Admin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: "Иван Петров", email: "ivan@example.com", role: "manager", status: "active" },
    { id: 2, name: "Мария Сидорова", email: "maria@example.com", role: "accountant", status: "active" },
    { id: 3, name: "Алексей Смирнов", email: "alex@example.com", role: "risk", status: "active" },
    { id: 4, name: "Ольга Иванова", email: "olga@example.com", role: "client", status: "blocked" },
  ]);

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    const userRole = localStorage.getItem("userRole");
    if (!isAuth || userRole !== "admin") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      client: "Клиент",
      manager: "Менеджер",
      risk: "Отдел рисков",
      accountant: "Бухгалтер",
      admin: "Администратор",
    };
    return roles[role] || role;
  };

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === "active" ? "blocked" : "active" }
        : user
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="TrendingUp" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LeaseTech
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <Icon name="LayoutDashboard" className="mr-2" size={16} />
                Личный кабинет
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Shield" className="text-primary" size={28} />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Панель администратора</h1>
              <p className="text-muted-foreground">
                Управление пользователями и системой
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8 animate-slide-up">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon name="Users" className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-1">{users.length}</h3>
            <p className="text-sm text-muted-foreground">Всего пользователей</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Icon name="UserCheck" className="text-green-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {users.filter(u => u.status === "active").length}
            </h3>
            <p className="text-sm text-muted-foreground">Активных</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
              <Icon name="UserX" className="text-red-600" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-1">
              {users.filter(u => u.status === "blocked").length}
            </h3>
            <p className="text-sm text-muted-foreground">Заблокированных</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Icon name="Activity" className="text-secondary" size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-1">98%</h3>
            <p className="text-sm text-muted-foreground">Uptime системы</p>
          </Card>
        </div>

        <Card className="p-6 animate-fade-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Управление пользователями</h2>
            <div className="flex gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-primary to-secondary">
                    <Icon name="UserPlus" className="mr-2" size={16} />
                    Добавить пользователя
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Новый пользователь</DialogTitle>
                    <DialogDescription>
                      Создайте учетную запись для нового сотрудника
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <div className="space-y-2">
                      <Label>ФИО</Label>
                      <Input placeholder="Иванов Иван Иванович" />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input type="email" placeholder="email@example.com" />
                    </div>
                    <div className="space-y-2">
                      <Label>Роль</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="manager">Менеджер</SelectItem>
                          <SelectItem value="risk">Отдел рисков</SelectItem>
                          <SelectItem value="accountant">Бухгалтер</SelectItem>
                          <SelectItem value="admin">Администратор</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button className="w-full">Создать пользователя</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Icon 
                name="Search" 
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" 
                size={18} 
              />
              <Input 
                placeholder="Поиск по имени или email..." 
                className="pl-10"
              />
            </div>
          </div>

          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{getRoleLabel(user.role)}</TableCell>
                    <TableCell>
                      <Badge 
                        variant={user.status === "active" ? "default" : "destructive"}
                      >
                        {user.status === "active" ? "Активен" : "Заблокирован"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Icon name="Pencil" size={16} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => toggleUserStatus(user.id)}
                        >
                          {user.status === "active" ? (
                            <Icon name="Ban" size={16} className="text-red-600" />
                          ) : (
                            <Icon name="CheckCircle" size={16} className="text-green-600" />
                          )}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="Settings" className="text-primary" size={20} />
              </div>
              <h3 className="text-xl font-bold">Настройки системы</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Database" className="mr-2" size={18} />
                Управление базой данных
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="FileText" className="mr-2" size={18} />
                Шаблоны документов
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Bell" className="mr-2" size={18} />
                Уведомления системы
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="BarChart3" className="text-secondary" size={20} />
              </div>
              <h3 className="text-xl font-bold">Отчетность</h3>
            </div>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Icon name="TrendingUp" className="mr-2" size={18} />
                Статистика по заявкам
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="DollarSign" className="mr-2" size={18} />
                Финансовые отчеты
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Icon name="Download" className="mr-2" size={18} />
                Экспорт данных
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Admin;
