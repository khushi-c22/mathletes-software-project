# mathletes-software-project

# Overview

_____ is a productivity system designed to help users stay on task by analyzing eye movement and attention patterns during work sessions. By leveraging computer vision and real-time tracking, the system detects whether a user is actively engaged with their screen and provides detailed session reports to improve focus and productivity over time. 

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
- Backend: Python, R Studio
- Computer Vision:
- Database: Supabase
- Visualization: R Studio

# Privacy & Ethics
We prioritize user privacy and transparency:

  - All tracking is opt-in only
  - Data is stored securely and can be deleted by the user
  - No video footage is stored unless explicitly enabled

# Installation
