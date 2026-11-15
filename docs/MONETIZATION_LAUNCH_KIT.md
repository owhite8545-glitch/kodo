# KODŌ — Monetization & Commercial Launch Kit

> **Live Interactive Demo:** https://kodo-livid.vercel.app/  
> **Tech Stack Verified:** Next.js 16.2.12 (App Router / Turbopack) · React 19.2.4 · TypeScript 5 · Stripe SDK v22 (with Webhook + HMAC-Signed Demo Fallback) · Upstash Redis · Zustand 5 · Zod 4 · Custom Obsidian / Alabaster / Muted-Gold Design Tokens (`oklch`) · `node --test` Suite (14 Tests)

---

## 1. The 3 Fast-Track Revenue Paths

You do not need to wait months to earn from KODŌ. The live site at **https://kodo-livid.vercel.app/** is already a complete, zero-error editorial flagship. Monetize it simultaneously through three tiers of effort and margin:

1. **Path A — Digital Flagship Template (Passive / Scalable Income: $69 – $189 per sale)**  
   Sell the full source code & design system on **Lemon Squeezy** (built-in Merchant of Record + VAT handling + Payoneer/bank payout) or **Gumroad** targeting creative developers, design studios, and Shopify/headless agency owners.
2. **Path B — Direct B2B Rebrand for Niche Perfume & Oud Houses (High-Ticket Cashflow: $399 – $1,800+ per client)**  
   Pitch boutique oud, bakhoor, niche fragrance, tea, and ceramics brands (especially in **UAE, Saudi Arabia, Kuwait, Qatar, Egypt, and EU/UK boutiques**) whose current websites fail to match the luxury of their bottles. Send them https://kodo-livid.vercel.app/ on mobile + desktop as a live preview.
3. **Path C — Template Upsell -> Custom Deployment Service**  
   Every digital buyer on Gumroad/Lemon Squeezy sees a Done-For-You customization offer inside the product description and README (`$399+ setup`), turning $69 template buyers into high-margin service clients.

---

## 2. Productized Pricing Tiers

| Tier | Name | Recommended Price | Included Scope | Ideal Buyer |
| :--- | :--- | :--- | :--- | :--- |
| **Tier 1** | **Starter / Single Brand** | **$69** | Complete Next.js 16 + TypeScript codebase, 23 routes (Home, Collections filterable gallery, Dynamic PDP with 50ml/100ml variants, Slide-over Cart Drawer, Story, About, Journal + MDX-ready structure, Concierge, Checkout + Demo Receipt, Legal pages), CSS Token System, 14 automated unit/asset/security tests. Single commercial brand use. | Indie fragrance founder or solo frontend engineer launching one flagship store. |
| **Tier 2** | **Commercial Agency** | **$189** | Everything in Tier 1 + **Unlimited Client Projects** license, white-label client handoff rights, and reusable section & editorial layout primitives. | Web design agencies, freelancers, and creative studios billing clients $2k–$10k per site. |
| **Tier 3** | **Done-For-You Brand Setup** | **$399+** *(MENA / Remote Rapid Package: $399–$750 · Full Custom Stripe/Arabic RTL/Inventory Build: $1,200+)* | Turnkey deployment to client's custom domain on Vercel, replacement of products/notes/story/studios in `src/data/products.ts` & `src/config/site.ts`, Stripe live checkout + webhook activation, Upstash rate limiting/state, and optional Arabic RTL localization + custom studio photography. | Niche perfume & oud brands that want a flagship store live in 5–7 days without hiring an internal team. |

---

## 3. Ready-to-Paste Marketplace Listing (Lemon Squeezy / Gumroad)

### Product Title
**KODŌ — Quiet Luxury Perfume & Atelier E-Commerce Flagship (Next.js 16 · React 19 · Stripe)**

### Short Subtitle (Under 140 chars)
Editorial dark-mode e-commerce template for niche perfumery, skincare & craft houses. Built with Next.js 16, TypeScript & Stripe.

### Recommended Tags
`nextjs`, `ecommerce`, `luxury`, `perfume`, `typescript`, `react19`, `stripe`, `tailwind`, `template`, `design-system`

### Full Sales Page Copy (Copy & Paste)

