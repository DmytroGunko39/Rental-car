# RentalCar — Premium Car Rental Service

A modern full-stack car rental application built with **Next.js 16**, **TypeScript**, **Tailwind CSS**, **Zustand**, and **Formik**.  
Users can browse cars, filter by multiple parameters, view detailed information, add favorites, and book cars via a fully validated form.

---

## Features

### Catalog & Filtering

- Filter cars by **brand**, **price**, and **mileage**
- Real-time filtering powered by Zustand
- Clean and responsive UI

### Favorites

- Add/remove cars from Favorites
- Persistence with `zustand/persist` & `localStorage`

### Car Details Page

- Full description with images, specs, accessories, and rental conditions
- Professional layout based on design system

## Booking Form

- Built with **Formik + Yup**
- Custom **Date Picker**
- Validation & error handling
- Toast notifications using **react-toastify**

### UI & Styling

- Tailwind CSS
- Custom components
- Responsive and mobile-friendly design

---

## Tech Stack

| Category         | Tools                       |
| ---------------- | --------------------------- |
| Framework        | **Next.js 16 (App Router)** |
| Language         | **TypeScript**              |
| State Management | Zustand                     |
| Styling          | Tailwind CSS                |
| Forms            | Formik + Yup                |
| Notifications    | React Toastify              |
| API Client       | Axios                       |
| Icons            | React Icons                 |

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run development server

```bash
npm run dev
```

### 3. Build for production

```bash
npm run build
npm run start
```
