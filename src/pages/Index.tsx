import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "О работах", href: "#works" },
  { label: "Услуги", href: "#services" },
  { label: "Запись", href: "#booking" },
  { label: "Контакты", href: "#contacts" },
];

const WORKS = [
  {
    icon: "Eye",
    title: "Ежедневное обслуживание (ЕО)",
    items: [
      "Очистка двигателя от внешних загрязнений",
      "Визуальный осмотр состояния узлов",
      "Прослушивание работы на разных режимах",
      "Проверка отсутствия стуков клапанов",
    ],
  },
  {
    icon: "Wrench",
    title: "Техническое обслуживание №1 (ТО-1)",
    items: [
      "Все работы ЕО",
      "Проверка герметичности поддона картера",
      "Контроль крепления двигателя к раме",
      "Осмотр резиновых элементов и сальников",
      "Прослушивание клапанного механизма",
    ],
  },
  {
    icon: "Settings",
    title: "Техническое обслуживание №2 (ТО-2)",
    items: [
      "Все работы ТО-1",
      "Подтяжка крепления головок цилиндров",
      "Регулировка тепловых зазоров в ГРМ",
      "Проверка и регулировка натяжения цепи/ремня",
      "Подтяжка крепления передней крышки двигателя",
    ],
  },
  {
    icon: "RotateCcw",
    title: "Сезонное обслуживание (СО)",
    items: [
      "Полная диагностика состояния ГРМ",
      "Проверка правильности установки фаз газораспределения",
      "Контроль состояния кулачков и толкателей",
      "Проверка работы гидроопор клапанов",
      "Притирка клапанных фасок при необходимости",
    ],
  },
];

const SERVICES = [
  {
    title: "Замена ремня ГРМ",
    desc: "Плановая замена с проверкой натяжителей и роликов. Оригинальные и сертифицированные запчасти.",
    interval: "45 000 – 120 000 км",
  },
  {
    title: "Замена цепи ГРМ",
    desc: "Диагностика вытяжки цепи, замена при необходимости с регулировкой натяжителя.",
    interval: "80 000 – 150 000 км",
  },
  {
    title: "Регулировка зазоров клапанов",
    desc: "Точная регулировка тепловых зазоров между стержнями клапанов и носками коромысел.",
    interval: "По ТО-2",
  },
  {
    title: "Установка фаз газораспределения",
    desc: "Проверка и коррекция фаз с применением специализированного инструмента и фиксаторов валов.",
    interval: "При ремонте",
  },
  {
    title: "Диагностика ГРМ",
    desc: "Комплексная проверка состояния механизма: ремень, цепь, ролики, натяжители, сальники.",
    interval: "Ежегодно",
  },
  {
    title: "Притирка клапанов",
    desc: "Восстановление герметичности камеры сгорания. Притирка конусных фасок клапанов к сёдам.",
    interval: "По необходимости",
  },
];

const TIME_SLOTS = [
  "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
];

const DAY_NAMES = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
const MONTH_NAMES = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

