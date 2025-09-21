# Artisan Mini - Your Craft Assistant

A beautiful, AI-powered chat application designed to help artisans and craftspeople market their traditional crafts in the digital age. Built with React, TypeScript, and modern web technologies.

## 🌟 Features

- AI-Powered Marketing Strategies: Get personalized digital marketing strategies for your craft business
- Budget-Aware Recommendations: Strategies tailored to your specific budget constraints
- Interactive Chat Interface: Natural conversation flow with the AI assistant
- Strategy Selection: Choose from multiple marketing approaches based on your needs
- Responsive Design: Works seamlessly on desktop and mobile devices
- Modern UI: Clean, artisan-inspired design with warm, earthy color palette

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd artisan-mini
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint for code quality

## 🏗️ Tech Stack

- Frontend: React 18, TypeScript
- Build Tool: Vite
- Styling: Tailwind CSS, CSS Variables
- UI Components: Radix UI primitives with custom styling
- State Management: React hooks
- Routing: React Router
- HTTP Client: Fetch API
- AI Integration: Google Gemini API

## 📁 Project Structure

```
artisan-mini/
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   ├── ChatView.tsx   # Main chat interface
│   │   ├── ChatMessage.tsx # Individual message component
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   ├── prompts/           # AI prompt templates
│   ├── App.tsx            # Main app component
│   └── main.tsx           # Application entry point
├── components.json         # shadcn/ui configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Project dependencies
```

## 🎨 Design System

The application uses a custom design system inspired by traditional artisan crafts:

- Color Palette: Warm, earthy tones with terracotta as the primary color
- Typography: Clean, readable fonts optimized for accessibility
- Components: Consistent, reusable UI components
- Responsive: Mobile-first design approach

## 🔧 Configuration

### Environment Variables

1. Copy the example environment file:
```bash
cp .env.example .env
```

2. Edit the `.env` file and add your API key:
```env
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### AI Integration

The application uses Google's Gemini API for generating marketing strategies. Make sure to:

1. Get your API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Copy `.env.example` to `.env` and replace `your_gemini_api_key_here` with your actual API key
3. The API key is automatically loaded from the environment variables in the `useArtisanChat` hook
4. **Important**: Never commit your `.env` file to version control - it's already included in `.gitignore`

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Environment Variables for Production

When deploying to production platforms, make sure to set the environment variable:
- **Vercel**: Add `VITE_GEMINI_API_KEY` in your project settings
- **Other platforms**: Set the environment variable according to your platform's documentation

### Deploy to Vercel

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Set environment variable:
```bash
vercel env add VITE_GEMINI_API_KEY
```

3. Deploy:
```bash
vercel
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/) for fast development
- UI components from [Radix UI](https://www.radix-ui.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- AI powered by [Google Gemini](https://ai.google.dev/)

## 📞 Support

If you encounter any issues or have questions, please:

1. Check the [Issues](https://github.com/your-username/artisan-mini/issues) page
2. Create a new issue with detailed information

---

**Made with ❤️ for artisans and craftspeople worldwide**
