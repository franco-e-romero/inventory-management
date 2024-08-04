# Inventory Management App

## Table of Contents

- [Description](#description)
- [Features](#features)
- [Deployment](#deployment)
- [License](#license)

## Description

The Inventory Management App is a web application that allows users to manage an inventory by adding, updating, and removing items. It provides a user-friendly interface to view and search through inventory items. The app features a modal for adding new items and a search functionality to easily find items.

The app is built using Next.js and Material-UI for the frontend, with Firebase Firestore as the backend for data storage.

## Features

- **View Inventory:** Display all items with their quantities.
- **Add Items:** Add new items to the inventory.
- **Update Quantities:** Increase or decrease item quantities.
- **Remove Items:** Delete items from the inventory when their quantity reaches zero.
- **Search Functionality:** Find items quickly using a search bar.

## Deployment

The app is deployed on [Vercel](https://vercel.com), which provides continuous deployment from your GitHub repository.

To access the live application, visit: [https://your-vercel-app-url.vercel.app](https://your-vercel-app-url.vercel.app).

## Running Locally

If you want to run the app locally for development purposes, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    ```

2. **Navigate to the project directory:**
    ```bash
    cd your-repo-name
    ```

3. **Install dependencies:**
    ```bash
    npm install
    ```

4. **Set up Firebase:**
   - Create a Firebase project and configure Firestore.
   - Add your Firebase configuration to a `.env.local` file in the root of the project:
     ```plaintext
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

5. **Run the development server:**
    ```bash
    npm run dev
    ```

   Open your browser and navigate to `http://localhost:3000` to view the app.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
