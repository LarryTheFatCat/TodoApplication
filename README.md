# ToDo App with Profile System

## Overview

This ToDo App allows users to create and manage tasks with a profile system. Each task is associated with a profile and includes a priority level rating and a description. The app is built using React and leverages local storage to persist data across sessions.

## Features

- **Profile Management**: Create and manage profiles for different tasks.
- **Task Management**: Add, view, and delete tasks.
- **Priority Levels**: Assign priority levels to tasks (1: High, 2: Medium, 3: Low).
- **Task Descriptions**: Add detailed descriptions to tasks.
- **Persistent Storage**: Tasks and profiles are saved in local storage.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/todo-app.git
    ```
2. Navigate to the project directory:
    ```bash
    cd todo-app
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm start
    ```

## Usage

1. **Create a Profile**:
    - Enter the profile name, description, and priority level.
    - Save the profile to local storage.

2. **Add a Task**:
    - Enter the task title, description, and priority level.
    - Click the "Add Task" button to save the task.

3. **View Tasks**:
    - Tasks are displayed in an accordion format.
    - Click on a task to view its details.

4. **Delete a Task**:
    - Click the "Delete Task" button to remove a task.

## Code Structure

- **`App.js`**: Main component that renders the profile and task management components.
- **`Profile.js`**: Component for creating and managing profiles.
- **`Task.js`**: Component for creating, viewing, and deleting tasks.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.

## Contact

For any questions or feedback, please make an issue in this GitHub repository.