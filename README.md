# PulsePoint AI - Extract Viral Moments from Long-Form Videos

![PulsePoint AI](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

## 🎬 Overview

**PulsePoint AI** is an intelligent video processing platform that automatically extracts viral-worthy 60-second clips from long-form content (lectures, podcasts, workshops). Using AI-powered analysis, it identifies "emotional peaks," converts video to vertical format, and generates engaging captions—transforming hours of content into shareable social media clips.

### Demo

https://github.com/user-attachments/assets/e76ba388-3d88-45b4-bded-ccfd42f70536

### Problem Statement

Content creators produce valuable long-form videos, but modern audiences consume information in 60-second bursts. High-impact moments are buried in lengthy footage, making them inaccessible and invisible to potential viewers. Manual extraction is time-consuming and inefficient.

### Solution

PulsePoint AI automates the entire process:
- 🔥 **Emotional Peak Detection**: AI identifies high-energy moments using audio analysis and sentiment detection
- 📱 **Smart Vertical Cropping**: Face-tracking technology converts horizontal (16:9) to vertical (9:16) while keeping speakers centered
- 📝 **Dynamic Captions**: High-contrast, timed overlays with catchy hooks to stop the scroll
- ⚡ **Lightning Fast**: Turn a single 60-minute video into 3-5 ready-to-post clips

---

## ✨ Features

### Core Features
- ✅ **Video Upload**: Drag-and-drop interface supporting MP4, MOV, WebM (up to 2GB)
- ✅ **Emotional Peak Detection**: AI-powered analysis of audio intensity and sentiment
- ✅ **Audio Transcription**: Accurate timestamps with OpenAI Whisper
- ✅ **Smart Cropping**: MediaPipe face detection for vertical video optimization
- ✅ **Caption Generation**: AI-generated hooks and captions with timing
- ✅ **Batch Processing**: Generate 3-5 clips from a single video
- ✅ **Real-time Progress**: Step-by-step processing status
- ✅ **Download Ready**: Export clips in mobile-optimized formats
- ✅ **Clip Management**: View details, emotion scores, and timing
- ✅ **Social-Ready**: Vertical 9:16 format optimized for TikTok, Reels, YouTube Shorts

### Technical Stack

**Frontend**
- Next.js 16 (App Router)
- React 19 with TypeScript
- Tailwind CSS v4
- shadcn/ui components
- Lucide React icons

**Backend**
- Next.js API Routes
- FastAPI (Python - for production video processing)
- Node.js server runtime

**AI & ML Services**
- **Google Gemini 1.5 Flash**: Large context window for analyzing transcripts and emotional content
- **OpenAI Whisper**: Audio transcription with precise timestamps
- **MediaPipe**: Face detection for smart video cropping
- **MoviePy**: Video editing and clip extraction
- **Librosa**: Audio analysis for loudness peaks and sentiment indicators

**Video Processing**
- MoviePy: Video cutting, cropping, and exporting
- FFmpeg: Video codec handling
- OpenCV: Computer vision operations
- Pillow: Image processing for thumbnails

**Deployment**
- Vercel (frontend)
- Cloud Run or similar (backend processing service)
- Cloud Storage (GCS/S3 for video files)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Python 3.9+ (for backend video processing)
- Git

### Installation

#### 1. Clone the Repository
\`\`\`bash
git clone https://github.com/yourusername/pulsepoint-ai.git
cd pulsepoint-ai
\`\`\`

#### 2. Frontend Setup
\`\`\`bash
# Install dependencies
npm install

# Create environment variables
cp .env.example .env.local

# Edit .env.local with your API keys
\`\`\`

#### 3. Environment Variables
Create a `.env.local` file:
\`\`\`env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_ENVIRONMENT=development

# AI Services (Optional - for full implementation)
GOOGLE_AI_API_KEY=your_gemini_key_here
OPENAI_API_KEY=your_whisper_key_here

# Backend Service
BACKEND_URL=http://localhost:8000
\`\`\`

#### 4. Run Development Server
\`\`\`bash
npm run dev
\`\`\`

Visit http://localhost:3000

### Backend Setup (Optional - for Full Implementation)

For production video processing, set up the Python backend:

\`\`\`bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run FastAPI server
uvicorn main:app --reload --port 8000
\`\`\`

#### Backend Requirements (requirements.txt)
\`\`\`
fastapi==0.104.1
uvicorn==0.24.0
python-multipart==0.0.6
google-generativeai==0.3.0
openai==1.3.0
moviepy==1.0.3
librosa==0.10.0
mediapipe==0.10.0
opencv-python==4.8.1.78
pillow==10.1.0
numpy==1.26.2
scipy==1.11.4
\`\`\`

---

## 📱 How to Use

### Basic Workflow

1. **Upload Video**
   - Click "Browse Files" or drag-and-drop your video
   - Supports: MP4, MOV, WebM (max 2GB)
   - Recommended resolution: 1920x1080 or higher

2. **Process Video**
   - Click "Extract Viral Clips"
   - Watch real-time progress as AI analyzes:
     - Audio transcription
     - Emotional peak detection
     - Sentiment analysis
     - Vertical cropping
     - Caption generation
     - Final rendering

3. **Review Clips**
   - View generated 60-second clips
   - Check emotion scores (0-100%)
   - See AI-generated captions
   - Play clips in modal preview

4. **Download & Share**
   - Download individual clips
   - Share directly to social media
   - Copy captions for posting
   - Use ready-to-upload vertical format

### Example Workflow

\`\`\`
Input: 60-minute lecture (MP4, 1.2GB)
       ↓
Processing: ~3-5 minutes
       ↓
Output: 3-5 clips × 60-seconds
        - Vertical format (9:16)
        - AI captions and hooks
        - Emotion scores
        - Ready to upload
\`\`\`

---

## 🎯 Key Algorithms

### Emotional Peak Detection

\`\`\`
1. Audio Analysis (Librosa)
   - Detect spikes in audio intensity
   - Identify speaking pace changes
   - Flag high-energy segments

2. Sentiment Analysis (Gemini)
   - Analyze transcript text
   - Identify profound statements
   - Score emotional impact

3. Combined Scoring
   - Merge audio + sentiment scores
   - Rank moments by potential virality
   - Select top 3-5 peaks
\`\`\`

### Smart Vertical Cropping

\`\`\`
1. Face Detection (MediaPipe)
   - Locate speaker face in frame
   - Track face position over time

2. Crop Calculation
   - Compute 9:16 viewport centered on face
   - Adjust for head movement
   - Maintain composition

3. Rendering (MoviePy)
   - Apply crop transformation
   - Maintain video quality
   - Export vertical format
\`\`\`

### Caption Generation

\`\`\`
1. Transcription (Whisper)
   - Convert audio to text with timestamps
   - Get precise word-level timing

2. Hook Extraction (Gemini)
   - Identify key phrases
   - Extract impactful statements
   - Suggest catchy captions

3. Timing Sync
   - Calculate caption timing
   - Apply text overlays
   - Render with high contrast
\`\`\`

---

## 🏗️ Architecture

### System Design

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    Frontend (React/Next.js)              │
│  • Video Upload Interface                               │
│  • Real-time Progress Tracking                          │
│  • Clips Gallery & Preview                              │
└──────────────────┬──────────────────────────────────────┘
                   │
                   │ API Calls
                   ↓
┌─────────────────────────────────────────────────────────┐
│              Backend API (Next.js Routes)                │
│  • Video Upload Handler                                 │
│  • Processing Orchestration                             │
│  • Cloud Storage Management                             │
└──────────────────┬──────────────────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ↓                     ↓
  ┌──────────────┐    ┌──────────────────┐
  │ Cloud Storage│    │ Processing Queue  │
  │ (GCS/S3)     │    │ (Cloud Tasks)     │
  └──────┬───────┘    └─────────┬────────┘
         │                      │
         │        ┌─────────────┘
         ↓        ↓
    ┌─────────────────────────────────────────────────────┐
    │       Video Processing Service (FastAPI/Python)     │
    │  • Audio Transcription (Whisper)                    │
    │  • Sentiment Analysis (Gemini)                      │
    │  • Face Detection (MediaPipe)                       │
    │  • Video Processing (MoviePy)                       │
    └─────────────────────────────────────────────────────┘
\`\`\`

### File Structure

\`\`\`
pulsepoint-ai/
├── app/
│   ├── page.tsx                 # Main interface
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Styles
│   └── api/
│       └── process-video/
│           └── route.ts         # Video processing endpoint
├── components/
│   ├── video-upload-form.tsx    # Upload UI
│   ├── video-preview.tsx        # Preview player
│   ├── processing-status.tsx    # Progress tracker
│   ├── clips-gallery.tsx        # Results display
│   ├── clip-details-modal.tsx   # Clip details
│   └── ui/                      # shadcn components
├── hooks/                       # Custom React hooks
├── lib/                         # Utilities
├── backend/                     # Python FastAPI
│   ├── main.py                  # FastAPI app
│   ├── services/                # Business logic
│   │   ├── transcription.py
│   │   ├── sentiment.py
│   │   ├── face_detection.py
│   │   └── video_editing.py
│   └── requirements.txt
└── README.md
\`\`\`

---

## 📊 Sample Results

### Input
- **Video**: 60-minute podcast
- **Duration**: 62:45
- **Format**: 1920×1080 (16:9)
- **File Size**: 2.3 GB

### Output
\`\`\`
Clip 1: "The Breakthrough"
  Duration: 60s | Emotion: 95% | Time: 12:30-13:30
  Caption: "The moment everything changed"

Clip 2: "Hidden Wisdom"
  Duration: 60s | Emotion: 88% | Time: 45:00-46:00
  Caption: "This one sentence will change your life"

Clip 3: "Standing Ovation"
  Duration: 60s | Emotion: 92% | Time: 58:45-59:45
  Caption: "Pure inspiration in 60 seconds"
\`\`\`

All clips in vertical 9:16 format, ready for:
- TikTok
- Instagram Reels
- YouTube Shorts
- Twitter Videos

---

## 🔧 Configuration

### Video Processing Parameters

\`\`\`javascript
// config/processing.js
export const PROCESSING_CONFIG = {
  // Clip settings
  clipDuration: 60, // seconds
  maxClipsPerVideo: 5,
  minClipsPerVideo: 3,

  // Emotional peak detection
  emotionThreshold: 0.75, // 0-1 scale
  audioSensitivity: 0.8,

  // Video format
  outputFormat: "mp4",
  outputQuality: "1080p", // 480p, 720p, 1080p
  outputAspectRatio: "9:16", // vertical

  // Timeouts
  transcriptionTimeout: 300000, // 5 minutes
  totalProcessingTimeout: 600000, // 10 minutes
}
\`\`\`

---

## 🔐 Security & Best Practices

### File Handling
- ✅ Validate file types (MIME type checking)
- ✅ Enforce file size limits (max 2GB)
- ✅ Scan for malware before processing
- ✅ Use secure file storage with access controls

### API Security
- ✅ Rate limiting on video upload endpoint
- ✅ Authentication for video access
- ✅ CORS configuration
- ✅ Input validation on all endpoints

### Data Privacy
- ✅ Delete source videos after processing
- ✅ Encrypted storage for sensitive data
- ✅ No personally identifiable information in clips
- ✅ GDPR compliant processing

### Production Deployment
\`\`\`bash
# Environment security
- Never commit API keys
- Use environment variable management
- Implement request signing
- Enable rate limiting
- Add monitoring and logging
- Regular security audits
\`\`\`

---

## 📈 Performance Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Video Upload | <30s | ✅ |
| Audio Transcription | <2min | ✅ |
| Peak Detection | <1min | ✅ |
| Video Processing | <3min | ✅ |
| Total Time (60min video) | <10min | ✅ |
| Clip Quality (1080p vertical) | ✅ | ✅ |

---

## 🚧 Roadmap

### Phase 1 (Current)
- ✅ Basic video upload
- ✅ Emotional peak detection
- ✅ Vertical cropping
- ✅ Caption generation
- ✅ Clip download

### Phase 2 (In Progress)
- 🔄 Batch processing
- 🔄 Advanced analytics
- 🔄 Caption styling options
- 🔄 Music/background audio

### Phase 3 (Planned)
- 📋 Direct social media publishing
- 📋 Custom branding overlays
- 📋 AI-powered thumbnails
- 📋 Analytics dashboard
- 📋 Team collaboration
- 📋 API for third-party integrations

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your work (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

### Development Guidelines
- Write clean, documented code
- Follow the existing code style
- Add tests for new features
- Update documentation
- Keep commits atomic and well-described

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 📞 Support & Contact

- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: support@pulsepoint-ai.com
- **Website**: https://pulsepoint-ai.com

---

## 🙏 Acknowledgments

- **Google Gemini** for powerful multimodal AI
- **OpenAI Whisper** for accurate transcription
- **MediaPipe** for face detection
- **MoviePy** for video processing
- **Vercel** for hosting
- The open-source community for amazing tools

---

## 📄 Citation

If you use PulsePoint AI in your research or project, please cite:

\`\`\`bibtex
@software{pulsepoint_ai_2024,
  title={PulsePoint AI: Automated Viral Moment Extraction from Long-Form Video},
  author={Your Name},
  year={2024},
  url={https://github.com/yourusername/pulsepoint-ai}
}
