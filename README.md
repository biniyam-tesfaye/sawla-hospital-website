## Sawla General Hospital – Full-Stack Website

This project is a complete full-stack website for **Sawla General Hospital**, built with **Node.js + Express** on the backend and **HTML, CSS, and JavaScript** on the frontend.  
It includes animated layouts, responsive design, and API endpoints for contact, appointments, and doctors data.

### 1. Project Structure

- **`server.js`**: Express app entry point.
- **`/public`**: Static frontend assets.
  - `css/styles.css` – main styles (responsive, animated, modern hospital UI).
  - `js/main.js` – interactions (sliders, scroll animations, counters, form handling).
- **`/views`**: EJS templates for pages.
  - `home.ejs`, `about.ejs`, `services.ejs`, `departments.ejs`, `contact.ejs`, `404.ejs`.
  - `partials/header.ejs`, `partials/footer.ejs`.
- **`/routes`**:
  - `pages.js` – page routes.
  - `api.js` – REST API routes.
  - `admin.js` – admin login/dashboard routes.
- **`/controllers`**:
  - `contactController.js`, `appointmentController.js`, `doctorController.js`, `adminController.js`.
- **`/models`**:
  - `contact.js`, `appointment.js`, `doctor.js`, `news.js` – simple JSON-backed data models.
- **`/data`**:
  - `contacts.json`, `appointments.json`, `doctors.json`, `news.json`.

### 2. Getting Started

1. **Install dependencies**

```bash
npm install
```

2. **Run the server (development)**

```bash
npm run dev
```

This uses `nodemon` to auto-restart the server on changes.

3. **Run the server (production)**

```bash
npm start
```

4. Open your browser and visit:

```bash
http://localhost:3000
```

### 3. Available Pages

- **Home** (`/`): Hero with parallax, animated stats, services highlight, testimonials slider, appointment form.
- **About** (`/about`): Mission, vision, values, news/updates cards, and animated doctors/team section.
- **Services** (`/services`): Expandable/collapsible accordion list with icons.
- **Departments** (`/departments`): Responsive grid of hospital departments with hover effects.
- **Contact** (`/contact`): Contact information, embedded Google Maps placeholder, and interactive contact form.

### 4. API Endpoints

- **POST `/api/contact`**
  - Body: `{ name, phone, email, message }`
  - Stores contact message to `data/contacts.json`.

- **POST `/api/appointments`**
  - Body: `{ name, phone, email, date, department, doctor, message }`
  - Stores appointment request to `data/appointments.json`.

- **GET `/api/doctors`**
  - Returns doctors list from `data/doctors.json`.

### 5. Frontend Interactions

- Sticky navigation with mobile dropdown menu.
- Light/dark mode toggle with saved preference.
- Hero section parallax effect.
- Custom logo in header (`public/images/sawla-logo.png`).
- Hero background using hospital facade photo (`public/images/hospital-building.jpg`).
- Admin login link in navbar with protected dashboard.
- News & announcements grid driven by `data/news.json` on the About page.
- Doctor cards pull photos and bios from `data/doctors.json` (images in `public/images/doctors/`).
- Scroll reveal animations via Intersection Observer.
- Testimonial slider with auto-rotation and dots.
- Animated counters (beds, patients, staff).
- Services accordion (expand/collapse).
- Dynamic doctor cards and appointment doctor select populated from `/api/doctors`.
- JavaScript validation and API submission for contact and appointment forms.

- **Admin Portal**
  - `/admin/login` – restricted login page (default credentials `admin / sawla@123` unless overridden via env vars `ADMIN_USERNAME`, `ADMIN_PASSWORD`).
  - `/admin/appointments` – protected dashboard that lists appointment requests; requires successful login.
  - Use `SESSION_SECRET` env var to override the session secret in production.

### 6. Zipping the Project

To share or deploy the project as a single file:

1. From the project root (`sawla general hospital` folder), select all files and folders.
2. Right-click and choose **Send to → Compressed (zipped) folder**.
3. Name the archive, for example: `sawla-general-hospital-site.zip`.

The zip will contain all backend and frontend code, assets, and configuration required to run the project.

> **Note:** Add your actual brand assets inside `public/images/`:
> - `sawla-logo.png` – the circular hospital logo (used in the navbar).
> - `hospital-building.jpg` – the hero background image.  
> Keep the same filenames to avoid updating paths in the templates/CSS.
>
> Doctor images live under `public/images/doctors/` and the filenames should match the `photo` paths defined in `data/doctors.json`.


