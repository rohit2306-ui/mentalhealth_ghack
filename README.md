# Your Mental Guardian AI Powered Digital Twin

A comprehensive mental wellness web application featuring AI-powered digital twins, real-time mood tracking, and personalized therapy support for youth mental health.

## Features

### 🌟 Core Features
- **3D Cosmic Interface**: Ultra-realistic cosmic background with floating digital twin avatars
- **Firebase Authentication**: Email/password and Google OAuth with email verification
- **Real-time Mood Tracking**: Interactive mood monitoring with historical analytics
- **AI Digital Twin**: Personalized AI companion for mental health support
- **User Photo Upload**: Profile picture capture and upload functionality
- **Responsive Design**: Fully responsive across all devices with glassmorphic UI

### 🎨 Design Elements
- **Cosmic Theme**: Deep space backgrounds with particle effects and neural networks
- **Glassmorphic UI**: Transparent cards with backdrop blur effects
- **Neon Accents**: Cyan and purple color scheme with glowing animations
- **3D Avatars**: Interactive floating avatars with realistic physics
- **Smooth Animations**: Framer Motion powered transitions and micro-interactions
- **Data Visualization**: Beautiful charts and progress indicators

### 🔐 Authentication & Security
- Email/password signup with verification
- Google OAuth integration
- Secure user profile storage in Firestore
- Protected routes with authentication guards
- Password strength validation

### 📊 Dashboard Features
- 3D avatar companions (User + AI Twin)
- Real-time mood tracking with emoji selector
- Historical mood trend visualization
- Quick stats and achievements
- Progress tracking for therapy sessions
- Interactive charts and analytics

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Three Fiber** for 3D graphics
- **Recharts** for data visualization
- **React Hook Form** with Yup validation
- **React Toastify** for notifications

### Backend & Services
- **Firebase Authentication** for user management
- **Cloud Firestore** for real-time database
- **Firebase Storage** for file uploads
- **Real-time listeners** for live data updates

### Development Tools
- **TypeScript** for type safety
- **ESLint** for code quality
- **PostCSS** and **Autoprefixer**
- **React Router DOM** for navigation

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mental-wellness-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at https://console.firebase.google.com
   - Enable Authentication (Email/Password and Google)
   - Create a Firestore database
   - Enable Storage
   - Copy your config and create `.env` file:

   ```env
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Firestore Security Rules

Set up these security rules in your Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can only access their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      
      // User subcollections
      match /{subcollection=**} {
        allow read, write: if request.auth != null && request.auth.uid == userId;
      }
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /user-photos/{userId}/{allPaths=**} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

## Project Structure

```
src/
├── components/
│   ├── 3D/
│   │   └── CosmicBackground.tsx
│   ├── Auth/
│   │   ├── LoginPage.tsx
│   │   └── SignupPage.tsx
│   ├── Dashboard/
│   │   └── Dashboard.tsx
│   ├── Landing/
│   │   ├── LandingPage.tsx
│   │   └── HeroSection.tsx
│   ├── Navigation/
│   │   └── Navbar.tsx
│   └── Routes/
│       └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx
├── config/
│   └── firebase.ts
├── utils/
│   └── photoUpload.ts
└── App.tsx
```

## Features Breakdown

### Landing Page
- 3D cosmic background with stars and nebula effects
- Floating digital twin avatars with physics
- Interactive particle systems
- Smooth scroll navigation
- Impact statistics and testimonials
- Mobile-responsive design

### Authentication
- Email/password signup with validation
- Google OAuth integration
- Email verification requirement
- Password strength indicator
- Photo upload during signup
- Glassmorphic form design

### Dashboard
- 3D avatar companions with animations
- Real-time mood tracking with emoji interface
- Historical mood trend charts
- Quick action buttons for navigation
- Progress statistics and achievements
- Responsive grid layout

### Data Structure

**Firestore Collections:**
```
users/{uid}/
├── profile data (name, email, photo, etc.)
├── moodHistory/{docId}
│   ├── mood: number
│   ├── date: string
│   └── timestamp: Date
├── chatSessions/{docId}
├── healingJourney/{docId}
└── therapyProgress/{docId}
```

## Deployment

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

### Environment Variables
Make sure to set up your environment variables in your deployment platform:
- All `VITE_FIREBASE_*` variables from your `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-feature`
3. Make your changes
4. Run tests and linting: `npm run lint`
5. Commit changes: `git commit -m 'Add new feature'`
6. Push to branch: `git push origin feature/new-feature`
7. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@mentalguardian.ai or join our Discord community.

## Acknowledgments

- **React Three Fiber** for amazing 3D capabilities
- **Firebase** for robust backend services
- **Framer Motion** for smooth animations
- **Tailwind CSS** for rapid UI development
- Mental health organizations for inspiring this project

---

Built with ❤️ for youth mental wellness