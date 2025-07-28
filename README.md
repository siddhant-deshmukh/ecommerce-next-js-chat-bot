# 🛒 E-Commerce Application

A scalable and performant e-commerce platform built for modern deployment using **Next.js** and **Vercel**. Designed with clean architecture, responsive UI, and real-time features.

## 🚀 Features

- ⚡ **Optimized for Vercel**: Fully serverless and production-ready with Next.js API routes and ISR.
- 🌐 **Next.js 14**: App router, server components, and edge-optimized APIs.
- 🎨 **Modern UI**: Built with **TailwindCSS** + **shadcn/ui** components.
- 🧠 **MongoDB**: Scalable document database for user, product, cart, and order management.
- 📱 **Responsive Design**: Mobile-first and adaptive layout.

---

## 📘 Entity-Relationship Diagram

The following diagram illustrates the data structure for users, products, carts, orders, and related collections:

![ER Diagram](/er-diagram.png)

---

## 📂 Tech Stack

- **Frontend**: Next.js (App Router), TailwindCSS, Shadcn UI
- **Backend**: Serverless Functions (API routes)
- **Database**: MongoDB (via Mongoose)
- **Hosting**: Vercel (Edge-optimized)

---

## 🧩 Schemas Covered

- `User`, `Cart`, `Product`, `Discount`, `ProductSpecification`
- `Wishlist`, `Order`, `OrderProduct`, `Review`
- `CustomChat`, `RateLimitLog`, `Message`

---

## 📌 Notes

- All relationships are modeled using references or embedded schemas depending on read/write patterns.
- Wishlist is many-to-many between users and products.
- Cart contains embedded product snapshots.

--- 

![ER Diagram](/home-page-full-ss.png)

![ER Diagram](/product-page-full-ss.png)