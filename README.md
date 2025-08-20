# AI Career Coach 🚀

An advanced AI-powered career development platform built with Next.js that helps professionals excel in their career journey through intelligent tools and personalized guidance.

## ✨ Features

### 🤖 AI-Powered Career Guidance
- Personalized career advice and insights powered by advanced AI technology
- Industry-specific recommendations tailored to your experience level
- Real-time market analysis and career path suggestions

### 📄 Smart Resume Builder
- ATS-optimized resume creation with AI assistance
- Dynamic resume templates with professional formatting
- PDF export functionality for easy sharing
- AI-powered content improvement suggestions

### 💼 Interview Preparation
- Role-specific interview questions with instant feedback
- Mock interview sessions with performance tracking
- Comprehensive quiz system with detailed explanations
- Performance analytics and improvement recommendations

### 📊 Industry Insights Dashboard
- Real-time industry trends and market analysis
- Salary data visualization with interactive charts
- Job market demand levels and growth projections
- Skills recommendations based on industry requirements

### ✍️ AI Cover Letter Generator
- Intelligent cover letter creation tailored to specific roles
- Company and position-specific customization
- Professional templates with AI optimization

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Authentication**: Clerk
- **Database**: Prisma ORM
- **Charts**: Recharts for data visualization
- **Animations**: Framer Motion
- **PDF Generation**: html2pdf.js
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI primitives

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Souramoy/app-teacher.git
cd app-teacher
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Fill in your environment variables:
```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database
DATABASE_URL=your_database_url

# AI Services (if applicable)
OPENAI_API_KEY=your_openai_api_key
```

4. **Set up the database**
```bash
npx prisma generate
npx prisma db push
```

5. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
app-teacher/
├── app/                          # Next.js 13+ App Router
│   ├── (main)/                   # Main application routes
│   │   ├── dashboard/            # Industry insights dashboard
│   │   ├── interview/            # Interview preparation features
│   │   ├── resume/               # Resume builder
│   │   ├── ai-cover-letter/      # Cover letter generator
│   │   └── onboarding/           # User onboarding flow
│   ├── actions/                  # Server actions
│   ├── lib/                      # Utility libraries and schemas
│   └── globals.css               # Global styles
├── components/                   # Reusable React components
│   ├── ui/                       # shadcn/ui components
│   ├── header.jsx                # Navigation header
│   ├── hero.jsx                  # Landing page hero section
│   └── theme-provider.jsx        # Theme management
├── data/                         # Static data and configurations
├── hooks/                        # Custom React hooks
├── lib/                          # Utility functions
├── prisma/                       # Database schema and migrations
├── public/                       # Static assets
└── www/                          # Additional web assets
```

## 🎯 Key Features Walkthrough

### 1. Professional Onboarding
- Industry and expertise selection for personalized guidance
- Skills assessment and career goal setting
- Customized dashboard based on user profile

### 2. Resume Builder
- **Smart Templates**: Multiple professional resume templates
- **AI Enhancement**: Automatic content improvement suggestions
- **ATS Optimization**: Ensures resumes pass Applicant Tracking Systems
- **Export Options**: PDF generation with professional formatting

### 3. Interview Preparation
- **Mock Interviews**: AI-powered interview simulations
- **Performance Tracking**: Detailed analytics and progress monitoring
- **Question Bank**: Extensive database of role-specific questions
- **Instant Feedback**: Real-time suggestions for improvement

### 4. Industry Insights
- **Market Trends**: Real-time industry analysis and trends
- **Salary Insights**: Comprehensive salary data with visualizations
- **Skills Demand**: Trending skills and competency requirements
- **Growth Projections**: Industry growth rates and opportunities

### 5. Cover Letter Generator
- **AI-Powered Writing**: Intelligent content generation
- **Role-Specific**: Tailored to specific job positions and companies
- **Professional Templates**: Multiple formatting options

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio
npx prisma generate  # Generate Prisma client
npx prisma db push   # Push schema changes to database
```

### Environment Variables

Create a `.env.local` file with the following variables:

```env
# Required
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
DATABASE_URL=

# Optional
OPENAI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🚀 Deployment

The application can be deployed on various platforms:

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on every push to main

### Other Platforms
- **Netlify**: Configure build command as `npm run build`
- **Railway**: Automatic deployment with database support
- **Heroku**: Use Node.js buildpack

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add some amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**TEAM DEVXTREME AT KGEC**

- **Souramoy Shee** - [@Souramoy](https://github.com/Souramoy)
- **SK MIRAJUL ISLAM** - [@skmirajulislam](https://github.com/skmirajulislam)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.dev/) for authentication solutions
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Framer Motion](https://framer.com/motion/) for smooth animations

## 🐛 Bug Reports & Feature Requests

Please use the [GitHub Issues](https://github.com/Souramoy/app-teacher/issues) page to report bugs or request features.

## 📞 Support

For support and questions, please contact:
- Email: support@devxtreme.com
- GitHub Issues: [Create an issue](https://github.com/Souramoy/app-teacher/issues)

---

**Transforming careers through innovative AI solutions and cutting-edge technology** 🚀

Made with ❤️ by Team DevXtreme
