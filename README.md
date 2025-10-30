# IntelliView: The AI-Powered Mock Interview Platform

IntelliView is a full-stack, AI-powered platform designed to help users prepare for technical and behavioral interviews. It provides a realistic, high-pressure interview environment, complete with personalized questions, company-specific practice, and detailed performance analysis.

**Project Status:** In Development

---

## 🚀 Core Features

* **Dynamic Question Generation:** The AI (using RAG) generates a unique set of interview questions based on the user's **uploaded resume/CV**, the target **job role**, and the **company** they are applying to.

* **Company-Specific RAG:** The platform is pre-loaded with a vector database of "Previous Year Questions" (PYQs) for major companies. The AI retrieves and incorporates these specific questions into the interview.

* **Realistic Video Interview:** A sleek, timed, and interactive UI that presents questions one by one and records the user's video and audio answers, simulating a real remote interview.

* **Real-time Proctoring & Anti-Cheating:**
    * **Gaze Detection:** Flags when the user is consistently looking away from the screen.
    * **Multi-Face Detection:** Detects if more than one person is in the frame.
    * **Object Detection:** Identifies forbidden objects like a mobile phone.
    * **Real-time Alerts:** Provides a "proctoring report" at the end, highlighting potential violations.

* **Instant Post-Interview Analysis:**
    * **Speech-to-Text:** Transcribes all spoken answers.
    * **AI-Powered Feedback:** The Generative AI analyzes the *content* of the transcript, providing a score and constructive feedback for each answer.
    * **Detailed Report Card:** A final report gives an overall score, a breakdown by question, and a summary of all proctoring flags.

---

## 🛠️ Tech Stack

* **Backend:** **Python (FastAPI)**
    * Handles all API logic, user authentication, and file storage.
    * Manages WebSocket connections for real-time proctoring.
    * Runs background tasks for heavy AI analysis.

* **Frontend:** **React.js**
    * Manages all UI, state, and user interaction.
    * Captures video/audio using the `MediaRecorder` API.
    * Streams video frames over WebSockets for proctoring.

* **Generative AI & ML:**
    * **GenAI (e.g., OpenAI/Gemini):** For question generation and answer evaluation.
    * **Speech-to-Text (e.g., Whisper):** For transcribing audio from video answers.
    * **Computer Vision (e.g., OpenCV, MediaPipe):** For all real-time proctoring tasks.
    * **Vector Database (e.g., Chroma, Pinecone):** For storing and retrieving company-specific PYQs.
