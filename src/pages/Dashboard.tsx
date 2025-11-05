import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const isAuth = localStorage.getItem("isAuthenticated");
    if (!isAuth) {
      navigate("/login");
    } else {
      setUserName(localStorage.getItem("userName") || "Пользователь");
      setUserRole(localStorage.getItem("userRole") || "client");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const applications = [
    { id: 1, asset: "Автомобиль Toyota Camry", amount: "2 500 000 ₽", status: "В обработке", progress: 45 },
    { id: 2, asset: "Оборудование производственное", amount: "5 000 000 ₽", status: "Одобрено", progress: 100 },
    { id: 3, asset: "Грузовой автомобиль", amount: "3 200 000 ₽", status: "На проверке", progress: 25 },
  ];

  const payments = [
    { date: "15.12.2024", amount: "45 000 ₽", status: "Оплачено" },
    { date: "15.01.2025", amount: "45 000 ₽", status: "Ожидается" },
    { date: "15.02.2025", amount: "45 000 ₽", status: "Ожидается" },
  ];

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

  const getStatusColor = (status: string) => {
    if (status === "Одобрено" || status === "Оплачено") return "default";
    if (status === "В обработке") return "secondary";
    return "outline";
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
            <div className="text-right hidden md:block">
              <p className="font-medium">{userName}</p>
              <p className="text-sm text-muted-foreground">{getRoleLabel(userRole)}</p>
            </div>
            {userRole === "admin" && (
              <Link to="/admin">
                <Button variant="outline" size="sm">
                  <Icon name="Settings" className="mr-2" size={16} />
                  Панель администратора
                </Button>
              </Link>
            )}
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-4xl font-bold mb-2">Личный кабинет</h1>
          <p className="text-muted-foreground">
            Управляйте заявками и отслеживайте платежи
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 animate-slide-up">
          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="FileText" className="text-primary" size={24} />
              </div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/20">+2 новых</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">3</h3>
            <p className="text-sm text-muted-foreground">Активные заявки</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Icon name="CreditCard" className="text-secondary" size={24} />
              </div>
              <Badge className="bg-secondary/10 text-secondary hover:bg-secondary/20">Актуально</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">45 000 ₽</h3>
            <p className="text-sm text-muted-foreground">Следующий платеж</p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name="CheckCircle" className="text-primary" size={24} />
              </div>
              <Badge className="bg-green-500/10 text-green-600 hover:bg-green-500/20">100%</Badge>
            </div>
            <h3 className="text-2xl font-bold mb-1">1</h3>
            <p className="text-sm text-muted-foreground">Одобренных заявок</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Мои заявки</h2>
              <Button size="sm" className="bg-gradient-to-r from-primary to-secondary">
                <Icon name="Plus" className="mr-2" size={16} />
                Новая заявка
              </Button>
            </div>

            <div className="space-y-4">
              {applications.map((app) => (
                <Card key={app.id} className="p-4 hover:shadow-md transition-all border-l-4 border-l-primary">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{app.asset}</h4>
                      <p className="text-sm text-muted-foreground">{app.amount}</p>
                    </div>
                    <Badge variant={getStatusColor(app.status)}>
                      {app.status}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Прогресс обработки</span>
                      <span className="font-medium">{app.progress}%</span>
                    </div>
                    <Progress value={app.progress} className="h-2" />
                  </div>
                </Card>
              ))}
            </div>
          </Card>

          <Card className="p-6 animate-fade-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">График платежей</h2>
              <Button variant="outline" size="sm">
                <Icon name="Download" className="mr-2" size={16} />
                Экспорт
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{payment.date}</TableCell>
                    <TableCell>{payment.amount}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-6 p-4 bg-muted rounded-lg">
              <div className="flex items-start gap-3">
                <Icon name="Info" className="text-secondary mt-1" size={20} />
                <div>
                  <p className="font-medium text-sm">Напоминание о платеже</p>
                  <p className="text-sm text-muted-foreground">
                    Следующий платеж 15.01.2025. Не забудьте пополнить счет заранее.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
