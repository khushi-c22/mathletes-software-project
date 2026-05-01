# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======
# mathletes-software-project

# Overview

Our project is a productivity system designed to help users stay on task by analyzing eye movement and attention patterns during work sessions. By leveraging computer vision and real-time tracking, the system detects whether a user is actively engaged with their screen and provides detailed session reports to improve focus and productivity over time. 

# Key Features
1. Real-Time Eye Tracking
  Uses webcam input to monitor eye position and gaze direction to determine attention.
2. Focus Detection
  Identifies when users are looking at their screen and tries to get their attention back to the task at hand. 
3. Session Tracking
  Records productivity sessions, including duration, focus consistency, and any interruptions.
4. Detailed Reports and Insights
  Generates summaries of each session with metrics such as:
      Total session time
      Percentage of time focused
      Number of distractions
6. User Feedback Dashboard
       Provides visual reports (graphs, charts) to help users understand and improve their work habits.

# How It Works
1. The system accesses the user's webcam (with permission)
2. Eye-tracking algorithms analyze gaze direction and blinking patterns
3. Focus status is determined based on whether the user is looking at the screen
4. Data is logged continuously during a session
5. After the session ends, a report is generated with actionable insights

# Tech Stack
- Frontend: React
- Backend: Python (mediapipe, opencv, numpy), R Studio
- Computer Vision: MediaPipe (Face Mesh), OpenCV
- Database: Supabase
- Visualization: R Studio

# Privacy & Ethics
We prioritize user privacy and transparency:

  - All tracking is opt-in only
  - Data is stored securely and can be deleted by the user
  - No video footage is stored unless explicitly enabled

# Installation

## ⚠️ Important: Python Version Requirement

This project requires **Python 3.11 specifically**. Python 3.12 and 3.13 are **not compatible** with MediaPipe and will cause errors.

## Dependencies
- `opencv-python` — webcam capture and image processing
- `mediapipe` — face mesh and landmark detection

---

## Windows

1. **Install Python 3.11**
   Download and run the installer:
   https://www.python.org/ftp/python/3.11.9/python-3.11.9-amd64.exe

   ✅ Check **"Add Python 3.11 to PATH"** on the first screen.

2. **Clone the repository**
   ```
   git clone https://github.com/khushi-c22/mathletes-software-project.git
   cd mathletes-software-project
   ```

3. **Create and activate a virtual environment**
   ```
   py -3.11 -m venv venv311
   venv311\Scripts\activate
   ```
   > If you get a scripts/permissions error, run this first, then try again:
   > ```
   > Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   > ```

4. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```

5. **Run the eye tracker**
   ```
   python eye_tracking.py
   ```
   A window will open showing your webcam feed with green face landmark dots.
   Press **Q** to quit.

6. **Run tests**
   ```
   python -m pytest test_eye_tracking.py -v
   ```
   > Make sure your face is visible to the webcam when running tests.

---

## Mac

1. **Install Python 3.11**

   Option A — Download the installer directly:
   https://www.python.org/ftp/python/3.11.9/python-3.11.9-macos11.pkg

   Option B — Use Homebrew (recommended if you have it):
   ```
   brew install python@3.11
   ```

2. **Clone the repository**
   ```
   git clone https://github.com/khushi-c22/mathletes-software-project.git
   cd mathletes-software-project
   ```

3. **Create and activate a virtual environment**
   ```
   python3.11 -m venv venv311
   source venv311/bin/activate
   ```

4. **Install dependencies**
   ```
   pip install -r requirements.txt
   ```

5. **Run the eye tracker**
   ```
   python eye_tracking.py
   ```
   A window will open showing your webcam feed with green face landmark dots.
   Press **Q** to quit.

   > **Mac camera permissions:** If the webcam doesn't open, go to **System Settings → Privacy & Security → Camera** and make sure Terminal (or VS Code) has camera access enabled.

6. **Run tests**
   ```
   python -m pytest test_eye_tracking.py -v
   ```
   > Make sure your face is visible to the webcam when running tests.
