# Movie Ticket Booking Application

This is a movie ticket booking application built with React and Node.js. Users can browse movies, select seats, and make payments through Razorpay.

## Features

- **User Authentication**: Login and registration with verification mechanisms.
- **Movie Listings**: Home page displays popular movies and search functionality.
- **Seat Selection**: Select seats for a movie show.
- **Payment Integration**: Razorpay payment gateway integration.
- **Responsive Design**: Mobile-friendly UI.

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Payment Gateway**: Razorpay
- **API**: OMDB API for movie data

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Subham20020530/movie-ticket-booking-app.git
    cd movie-ticket-booking-app
    ```

2. Install dependencies for the backend:
    ```sh
    cd backend
    npm install
    ```

3. Install dependencies for the frontend:
    ```sh
    cd frontend
    npm install
    ```

4. Create a `.env` file in the `backend` directory and add the following:
    ```env
    MONGO_URI=your_mongodb_uri
    RAZORPAY_KEY_ID=your_razorpay_key_id
    RAZORPAY_KEY_SECRET=your_razorpay_key_secret
    ```

5. Start the backend server:
    ```sh
    cd backend
    npm start
    ```

6. Start the frontend server:
    ```sh
    cd frontend
    npm run dev
    ```

## Usage

1. Navigate to `http://localhost:5173` in your browser.
2. Register or login to the application.
3. Browse movies and select a movie to book tickets.
4. Select seats and proceed to checkout.
5. Make a payment using Razorpay.
