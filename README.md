# Zhrnuty: AI-Powered PDF Summarization

## Screenshots

Here are some screenshots of the Zhrnuty application:

### Main Interface

[![Zhrnuty Main Interface](https://ik.imagekit.io/x4uskqquc/Screenshot%202025-06-03%20195016.png)]

This screenshot shows the main interface of the application, highlighting the document upload and summarization process.

### User Dashboard

[![Zhrnuty User Dashboard](https://ik.imagekit.io/x4uskqquc/uploadpic.png)](https://example.com/dashboard)

The user dashboard provides a personalized space to manage and access generated summaries.

### Genrated Summary

[![Zhrnuty Genrated  Summary](https://ik.imagekit.io/x4uskqquc/summarypic.png)](https://example.com/dashboard)

The user content into concise summary !

## 🚀 Overview

Zhrnuty is an innovative application designed to transform lengthy PDFs into concise, impactful summaries with the power of artificial intelligence. It provides a seamless and intuitive experience for extracting key insights, offering a beautiful interactive viewer with progress tracking, and ensuring secure handling of your documents. Built with a modern, scalable stack, Zhrnuty is ideal for anyone needing quick, intelligent comprehension of their PDF content.

## ✨ Features

Zhrnuty offers a comprehensive set of features to enhance your document processing workflow:

### Core Technologies:

- **Next.js 15 App Router:** For robust server-side rendering, intelligent routing, and efficient API endpoints utilizing React Server Components.
- **React:** A powerful library for building dynamic and reusable user interface components, ensuring a smooth and responsive experience.
- **Clerk:** Provides secure and flexible authentication with support for Passkeys, GitHub, and Google Sign-in, prioritizing user security and convenience.
- **GEMINI AI :** The backbone for advanced summarization, offering contextual understanding and emoji-enhanced output for engaging summaries.
- **Langchain:** Utilized for sophisticated PDF parsing, text extraction, and intelligent document chunking, ensuring accurate and comprehensive processing.
- **Shadcn UI:** A collection of accessible and customizable React components, ensuring a polished and consistent user interface.
- **NeonDB (PostgreSQL):** A serverless database solution for persistent storage of summaries and user data, offering scalability and reliability.
- **UploadThing:** Facilitates secure and efficient PDF uploads (up to 32MB) and robust file management.

- **TypeScript:** Ensures static typing for enhanced code quality, improved readability, and a more robust development experience.
- **Tailwind CSS 4:** A utility-first CSS framework for rapid UI development, ensuring a responsive and visually appealing design.

### Application Features:

- **Clear, Structured Summaries:** Get precise summaries with identified key points and valuable insights.
- **Beautiful, Interactive Viewer:** Engage with an intuitive document viewer that includes progress tracking for large files.
- **Secure File Handling & Processing:** Your documents are handled with the utmost security and privacy.
- **Protected Routes & API Endpoints:** Ensures that sensitive data and functionalities are only accessible to authorized users.
- **Flexible Pricing Plans (Basic & Pro):** Choose the plan that best fits your needs, with options for enhanced features and usage.
- **Webhook Implementation for Stripe Events:** Robust system for managing subscription and payment events seamlessly.
- **User Dashboard for Managing Summaries:** A personalized dashboard to easily organize, access, and manage all your generated summaries.
- **Responsive Design:** Optimized for a flawless experience across all devices, from desktops to mobile phones.
- **Real-time Updates & Path Revalidation:** Ensures that your data and UI are always up-to-date.
- **Production-Ready Deployment:** Engineered for high performance and reliability in a production environment.
- **Toast Notifications:** Provides timely and informative notifications for upload status, processing updates, and error handling.
- **Performance Optimizations:** Built with efficiency in mind to deliver a fast and smooth user experience.
- **SEO-Friendly Summary Generation:** Designed with search engine optimization best practices to ensure discoverability.

## 🚀 Getting Started

To get started with Zhrnuty, follow these steps:

1.  **Fork the repository:** Click the "Fork" button in the top right corner of this repository to create your own copy.
2.  **Clone your forked repository:**
    ```bash
    git clone [your-forked-repo-url]
    cd Zhrnuty # or your project directory name
    ```
3.  **Copy environment variables:** Duplicate the `.env.example` file to a new file named `.env.local`:
    ```bash
    cp .env.example .env.local
    ```
4.  **Create the required credentials:** Populate the `.env.local` file with the following:
    - `OPENAI_API_KEY`: Your API key for OpenAI.
    - `CLERK_SECRET_KEY` and `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk authentication keys.
    - `UPLOADTHING_SECRET` and `NEXT_PUBLIC_UPLOADTHING_APP_ID`: UploadThing configuration.
    - `DATABASE_URL`: Your NeonDB database connection string.
5.  **Install dependencies:**
    ```bash
    npm install
    ```
6.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 🙏 Acknowledgements

We extend our sincere gratitude to the following projects and services for their invaluable contributions to Zhrnuty:

- [**Clerk**](https://go.clerk.com/5q0WrFA) for robust user authentication.
- [**OpenAI**](https://openai.com) for powering our GPT-4 API, enabling intelligent summarization.
- [**Langchain**](https://js.langchain.com) for advanced document processing capabilities.
- [**Shadcn UI**](https://ui.shadcn.com/) for providing high-quality and customizable UI components.

## 📄 License

Zhrnuty is open-source software licensed under the [MIT License](https://choosealicense.com/licenses/mit/).
