# Alex Chen - Personal Portfolio Website

A modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The website is designed to easily integrate with Strapi CMS for dynamic content management.

## 🚀 Features

- **Modern Design**: Clean, professional portfolio layout with dark theme
- **Responsive**: Mobile-first design that works on all devices
- **Fast Performance**: Built with Next.js 15 and optimized for performance
- **TypeScript**: Full type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework with custom design system
- **shadcn/ui Components**: High-quality, accessible UI components
- **Strapi Ready**: Structured for easy CMS integration

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Icons**: SVG icons (easily replaceable with icon libraries)
- **Deployment**: Ready for Vercel, Netlify, or any hosting platform

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and CSS variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/             # React components
│   ├── ui/                # shadcn/ui components
│   ├── Header.tsx         # Navigation header
│   ├── Hero.tsx           # Hero section
│   ├── Projects.tsx       # Projects showcase
│   ├── Skills.tsx         # Skills and technologies
│   ├── Experience.tsx     # Work experience timeline
│   ├── Blog.tsx           # Blog section
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer with social links
└── lib/                   # Utility functions
    └── utils.ts           # shadcn/ui utilities
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd portfolio-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 Customization

### Colors and Theme

The website uses CSS custom properties for theming. You can customize colors in `src/app/globals.css`:

```css
:root {
  --portfolio-blue: oklch(0.6 0.25 250);
  --portfolio-dark: oklch(0.1 0 0);
  --portfolio-light: oklch(0.95 0 0);
}
```

### Content

All content is currently hardcoded in the component files. When you integrate with Strapi, you'll replace these with API calls.

### Personal Information

Update the following files with your information:
- `src/app/layout.tsx` - Meta tags and title
- `src/components/Hero.tsx` - Name and description
- `src/components/Contact.tsx` - Contact details
- `src/components/Footer.tsx` - Social media links

## 🔌 Strapi Integration

This portfolio is designed to easily integrate with Strapi CMS. Here's how to set it up:

### 1. Strapi Setup

```bash
# Create new Strapi project
npx create-strapi-app@latest portfolio-cms --quickstart

# Or use existing Strapi project
```

### 2. Content Types

Create the following content types in Strapi:

#### Projects
- `title` (Text)
- `description` (Text)
- `image` (Media)
- `technologies` (JSON)
- `link` (Text, optional)
- `featured` (Boolean)

#### Skills
- `name` (Text)
- `category` (Enumeration: frontend, backend, database, devops, other)
- `proficiency` (Enumeration: beginner, intermediate, advanced, expert)

#### Experience
- `title` (Text)
- `company` (Text)
- `startDate` (Date)
- `endDate` (Date)
- `description` (Text)
- `technologies` (JSON)
- `achievements` (JSON)

#### Blog Posts
- `title` (Text)
- `excerpt` (Text)
- `content` (Rich Text)
- `slug` (UID)
- `featuredImage` (Media, optional)
- `tags` (JSON)
- `publishedAt` (DateTime)

### 3. API Integration

Create API service files in `src/lib/api/`:

```typescript
// src/lib/api/projects.ts
export async function getProjects() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/projects?populate=*`);
  const data = await res.json();
  return data.data;
}

// src/lib/api/skills.ts
export async function getSkills() {
  const res = await fetch(`${process.env.STRAPI_URL}/api/skills`);
  const data = await res.json();
  return data.data;
}
```

### 4. Environment Variables

Create `.env.local`:

```env
STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_api_token_here
```

### 5. Update Components

Replace hardcoded data with API calls:

```typescript
// In Projects.tsx
const [projects, setProjects] = useState<Project[]>([]);

useEffect(() => {
  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };
  fetchProjects();
}, []);
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

The website can be deployed to any platform that supports Next.js:
- Netlify
- AWS Amplify
- DigitalOcean App Platform
- Self-hosted servers

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

### Code Quality

- **ESLint**: Code linting and formatting
- **TypeScript**: Type checking
- **Prettier**: Code formatting (via shadcn/ui setup)

## 📝 Future Enhancements

- [ ] Blog post detail pages
- [ ] Project detail pages
- [ ] Image optimization with Next.js Image
- [ ] SEO optimization
- [ ] Analytics integration
- [ ] Contact form backend integration
- [ ] Dark/light theme toggle
- [ ] Internationalization (i18n)
- [ ] Performance monitoring
- [ ] A/B testing capabilities

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📞 Support

If you have any questions or need help with the setup, please open an issue in the repository.

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