function getWeekDates() {
  const days: Date[] = [];
  const today = new Date();
  for (let i = 1; i <= 16; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() !== 0) {
      days.push(d);
    }
  }
  return days.slice(0, 10);
}

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", service: "", comment: "" });
  const [submitted, setSubmitted] = useState(false);

  const weekDates = getWeekDates();

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !form.name || !form.phone) return;
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "'Golos Text', sans-serif" }}>

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-foreground flex items-center justify-center">
              <Icon name="Cog" size={16} className="text-background" />
            </div>
            <span className="font-semibold text-lg tracking-wide uppercase" style={{ fontFamily: "'Oswald', sans-serif" }}>ТО ГРМ</span>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="nav-link text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <button
            className="hidden md:flex items-center gap-2 bg-foreground text-background px-5 py-2 text-sm font-medium hover:opacity-80 transition-opacity"
            onClick={() => handleNav("#booking")}
          >
            Записаться
          </button>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            <Icon name={menuOpen ? "X" : "Menu"} size={22} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="block w-full text-left px-6 py-3 text-sm border-b border-border hover:bg-muted transition-colors"
              >
                {l.label}
              </button>
            ))}
            <div className="p-4">
              <button
                className="w-full bg-foreground text-background py-3 text-sm font-medium"
                onClick={() => handleNav("#booking")}
              >
                Записаться онлайн
              </button>
            </div>
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto animate-fade-in">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-medium text-muted-foreground border border-border px-3 py-1 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block"></span>
              Принимаем заявки онлайн
            </div>
            <h1 className="text-5xl md:text-6xl font-bold leading-none tracking-tight uppercase mb-6" style={{ fontFamily: "'Oswald', sans-serif" }}>
              Техническое<br />
              <span style={{ color: "hsl(16, 85%, 50%)" }}>обслуживание</span><br />
              ГРМ
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8 max-w-md">
              Профессиональный уход за газораспределительным механизмом вашего автомобиля. Точная диагностика, регулировка и замена деталей.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button
                className="bg-foreground text-background px-8 py-3.5 font-medium hover:opacity-80 transition-opacity"
                onClick={() => handleNav("#booking")}
              >
                Записаться на ТО
              </button>
              <button
                className="border border-border px-8 py-3.5 font-medium hover:bg-muted transition-colors"
                onClick={() => handleNav("#services")}
              >
                Список услуг
              </button>
            </div>
          </div>

          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { num: "15+", label: "лет опыта" },
              { num: "2 000+", label: "выполненных ТО" },
              { num: "100%", label: "гарантия качества" },
              { num: "1 день", label: "срок выполнения" },
            ].map((s) => (
              <div key={s.num} className="bg-card border border-border p-6 card-hover">
                <div className="text-3xl font-bold mb-1" style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(16, 85%, 50%)" }}>{s.num}</div>
                <div className="text-sm text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WORKS */}
      <section id="works" className="py-20 px-6" style={{ background: "hsl(0, 0%, 95%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="section-line">
            <h2 className="text-4xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Виды работ</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Комплекс мероприятий по поддержанию работоспособности ГРМ, обеспечению герметичности камеры сгорания и оптимального наполнения цилиндров.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {WORKS.map((w, i) => (
              <div key={i} className="bg-card border border-border p-8 card-hover">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 bg-foreground flex items-center justify-center shrink-0">
                    <Icon name={w.icon as "Eye" | "Wrench" | "Settings" | "RotateCcw"} size={18} className="text-background" />
                  </div>
                  <h3 className="text-xl font-semibold uppercase tracking-wide" style={{ fontFamily: "'Oswald', sans-serif" }}>{w.title}</h3>
                </div>
                <ul className="space-y-2.5">
                  {w.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="w-1 h-1 rounded-full mt-2 shrink-0" style={{ background: "hsl(16, 85%, 50%)" }}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-6 aspect-video w-full">
            <iframe
              src="https://rutube.ru/play/embed/37603ccbbf2626762435aaff5552cb60"
              className="w-full h-full"
              frameBorder="0"
              allow="clipboard-write; autoplay"
              allowFullScreen
            />
          </div>

          <div className="mt-8 bg-foreground text-background p-6 md:p-8">
            <div className="flex items-start gap-4">
              <Icon name="AlertTriangle" size={20} className="shrink-0 mt-0.5" style={{ color: "hsl(16, 85%, 65%)" } as React.CSSProperties} />
              <div>
                <p className="font-medium mb-1">Важно знать</p>
                <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>
                  Нерегулярное техническое обслуживание приводит к снижению мощности двигателя, увеличению расхода топлива и преждевременному износу узлов. Точная установка фаз газораспределения — критически важный этап при ремонте.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-line">
            <h2 className="text-4xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Услуги</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Все виды работ выполняются с применением специализированного оборудования и фирменного инструмента.
          </p>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-background p-8 card-hover">
                <div className="text-xs font-medium uppercase tracking-widest mb-3" style={{ color: "hsl(16, 85%, 50%)" }}>
                  {s.interval}
                </div>
                <h3 className="text-xl font-semibold uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING */}
      <section id="booking" className="py-20 px-6" style={{ background: "hsl(0, 0%, 95%)" }}>
        <div className="max-w-6xl mx-auto">
          <div className="section-line">
            <h2 className="text-4xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Онлайн-запись</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Выберите удобную дату и время, укажите свои данные — мы подтвердим запись по телефону.
          </p>

          {submitted ? (
            <div className="bg-card border border-border p-12 text-center max-w-lg mx-auto">
              <div className="w-16 h-16 bg-foreground flex items-center justify-center mx-auto mb-6">
                <Icon name="CheckCheck" size={28} className="text-background" />
              </div>
              <h3 className="text-2xl font-bold uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif" }}>Заявка принята!</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                Ваша запись на{" "}
                <strong>{selectedDate && `${selectedDate.getDate()} ${MONTH_NAMES[selectedDate.getMonth()]}`}</strong>{" "}
                в <strong>{selectedTime}</strong> получена. Мы позвоним для подтверждения.
              </p>
              <button
                className="text-sm underline underline-offset-4 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setSubmitted(false);
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setForm({ name: "", phone: "", service: "", comment: "" });
                }}
              >
                Записаться ещё раз
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-10">
              <div>
                <p className="text-sm font-medium mb-4">1. Выберите дату</p>
                <div className="grid grid-cols-5 gap-2 mb-8">
                  {weekDates.map((d, i) => (
                    <button
                      type="button"
                      key={i}
                      onClick={() => setSelectedDate(d)}
                      className={`flex flex-col items-center py-3 border text-sm transition-colors ${
                        selectedDate?.toDateString() === d.toDateString()
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground bg-card"
                      }`}
                    >
                      <span className="text-xs mb-1" style={{ opacity: 0.6 }}>{DAY_NAMES[d.getDay()]}</span>
                      <span className="text-lg font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>{d.getDate()}</span>
                      <span className="text-xs" style={{ opacity: 0.6 }}>{MONTH_NAMES[d.getMonth()]}</span>
                    </button>
                  ))}
                </div>

                <p className="text-sm font-medium mb-4">2. Выберите время</p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((t) => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setSelectedTime(t)}
                      className={`py-2.5 border text-sm font-medium transition-colors ${
                        selectedTime === t
                          ? "bg-foreground text-background border-foreground"
                          : "border-border hover:border-foreground bg-card"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-4">3. Ваши данные</p>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Ваше имя *</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Телефон *</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                      placeholder="+7 914 138 08 65"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Услуга</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors"
                    >
                      <option value="">— выберите услугу —</option>
                      {SERVICES.map((s) => (
                        <option key={s.title} value={s.title}>{s.title}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block uppercase tracking-wide">Комментарий</label>
                    <textarea
                      value={form.comment}
                      onChange={(e) => setForm({ ...form, comment: e.target.value })}
                      className="w-full border border-border bg-card px-4 py-3 text-sm focus:outline-none focus:border-foreground transition-colors resize-none"
                      rows={3}
                      placeholder="Марка и модель авто, описание проблемы..."
                    />
                  </div>

                  {selectedDate && selectedTime && (
                    <div className="bg-muted border border-border px-4 py-3 text-sm flex items-center gap-2">
                      <Icon name="Calendar" size={14} style={{ color: "hsl(16, 85%, 50%)" } as React.CSSProperties} />
                      <span>
                        Запись: <strong>{selectedDate.getDate()} {MONTH_NAMES[selectedDate.getMonth()]}</strong> в <strong>{selectedTime}</strong>
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={!selectedDate || !selectedTime}
                    className="w-full bg-foreground text-background py-4 font-medium text-sm hover:opacity-80 transition-opacity disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    Отправить заявку
                  </button>
                  <p className="text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </div>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="section-line">
            <h2 className="text-4xl font-bold uppercase tracking-tight" style={{ fontFamily: "'Oswald', sans-serif" }}>Контакты</h2>
          </div>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Приезжайте или звоните — расскажем о состоянии вашего ГРМ и подберём оптимальный вариант обслуживания.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                icon: "Phone" as const,
                title: "Телефон",
                lines: ["+7 914 138 08 65"],
                sub: "Пн–Сб, 9:00–18:00",
                action: "tel:+79141380865",
                actionLabel: "Позвонить",
              },
              {
                icon: "Mail" as const,
                title: "Электронная почта",
                lines: ["kirya.gromov.23@bk.ru"],
                sub: "Ответим в течение дня",
                action: "mailto:kirya.gromov.23@bk.ru",
                actionLabel: "Написать",
              },
              {
                icon: "MapPin" as const,
                title: "Адрес",
                lines: ["г. Хилок", "ул. Карла Маркса, 38"],
                sub: "Пн–Сб, 9:00–18:00",
                action: null as null,
                actionLabel: null as null,
              },
            ].map((c, i) => (
              <div key={i} className="bg-card border border-border p-8 card-hover">
                <div className="w-10 h-10 bg-foreground flex items-center justify-center mb-5">
                  <Icon name={c.icon} size={18} className="text-background" />
                </div>
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">{c.title}</div>
                {c.lines.map((l, j) => (
                  <p key={j} className="text-xl font-semibold" style={{ fontFamily: "'Oswald', sans-serif" }}>{l}</p>
                ))}
                <p className="text-xs text-muted-foreground mt-1 mb-4">{c.sub}</p>
                {c.action && (
                  <a
                    href={c.action}
                    className="inline-flex items-center gap-2 text-sm font-medium border border-foreground px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
                  >
                    {c.actionLabel}
                    <Icon name="ArrowRight" size={14} />
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="bg-foreground text-background p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xl font-semibold uppercase mb-1" style={{ fontFamily: "'Oswald', sans-serif" }}>Готовы ответить на вопросы</p>
              <p className="text-sm leading-relaxed" style={{ opacity: 0.7 }}>Если не уверены, нужно ли обслуживание — позвоните, и мы проконсультируем бесплатно.</p>
            </div>
            <a
              href="tel:+79141380865"
              className="shrink-0 border border-background text-background px-8 py-3.5 font-medium text-sm hover:bg-background hover:text-foreground transition-colors inline-flex items-center gap-2"
            >
              <Icon name="Phone" size={16} />
              Позвонить сейчас
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-foreground flex items-center justify-center">
              <Icon name="Cog" size={10} className="text-background" />
            </div>
            <span className="font-semibold uppercase tracking-wide text-foreground" style={{ fontFamily: "'Oswald', sans-serif" }}>ТО ГРМ</span>
            <span>— г. Хилок, ул. Карла Маркса, 38</span>
          </div>
          <div className="flex gap-6">
            {NAV_LINKS.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="hover:text-foreground transition-colors"
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>
      </footer>

    </div>
  );
}