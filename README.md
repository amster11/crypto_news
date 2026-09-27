# Business Services — корпоративный сайт

Премиальный сайт компании юридических и бизнес-услуг: юридический адрес, регистрация бизнеса, бизнес под ключ, сопутствующие услуги.

**Стек:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lucide Icons. Framer Motion не используется: анимации сделаны на CSS и одном IntersectionObserver.

## Запуск

```bash
npm install
cp .env.example .env.local   # укажите NEXT_PUBLIC_SITE_URL
npm run dev                  # http://localhost:3000
npm run lint && npm run build
```

## Где менять контент

| Что | Файл |
| --- | --- |
| Название, контакты, реквизиты, соцсети, URL | `src/config/site.ts` |
| Услуги (тексты, состав, этапы, цена, FAQ) | `src/data/services.ts` |
| Пакеты и цены, доп. услуги | `src/data/pricing.ts` |
| FAQ | `src/data/faq.ts` |
| Отзывы | `src/data/testimonials.ts` |
| Hero, преимущества, процесс, «О компании», цифры | `src/data/content.ts` |
| Фотографии | `src/data/images.ts` |
| Меню и URL страниц | `src/data/navigation.ts` |
| Политика и условия (шаблоны) | `src/data/legal.ts` |
| Цвета, шрифты, типографика | `src/app/globals.css` (`@theme`) |

### Плейсхолдеры

Значения в квадратных скобках (`[Телефон]`, `[Email]`, `[Ответ на вопрос]`, `€XX`, `[XX]+` …) — это заглушки. Реальные данные нигде не выдуманы. Функция `isFilled()` (`src/lib/utils.ts`) автоматически исключает заглушки:

- из ссылок `tel:`, `mailto:` и WhatsApp;
- из Schema.org: `Organization` появится после заполнения названия, `LocalBusiness` — после адреса, `FAQPage` — после ответов, `Offer` у `Service` — после цены.

## Страницы

`/` · `/uslugi` · `/yuridicheskiy-adres` · `/registraciya-biznesa` · `/biznes-pod-klyuch` · `/dopolnitelnye-uslugi` · `/ceny` · `/o-kompanii` · `/faq` · `/kontakty` · `/politika-konfidencialnosti` · `/usloviya-ispolzovaniya` · 404, а также `sitemap.xml`, `robots.txt` и OG-изображение `/og.png`.

## Форма заявки

`src/components/ContactForm.tsx` отправляет данные в `POST /api/lead` (`src/app/api/lead/route.ts`). Валидация общая для клиента и сервера (`src/lib/leads.ts`), есть honeypot-защита от ботов.

Доставку выполняет `deliverLead()` в `src/lib/leads.ts`:

- задан `LEAD_WEBHOOK_URL` — заявка отправляется JSON-запросом на этот адрес;
- не задан — заявка только пишется в лог сервера.

Для email (Resend/SMTP) или Telegram замените тело `deliverLead()`.

## Изображения

Сейчас используются фото с Unsplash через `next/image` (AVIF/WebP, lazy loading). Если изображение не загрузилось, компонент `Photo` показывает фирменную navy-заглушку. Разрешённые хосты задаются в `next.config.ts → images.remotePatterns`.

## Хостинг

Нужен Node.js-хостинг: Vercel, любой Node-сервер (`npm run build && npm start`) или Docker. Статический экспорт не подходит, потому что форма использует API route.
