📊 Study Analytics — Subscription-Based Productivity Platform

A full-stack study tracking and analytics platform that helps users monitor study habits, visualize performance, and stay consistent — with premium features unlocked via subscription.

🌐 Live Demo: https://study-analytics-mern.vercel.app

🚀 Overview

Study Analytics is a production-style SaaS application that enables users to:

Track daily study sessions

Visualize study patterns with charts and heatmaps

Measure consistency and streaks

Analyze subject distribution

Unlock advanced analytics via Pro subscription

This project demonstrates end-to-end full-stack development, including authentication, billing, data processing, and deployment.

✨ Features
🔐 Authentication

JWT-based signup and login

Secure password hashing (bcrypt)

Persistent sessions via local storage

Protected routes

📚 Study Tracking

Add and manage study sessions

Subject, duration, and date tracking

Real-time updates

📈 Analytics Dashboard

Daily study time (line chart)

Sessions per day (bar chart)

Cumulative study time (area chart)

Subject distribution (pie chart)

Consistency heatmap (GitHub-style)

Key metrics:

Total study time

Average session length

Current streak

Longest streak

Most studied subject

💎 Pro Subscription (Stripe)

Premium analytics features

Advanced charts and comparisons

Feature gating for free users

Subscription checkout via Stripe

Webhook handling for subscription status

🎯 Product Features

Freemium model (Free vs Pro)

Upgrade flow

Success confirmation page

🧱 Tech Stack
Frontend

React

React Router

Tailwind CSS

Recharts (data visualization)

React Calendar Heatmap

Backend

Node.js

Express

PostgreSQL

JWT Authentication

Stripe API

Deployment

Frontend: Vercel

Backend: Render

Database: PostgreSQL (cloud)

🧠 Architecture

Client → API → Database → Stripe → Webhooks → Authorization

Key backend components:

Auth controllers & middleware

Session management API

Billing routes

Stripe webhook handler

Pro access enforcement

🔧 Installation (Local Setup)
1. Clone repository
git clone https://github.com/YOUR_USERNAME/study-analytics.git
cd study-analytics
2. Backend setup
cd server
npm install

Create .env:

DATABASE_URL=your_postgres_url
JWT_SECRET=your_secret
STRIPE_SECRET_KEY=your_stripe_key
STRIPE_PRICE_ID=your_price_id
CLIENT_URL=http://localhost:5173
STRIPE_WEBHOOK_SECRET=your_webhook_secret

Run:

npm start
3. Frontend setup
cd client
npm install
npm run dev
📸 Screenshots


<img width="1918" height="897" alt="StudyAnalytics2-1" src="https://github.com/user-attachments/assets/8d409ef5-56b1-4e5d-b08a-e61f8f5a9fc4" />


<img width="1893" height="903" alt="StudyAnalytics2-2" src="https://github.com/user-attachments/assets/caa7d7a6-3a67-4768-bd78-c0516990d80d" />


<img width="1897" height="911" alt="StudyAnalytics2-3" src="https://github.com/user-attachments/assets/11956887-ab96-4213-8a56-cba99b9f2ba0" />


<img width="1893" height="897" alt="StudyAnalytics2-4" src="https://github.com/user-attachments/assets/6f4e4bf2-b70f-453c-a906-6327148f096f" />


<img width="1900" height="913" alt="StudyAnalytics3" src="https://github.com/user-attachments/assets/1ae1b721-987c-4e50-aa6d-1613a5936327" />


<img width="1881" height="892" alt="StudyAnalytics4" src="https://github.com/user-attachments/assets/8642b93c-b60b-4b20-8477-6a134697a497" />


<img width="1861" height="878" alt="StudyAnalytics5" src="https://github.com/user-attachments/assets/9343c59d-4008-4f54-b8d7-76322d7c660d" />










🎯 What This Project Demonstrs

This project showcases:

Full-stack development skills

SaaS architecture

Authentication & authorization

Subscription billing integration

Data processing & analytics

UI/UX design

Deployment & DevOps basics

📌 Future Improvements

User profile & subscription management

Data export (CSV)

Mobile responsiveness enhancements

Predictive analytics

Notifications & reminders

👤 Author

Reno Mathews

Master’s Graduate — Advanced Computer Science
University of Liverpool