```markdown
### Most luxury brands wear generic Shopify themes. Give your house architectural presence.

**KODŌ** is a production-ready, editorial e-commerce flagship crafted specifically for **niche perfumery, artisanal skincare, botanical apothecaries, specialty tea, and design objects**.

Instead of cluttered grids and noisy discount banners, KODŌ uses a **Quiet Luxury** token system inspired by Japanese *Ma* (negative space): deep **Obsidian** grounds, **Alabaster** serif headlines, **Muted Gold** micro-labels, zero-radius museum framing, and calibrated fluid motion.

🔗 **Explore the Live Interactive Storefront:** https://kodo-livid.vercel.app/

---

### What You Get Inside the Repository

* **23 Production Routes (Next.js 16.2 + App Router + Turbopack + React 19):**
  * Cinematic Editorial Homepage (4 acts: Hero showcase, Asymmetric Raw Materiality, Filter-linked Collections Vitrine, Incense Ritual & Flagship Studios)
  * Interactive Collections Gallery with Category Filtering & Fragrance Note previews (`/collections`)
  * Dedicated Product Detail Pages with size selectors (`50ml` / `100ml`), olfactory pyramids, and cart integration (`/products/[slug]`)
  * Slide-over Animated Cart Drawer (Zustand state) with complimentary shipping threshold calculation
  * Full Checkout + Validation (`Zod`) + **Stripe v22 Integration** + built-in **HMAC-Signed Demo Checkout Fallback** (`/checkout`, `/checkout/success`) so previews never break without live API keys
  * Editorial Story (`/story`), Atelier & Team (`/about`), Fragrance Journal + Article Reader (`/journal`, `/journal/[slug]`), Private Concierge Inquiry (`/concierge`), plus Shipping, Privacy & Terms policies
* **Zero-Placeholder Quality & Automated Verification:**
  * Strict TypeScript (`tsc --noEmit`) + ESLint + JSX A11y (`eslint-plugin-jsx-a11y`)
  * 14 automated tests (`node --test tests/*.test.ts`) verifying checkout math, Zod schemas, HMAC signed receipts, security checks, and local image asset integrity
  * Verified across Desktop (`1280×800`) and Mobile (`390×844`) with zero horizontal overflow and accessibility support (`prefers-reduced-motion` & `prefers-reduced-transparency`)
* **Clean Single-File Catalog & Config Architecture:**
  * Customize brand copy, studios, curators, and products cleanly in `src/config/site.ts`, `src/data/products.ts`, and `src/app/globals.css` OKLCH tokens.

---

### Choose Your License

* **Starter License ($69)** — Full source code + documentation for **1 personal or commercial storefront**.
* **Commercial Agency License ($189)** — **Unlimited client projects**. Ideal for studios and freelancers delivering bespoke luxury sites in days instead of months.
* **Done-For-You Brand Setup ($399+)** — We customize KODŌ with your products, copy, photography, Stripe keys, and custom domain on Vercel in 5–7 days. *(Includes contact channel after checkout or reach out directly.)*

---

### Technical Requirements

* Node.js 20+
* Vercel account (free Hobby tier works cleanly for launch)
* Optional: Stripe account (live payments) & Upstash Redis (production rate-limiting/persistence). Works out of the box in safe Demo Mode if keys are omitted.
```

---

## 4. Recommended Screenshot Gallery Mapping

Upload the captured screenshots in your artifact folder (`launch_screenshots/`) in this exact order on Gumroad, Lemon Squeezy, Dribbble, and Behance:

1. **Slide 1 — Cover Image (`01_desktop_home_hero.png`)**: Brutalist concrete light beam + SŌ glass flacon + *"Where Scent Becomes Architecture"* headline. Immediately stops the scroll.
2. **Slide 2 — Mobile Experience (`08_mobile_home_hero.png`)**: Proves mobile responsiveness (especially key for Gulf/MENA founders viewing links on WhatsApp & Instagram).
3. **Slide 3 — Collections Grid (`05_desktop_collections.png`)**: Uniform 4-bottle Obsidian vitrine layout (*SŌ, MOKU, EN, KIN*).
4. **Slide 4 — Ritual & Studios Story (`03_desktop_home_ritual_and_studios.png`)**: Kōdō incense ceremony + Tokyo/Paris flagship sanctuaries section.
5. **Slide 5 — Editorial Journal & Mobile Reading (`09_mobile_journal.png`)**: Demonstrates editorial content depth, not just a basic shop.
6. **Slide 6 — Working E-Commerce Proof (`07_desktop_checkout_success.png`)**: Confirmed checkout screen showing `Order Reference` + `$240.00` + `Complimentary` shipping.
7. **Slide 7 — Home Bento Showcase (`02_desktop_home_collections_bento.png`)** + **Product Detail Page (`06_desktop_product_so.png`)**.

---

## 5. High-Converting Cold Outreach Scripts (B2B Perfume & Oud Brands)

### Best Target List (Find 20–30 leads/day in 30 minutes)
* **Instagram hashtags & searches:** `#oudperfume`, `#nicheperfume`, `#عطور_نيش`, `#دهن_عود`, `#عطورات_فاخرة`, `#luxuryfragrance`, `#artisanperfume`
* Look for brands with **great bottle photography and packaging** (3k–80k followers), **ugly or broken link-in-bio / basic Shopify templates**, selling bottles for **$80–$300+** (`300–1,200 SAR / AED`).

---

### A. Arabic Outreach — Instagram DM / WhatsApp (Khaleeji / Luxury Egyptian Tone)

**الرسالة الأولى (مختصرة ومباشرة — ترسل بعد مشاهدة صفحة البراند):**
> السلام عليكم [اسم البراند / الاسم]،  
> تابعت شغلكم في [اسم عطر مميز عندهم مثلاً عطر العود أو المسك] وتصوير الزجاجات ما شاء الله مستوى عالمي جداً.  
> لاحظت إن موقعكم الحالي مش واخد نفس فخامة الهوية البصرية اللي في الإعلانات والباكدجنج.  
> صممت مؤخراً نموذج متجر فائق الفخامة (**Quiet Luxury**) مخصص لبراندات العطور النيش والعود، شغال حالياً كـ Live Preview وتقدروا تجربوا تصفحه وإضافة العطور للسلة حتى إتمام الطلب من الموبايل مباشرة:  
> https://kodo-livid.vercel.app/  
>   
> لو حابين نحوّل متجركم لهوية قريبة من المستوى ده خلال أسبوع (مع ربط الدفع الإلكتروني وإضافة عطوركم بالصور والوصف عربي/إنجليزي)، يسرّني أرسل لكم تفاصيل الباقة أو نعمل معاينة سريعة لأول منتج عندكم مجاناً.

**رسالة متابعة بعد 48 ساعة (لو تمت القراءة بدون رد):**
> مساك الله بالخير أستاذ [الاسم]، حبيت أتأكد بس إن رابط المعاينة وصلك بشكل واضح على الموبايل: https://kodo-livid.vercel.app/  
> لو عندكم إطلاق لعطر جديد قريب أو موسم أعياد، نقدر نجهز صفحة هبوط أو متجر كامل بنفس الجودة خلال 5 أيام بس، وتكون جاهزة لاستقبال طلبات الإعلانات مباشرة. تحت أمرك لو حابب تسمع التفاصيل.

---

### B. English Outreach — Cold Email & LinkedIn / Instagram DM (EU / UK / US / Global Indie Fragrance Houses)

**Subject (Email):** Quick visual concept for [Brand Name]'s fragrance storefront  

**Body:**
> Hi [Founder / Creative Director Name],  
>   
> Your flacon design and scent direction for **[Specific Perfume Name]** stand out immediately — the physical craft feels editorial and gallery-grade.  
>   
> When I clicked through to your online store, though, the storefront felt much more standard than the actual fragrance you're putting in people's hands.  
>   
> I recently built **KODŌ** (`https://kodo-livid.vercel.app/`), an architectural dark-mode flagship storefront built specifically for niche perfume houses (Next.js + Stripe, bespoke fragrance pyramid layouts, animated bottle presentation, and editorial journal). Feel free to tap through a sample product and test checkout on your phone.  
>   
> If you're planning a new collection drop or flagship refresh, I offer a turnkey rebrand of this architecture customized to **[Brand Name]** (your catalog, bottle photography, custom domain, and live Stripe checkout) delivered in 5–7 days starting at **$399** (or full agency source license at **$189** if you have an internal dev).  
>   
> Would you be open to me mocking up your signature bottle inside this layout so you can see how it feels? Zero obligation.  
>   
> Best,  
> [Your Name]  
> Live Flagship: https://kodo-livid.vercel.app/

---

## 6. Short-Form Video / Demo Scripts (30–45 Seconds for Reels / TikTok / X / LinkedIn)

### A. English Script ("Stop Selling $200 Perfume on a $20 Template")
* **0:00–0:03 (Hook — Visual: Screen recording of `01_desktop_home_hero.png` loading slowly scrolling down on Hero SŌ bottle):**  
  *Text on screen:* "Your perfume costs $220. Why does your website look like dropshipping?"  
  *Voiceover:* "If you sell luxury niche fragrance on a white cookie-cutter template, you're losing half your perceived value before someone even smells the bottle."
* **0:03–0:15 (Visual Proof — Show Collections grid, Ritual shot, Mobile view `08_mobile_home_hero.png`):**  
  *Voiceover:* "This is KODŌ — a live flagship storefront I built specifically for perfumery and botanical houses. Deep obsidian framing, editorial serif typography, raw material storytelling, and a full interactive fragrance pyramid."
* **0:15–0:28 (Functionality — Show clicking `SŌ 100ml`, Cart drawer opening, Checkout confirmation):**  
  *Voiceover:* "Powered by Next.js 16, React 19, and Stripe checkout, tested cleanly across desktop and mobile with zero layout clutter."
* **0:28–0:35 (Call To Action):**  
  *Text on screen:* "Link in bio — Launch live store or DM 'KODO' for custom brand setup."  
  *Voiceover:* "You can test the live store yourself at the link in bio — and if you're a perfume founder or agency who wants this tailored for your brand, grab the template or DM me `KODO`."

### B. Arabic Script (TikTok / Instagram Reels — مخصص لصناع العطور ومطوري الويب في الوطن العربي)
* **0:00–0:04 (الافتتاحية — تصوير شاشة للموقع على الموبايل والديسكتوب `01_desktop_home_hero.png`):**  
  *نص على الشاشة:* "ليه تبيع عطر بـ 800 ريال على متجر شكله تقليدي؟"  
  *صوت:* "العميل لما يشتري عطر نيش أو عود فخم أونلاين، أول انطباع بياخده مش من الريحة... من شكل الموقع."
* **0:04–0:18 (استعراض الأقسام — القصة، طقوس البخور، والمجموعات الأربع `03_desktop_home_ritual_and_studios.png` + `05_desktop_collections.png`):**  
  *صوت:* "عشان كده صممت متجر KODŌ كامل بهوية Quiet Luxury: خلفية سوداء فخمة، مساحات عرض متحفية، قصة كل مكون، ومجلة تحريرية للبراند."
* **0:18–0:28 (تجربة الشراء السلسة من الموبايل حتى شاشة تأكيد الطلب `07_desktop_checkout_success.png`):**  
  *صوت:* "الموقع سريع جداً، شغال على الموبايل بدقة كاملة، وفيه سلة طلبات ونظام دفع جاهز بالكامل."
* **0:28–0:35 (دعوة لاتخاذ إجراء CTA):**  
  *صوت:* "تقدر تجرب الموقع لايف دلوقتي من الرابط في البايو، ولو عندك براند عطور أو وكالة وعايز تنفذ متجر بنفس المستوى، ابعتلي كلمة KODO وهبعتلك كل التفاصيل."

---

## 7. 7-Day Launch Checklist (Zero Friction Execution)

- [ ] **Day 1 — Payout Setup:** Confirm **Lemon Squeezy** (or **Gumroad**) store payout method connected (e.g., Payoneer USD receiving account / Wise / local USD transfer) + InstaPay/Bank details ready for MENA $399+ custom deals.
- [ ] **Day 2 — Publish Digital Product:** Create the 2 tiers (`$69 Starter`, `$189 Agency`) + `Done-For-You ($399+)` option using Section 3 above and upload the images from `launch_screenshots/`. Export clean zipped source (excluding `.git`, `.next`, `node_modules`, `.env*`) as the downloadable asset.
- [ ] **Day 3 — Publish Case Study Showcase:** Post the carousel screenshots (`01` hero, `05` collections, `03` ritual/studios, `08` mobile) on LinkedIn, X, Behance, and Dribbble linking to `https://kodo-livid.vercel.app/` and your store link.
- [ ] **Day 4–5 — Outreach Sprint (50 Niche Perfume/Oud Brands):** Send 25 personalized Arabic DMs/WhatsApp messages (Gulf & Egypt oud houses) + 25 English emails/DMs (EU/US indie perfumers) using Section 5 templates.
- [ ] **Day 6 — Video Demo:** Record a 35-second screen capture walking through `https://kodo-livid.vercel.app/` using Section 6 script and upload to Reels/TikTok/X/LinkedIn.
- [ ] **Day 7 — Follow-up & First Close:** Send 48-hour follow-ups to anyone who read/clicked, offering a free 1-product visual mockup inside KODŌ to close your first **$399+** Done-For-You project!
