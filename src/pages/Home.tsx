import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { Link } from "react-router-dom";
import Mermaid from "react-mermaid2";

const Home = () => {
  const mermaidChart = `
    graph TD
      A[Клиент] --> B[Подать заявку на лизинг]
      A --> C[Оплатить лизинговый платеж]
      A --> D[Отправить запрос в поддержку]
      
      E[Менеджер по лизингу] --> F[Обработать заявку клиента]
      E --> G[Согласовать сделку]
      E --> H[Подготовить договор]
      E --> I[Зарегистрировать клиента]
      
      J[Сотрудник отдела рисков] --> K[Провести скоринг и проверку клиента]
      
      L[Бухгалтер] --> M[Учет платежей и начислений]
      L --> N[Учет основных средств]
      
      O[Администратор] --> P[Управление пользователями]
      O --> Q[Настройка системы]
      O --> R[Просмотр отчетности]
      
      B --> F
      F --> K
      K --> G
      G --> H
      I --> B
      C --> M
      H --> M
      
      style A fill:#9b87f5,stroke:#7E69AB,color:#fff
      style E fill:#0EA5E9,stroke:#0284c7,color:#fff
      style J fill:#0EA5E9,stroke:#0284c7,color:#fff
      style L fill:#0EA5E9,stroke:#0284c7,color:#fff
      style O fill:#1A1F2C,stroke:#000,color:#fff
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <Icon name="TrendingUp" className="text-white" size={24} />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              LeaseTech
            </span>
          </div>
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost">Вход</Button>
            </Link>
            <Link to="/register">
              <Button className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                Регистрация
              </Button>
            </Link>
          </nav>
        </div>
      </header>

      <section className="container mx-auto px-4 py-20 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Автоматизация лизинговых
            <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              процессов нового поколения
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Полный цикл управления лизинговыми сделками — от заявки до завершения контракта
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                <Icon name="Rocket" className="mr-2" size={20} />
                Начать работу
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                <Icon name="LogIn" className="mr-2" size={20} />
                Войти в систему
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-3 gap-6 animate-slide-up">
          <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-primary/20">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon name="Zap" className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Быстрая обработка</h3>
            <p className="text-muted-foreground">
              Автоматизированный скоринг и проверка клиентов за считанные минуты
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-secondary/20">
            <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
              <Icon name="Shield" className="text-secondary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Безопасность</h3>
            <p className="text-muted-foreground">
              Шифрование данных и разграничение прав доступа на уровне ролей
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1 border-primary/20">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Icon name="BarChart3" className="text-primary" size={24} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Аналитика</h3>
            <p className="text-muted-foreground">
              Детальная отчетность и контроль всех этапов лизинговых сделок
            </p>
          </Card>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold mb-4">Бизнес-процессы системы</h2>
            <p className="text-lg text-muted-foreground">
              Интерактивная диаграмма взаимодействия участников
            </p>
          </div>
          
          <Card className="p-8 bg-card/50 backdrop-blur animate-scale-in">
            <div className="overflow-x-auto">
              <Mermaid chart={mermaidChart} />
            </div>
          </Card>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Users" className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Клиентский модуль</h4>
                  <p className="text-sm text-muted-foreground">
                    Подача заявок, просмотр статусов, загрузка документов, история платежей
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Briefcase" className="text-secondary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Модуль менеджера</h4>
                  <p className="text-sm text-muted-foreground">
                    CRM-функционал, ведение базы клиентов, формирование договоров
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="FileSearch" className="text-primary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Модуль рисков</h4>
                  <p className="text-sm text-muted-foreground">
                    Скоринг клиентов, интеграция с внешними сервисами проверки
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="Calculator" className="text-secondary" size={20} />
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Модуль бухгалтерии</h4>
                  <p className="text-sm text-muted-foreground">
                    Автоматические графики платежей, учет оплат, формирование отчетов
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t mt-20 py-8 bg-muted/30">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 LeaseTech. Система автоматизации лизинговых процессов</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
