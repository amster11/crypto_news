# Business Services — корпоративный сайт

Премиальный сайт компании юридических и бизнес-услуг в Москве: регистрация ООО/АО/ИП, юридические адреса от собственников, налоговые проверки, ликвидация, консалтинг.

Рукописное ТЗ заказчика и его расшифровка — `docs/tz/`.

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
| Название, телефон, почта, Telegram, MAX, адрес, реквизиты | `src/config/site.ts` |
| Услуги, прайс (позиции и цены в ₽), этапы, FAQ | `src/data/services.ts` |
| Карточки цен на главной, примечания к ценам | `src/data/pricing.ts` |
| FAQ | `src/data/faq.ts` |
| Отзывы | `src/data/testimonials.ts` |
| Hero, «Наши преимущества», процесс, «О компании», цифры | `src/data/content.ts` |
| Фотографии | `src/data/images.ts` |
| Меню и URL страниц | `src/data/navigation.ts` |
| Политика и условия (шаблоны) | `src/data/legal.ts` |
| Цвета, шрифты, типографика | `src/app/globals.css` (`@theme`) |

### Плейсхолдеры

Значения в квадратных скобках (`[Телефон]`, `[Email]`, `[Ответ на вопрос]`, `€XX`, `[XX]+` …) — это заглушки. Реальные данные нигде не выдуманы. Функция `isFilled()` (`src/lib/utils.ts`) автоматически исключает заглушки:

- из ссылок `tel:`, `mailto:`, Telegram и MAX;
- из Schema.org: `Organization` появится после заполнения названия, `LocalBusiness` — после адреса, `FAQPage` — только вопросы с заполненными ответами.

## Страницы

`/` · `/uslugi` · `/registraciya-biznesa` · `/yuridicheskiy-adres` · `/nalogovye-proverki` · `/likvidaciya` · `/konsalting` · `/ceny` · `/o-kompanii` · `/faq` · `/kontakty` · `/politika-konfidencialnosti` · `/usloviya-ispolzovaniya` · 404, а также `sitemap.xml`, `robots.txt` и OG-изображение `/og.png`.

## Форма заявки

Форма «Обратный звонок» (`src/components/ContactForm.tsx`: имя, телефон, почта — необязательно, услуга, сообщение) отправляет данные в `POST /api/lead` (`src/app/api/lead/route.ts`). Валидация общая для клиента и сервера (`src/lib/leads.ts`), есть honeypot-защита от ботов. Кнопки «Заказать» (`OrderButton`) прокручивают к форме на текущей странице и подставляют выбранную услугу.

Доставку выполняет `deliverLead()` в `src/lib/leads.ts`:

- задан `LEAD_WEBHOOK_URL` — заявка отправляется JSON-запросом на этот адрес;
- не задан — заявка только пишется в лог сервера.

Для email (Resend/SMTP) или Telegram замените тело `deliverLead()`.

## Изображения

Сейчас используются фото с Unsplash через `next/image` (AVIF/WebP, lazy loading). Если изображение не загрузилось, компонент `Photo` показывает фирменную navy-заглушку. Разрешённые хосты задаются в `next.config.ts → images.remotePatterns`.

## Хостинг

Нужен Node.js-хостинг: Vercel, любой Node-сервер (`npm run build && npm start`) или Docker. Статический экспорт не подходит, потому что форма использует API route.
