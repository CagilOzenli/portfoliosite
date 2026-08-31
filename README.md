# Çağıl Özenli — Portfolio

Junior game developer portföy sitesi. Mobile-first, hızlı, sade.
Kartvizitteki QR koddan açılmak üzere tasarlandı.

- **Site:** [Astro](https://astro.build) + TypeScript, tamamen statik
- **İçerik / admin panel:** [Sanity](https://www.sanity.io) CMS + Sanity Studio
- **Deploy:** Cloudflare Pages (site) + `sanity.studio` (admin)

---

## 1. Klasör yapısı

```
PortfolioCagil/
├─ src/                  # Astro sitesi
│  ├─ components/        # Header, Hero, kartlar, ikonlar...
│  ├─ layouts/           # BaseLayout (tüm sayfaların iskeleti)
│  ├─ pages/             # Route'lar (dosya = sayfa)
│  ├─ lib/               # Sanity bağlantısı, sorgular, tipler
│  └─ styles/            # tokens.css (renk/ölçü) + global.css
├─ public/               # favicon, robots.txt (olduğu gibi kopyalanır)
├─ studio/               # AYRI uygulama: Sanity Studio (admin panel)
│  └─ schemaTypes/       # İçerik şemaları (project, about, ...)
├─ .env                  # Sitenin Sanity anahtarları (git'e girmez)
├─ studio/.env           # Studio'nun Sanity anahtarları (git'e girmez)
└─ astro.config.mjs
```

**Önemli kural:** Renk / yerleşim / tasarım yalnızca kodda (`src/styles/tokens.css`
ve component'ler). CMS'ten sadece **içerik** değişir; tasarıma dokunulamaz.

---

## 2. Gereksinimler

- **Node.js 22.12+** (`node -v` ile kontrol et)
- Bir Sanity hesabı (proje zaten var: ID `anmdcj3x`, dataset `production`)
- Bir GitHub hesabı
- Bir Cloudflare hesabı

---

## 3. İlk kurulum (local)

### 3.1 Siteyi kur

```bash
npm install
```

`.env` dosyası zaten hazır. İçeriği:

```
PUBLIC_SANITY_PROJECT_ID=anmdcj3x
PUBLIC_SANITY_DATASET=production
PUBLIC_SANITY_API_VERSION=2025-01-01
```

### 3.2 Studio'yu kur

```bash
cd studio
npm install
cd ..
```

`studio/.env` de hazır:

```
SANITY_STUDIO_PROJECT_ID=anmdcj3x
SANITY_STUDIO_DATASET=production
```

> Yeni bir bilgisayarda `.env` dosyaları yoksa: `.env.example` ve
> `studio/.env.example` dosyalarını sırasıyla `.env` ve `studio/.env` adıyla kopyala.

---

## 4. Geliştirme (çalışırken görmek)

### Site

```bash
npm run dev
```

→ http://localhost:4321

### Admin panel (Studio)

Ayrı bir terminalde:

```bash
cd studio
npm run dev
```

→ http://localhost:3333
İlk açılışta Sanity hesabınla giriş yapman istenir (Google/GitHub/e-posta).

### Faydalı komutlar

| Komut | Ne yapar |
|---|---|
| `npm run dev` | Siteyi geliştirme modunda çalıştırır |
| `npm run build` | Siteyi `dist/` klasörüne derler (Cloudflare bunu çalıştırır) |
| `npm run preview` | Derlenmiş siteyi yerelde önizler |
| `npm run check` | TypeScript / Astro tip kontrolü (0 hata beklenir) |

---

## 5. Sanity'ye ilk içerik girişi

Site, Sanity **boş olsa bile** çalışır — her yerde nötr "placeholder" gösterir
(uydurma metin yok). Gerçek içerik girmek için:

1. `cd studio && npm run dev` → http://localhost:3333
2. Sol menüde şu gruplar var:
   - **Site Settings** — site başlığı, açıklama, sosyal linkler, **CV dosyası**
   - **Hero** — ana sayfadaki isim / rol / slogan / buton yazısı
   - **About** — bio, current focus, skills, tools, languages, location, availability, foto
   - **Contact Information** — "Let's Talk" başlığı, e-posta, LinkedIn, GitHub
   - **Navigation** — header menüsündeki linkler ve sırası
   - **Work (Projects)** — proje listesi
   - **Systems Lab** — sistem yazıları listesi
3. Bir belgeyi aç, doldur, sağ altta **Publish**'e bas.

> **Taslak vs. yayın:** Publish'e basmadıkça değişiklik "taslak"tır ve **sitede
> görünmez**. Site yalnızca yayınlanmış içeriği çeker.

### 5.1 Yeni proje ekleme

**Work (Projects) → sağ üst "+" / Create new**

Alanlar sekmelere ayrılmış:
- **Main:** name, slug (isimden otomatik üretilir), cover image, short description,
  engine, dev tools, genre, role, status
- **Case study:** overview, responsibilities, systems implemented, technical
  challenges, solutions, lessons learned (hepsi düz metin — boş satır = yeni paragraf)
- **Media:** screenshots, GIF'ler, video linkleri
- **Links:** repo / playable build / external
- **Publishing & SEO:**
  - **Published** — açmadan sitede görünmez
  - **Featured on homepage** — ana sayfada gösterilir (**en fazla 2 tane**;
    3.'yü işaretlemeye çalışırsan Sanity uyarı verir)
  - **Order** — küçük sayı önce (listeleri elle sıralamak için)
  - **SEO** — boş bırakılırsa proje adı/açıklaması kullanılır

Kaydet → **Publish**. Proje `/work` ve (featured ise) ana sayfada çıkar,
kendi sayfası `/work/<slug>` adresinde oluşur.

### 5.2 Systems Lab girdisi ekleme

**Systems Lab → Create new**

- **title** (ör. "Player Movement"), **slug**, **summary**
- engine, tools, related project (bir projeye bağla — opsiyonel)
- **Write-up:** how it works, my contribution, challenge, solution
- **Media:** blueprint screenshots, GIF, video, GitHub link
- **Publishing:**
  - **Published** — açmadan görünmez
  - **Visible** — yayında olsa bile bunu kapatıp geçici gizleyebilirsin
  - **Order** — sıralama

Site `/systems-lab` sayfasında hiç yayınlanmış girdi yoksa 4 sabit placeholder
kart gösterilir (Player Movement / Interaction / Combat System / UI & Input).
İlk gerçek girdiyi yayınladığında placeholder'lar kaybolur.

### 5.3 CV dosyasını değiştirme

**Site Settings → CV file (PDF)** alanına yeni PDF'i sürükle-bırak → **Publish**.
Sitedeki "Download CV" linki ve `/cv` adresi otomatik yeni dosyaya gider.
(Kod değişikliği gerekmez.)

### 5.4 Görsel / video yükleme

Her image/file alanına doğrudan sürükle-bırak. Sanity görselleri kendi CDN'inde
saklar; site build'inde otomatik optimize edilmiş URL'ler üretilir.

---

## 6. Dataset'i "public" yapmak (ÖNEMLİ)

Statik site, build sırasında Sanity'den **giriş yapmadan** içerik okur.
Bunun çalışması için `production` dataset'i **public** olmalı:

1. https://www.sanity.io/manage/project/anmdcj3x → **API** → **Datasets**
2. `production` satırında **Public** seç.

Public değilse site derlenir ama **her yerde placeholder** görünür (içerik boş gelir).
Portföy içeriği zaten herkese açık olduğu için public olması sorun değildir.

---

## 7. GitHub'a yükleme

> ⚠️ İlk `git push` ve deploy adımlarını birlikte, senin onayınla yapacağız.
> Aşağısı referans içindir.

```bash
git init
git add .
git commit -m "Initial portfolio site + Sanity Studio"
git branch -M main
```

GitHub'da boş bir repo oluştur (README ekleme), sonra:

```bash
git remote add origin https://github.com/<kullanıcı-adın>/<repo-adı>.git
git push -u origin main
```

`.gitignore` sayesinde `node_modules/`, `dist/`, `.env`, `studio/.env`
**yüklenmez** (doğru davranış).

---

## 8. Cloudflare Pages'e deploy (site)

1. https://dash.cloudflare.com → **Workers & Pages** → **Create** → **Pages** →
   **Connect to Git** → GitHub repo'nu seç.
2. Build ayarları:
   | Ayar | Değer |
   |---|---|
   | Framework preset | **Astro** |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | (boş bırak) |
3. **Environment variables** (Production **ve** Preview için ekle):
   ```
   PUBLIC_SANITY_PROJECT_ID = anmdcj3x
   PUBLIC_SANITY_DATASET    = production
   PUBLIC_SANITY_API_VERSION = 2025-01-01
   NODE_VERSION             = 22
   ```
4. **Save and Deploy**. Birkaç dakikada `https://<proje>.pages.dev` yayına girer.

Her `git push` sonrası Cloudflare otomatik yeniden derler.

> **CMS'te içerik değiştirdiğinde site otomatik güncellenmez** (statik site,
> build anındaki içeriği gösterir). Güncellemek için:
> - Kolay yol: Cloudflare Pages → proje → **Deployments** → **Retry deployment**
> - Otomatik yol (sonra kurulabilir): Sanity webhook → Cloudflare **Deploy Hook**
>   URL'ine POST. (İstersen bunu birlikte ekleriz.)

### 8.1 `site` değeri

`astro.config.mjs` ve `public/robots.txt` içindeki kanonik adres
`https://cagilozenli.dev` olarak ayarlıdır. Alan adı değişirse bu iki dosyayı
güncelle, commit'le, push'la.

---

## 9. Admin paneli (Studio) deploy

Studio'yu Cloudflare'e koymana gerek yok — Sanity ücretsiz, özel bir adres verir:

```bash
cd studio
npx sanity login      # bir kez
npx sanity deploy
```

Sana bir isim sorar (ör. `cagil`) → panel `https://cagil.sanity.studio`
adresinde yayınlanır. Bu adres **herkese açık değildir**: yalnızca senin Sanity
hesabınla (ve davet ettiğin kişilerle) giriş yapılabilir.

İçerik güncellemek için bundan sonra sadece `cagil.sanity.studio`'ya gir —
local'de Studio çalıştırmana gerek yok.

Şema değiştirdiğinde (yeni alan eklemek vb.) `npx sanity deploy`'u tekrar çalıştır.

---

## 10. Custom domain — `cagilozenli.dev` (Squarespace → Cloudflare, nameserver taşıma)

Alan adı `cagilozenli.dev` Squarespace'ten alındı. Seçilen yol: alan adını
tümüyle Cloudflare'e taşımak (nameserver değişikliği).

> `.dev` uzantısı tarayıcılarda **zorunlu HTTPS** listesindedir (HSTS preload).
> Cloudflare Pages otomatik ücretsiz SSL verdiği için sorun olmaz; sadece
> sertifika aktifleşene kadar (birkaç dk) site "güvenli değil" diyebilir.

1. **Cloudflare Dashboard → Add a site →** `cagilozenli.dev` → **Free** plan → Continue.
2. Cloudflare mevcut DNS kayıtlarını tarar (Squarespace parking kayıtları görünebilir,
   sorun değil). **Continue** de.
3. Cloudflare iki **nameserver** verir, ör:
   ```
   xxxx.ns.cloudflare.com
   yyyy.ns.cloudflare.com
   ```
4. **Squarespace → Domains → cagilozenli.dev → Nameservers →**
   **Use custom nameservers** → Squarespace'inkileri sil, Cloudflare'in verdiği
   ikisini yapıştır → kaydet.
5. Cloudflare'de "Check nameservers" / bekle. Aktifleşmesi genelde 30 dk – birkaç
   saat (en fazla 24–48 saat). Aktifleşince Cloudflare e-posta atar.
6. Aktifleştikten sonra: **Cloudflare Pages → (proje) → Custom domains →
   Set up a domain →** `cagilozenli.dev` ekle, sonra `www.cagilozenli.dev`'i de
   ekleyip köke yönlendir. DNS kayıtları otomatik oluşur.
7. **Cloudflare → SSL/TLS → Overview → "Full"** (veya "Full (strict)") seçili olsun.

> Nameserver değişikliği geri alınabilir (eski nameserver'ları geri yazman yeter)
> ama yayılması zaman alır. Bu adımı birlikte yapacağız.

---

## 11. Ortam değişkenleri — özet

| Değişken | Nerede | Değer |
|---|---|---|
| `PUBLIC_SANITY_PROJECT_ID` | `.env` + Cloudflare | `anmdcj3x` |
| `PUBLIC_SANITY_DATASET` | `.env` + Cloudflare | `production` |
| `PUBLIC_SANITY_API_VERSION` | `.env` + Cloudflare | `2025-01-01` |
| `NODE_VERSION` | Cloudflare | `22` |
| `SANITY_STUDIO_PROJECT_ID` | `studio/.env` | `anmdcj3x` |
| `SANITY_STUDIO_DATASET` | `studio/.env` | `production` |

`PUBLIC_` önekli değişkenler tarayıcıya gidebilir — burada sorun değil, çünkü
sadece yayınlanmış içeriği okurlar. Gizli anahtar yok.

---

## 12. Sık karşılaşılan durumlar

| Belirti | Sebep / çözüm |
|---|---|
| Sitede içerik yok, hep "coming soon" | Dataset public değil (bkz. §6) **veya** içerik Publish edilmemiş **veya** Cloudflare env değişkenleri eksik |
| CMS'te değişiklik yaptım, site değişmedi | Statik site — yeniden deploy gerekir (§8, "Retry deployment") |
| "You can only feature up to 2 projects" | Doğru davranış — önce başka bir projenin "Featured" işaretini kaldır |
| `/cv` "CV not uploaded yet" diyor | Site Settings → CV file alanına PDF yükle + Publish |
| Studio'da `styled-components` / `npm audit` uyarıları | Sanity'nin geliştirici bağımlılıkları; yayınlanan siteyi etkilemez |
| Build'de "future API version" uyarısı | `PUBLIC_SANITY_API_VERSION`'ı ileride daha yeni bir tarihe çekebilirsin |

---

## 13. Sonraki adımlar (opsiyonel)

- Gerçek greybox ekran görüntüsü çekip `Hero` içindeki `GreyboxScene`'i
  bir `<img>` ile değiştir.
- Sanity → Cloudflare **Deploy Hook** ile "publish = otomatik yeniden yayın".
- Google Search Console'a `sitemap-index.xml` ekle.
