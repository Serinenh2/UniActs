# UniActs Backend

This is the Django backend for the UniActs project.

## Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Activate the virtual environment:**
    - On Windows:
        ```bash
        venv\Scripts\activate
        ```
    - On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

3.  **Run migrations (if needed):**
    ```bash
    cd uniacts
    python manage.py migrate
    ```

4.  **Create a superuser (for admin access):**
    ```bash
    python manage.py createsuperuser
    ```

5.  **Run the development server:**
    ```bash
    python manage.py runserver
    ```

## Apps

-   **users**: Custom user model with roles (Student, Professor, Admin).
-   **events**: Event management (Title, Date, Location, etc.).
-   **clubs**: Student clubs and organizations.
-   **registrations**: Event registrations for users.
-   **notifications**: User notifications.

## Admin Panel

Access the admin panel at `http://127.0.0.1:8000/admin/`.
