# Profile Image Setup Guide

## Current Status ✅

The Hero component is now working with a beautiful placeholder profile icon. The website will run without errors and display a professional-looking circular profile area.

## Adding Your Real Profile Image

### Option 1: Replace with Your Photo

1. **Prepare your image:**
   - Use a high-quality, professional photo
   - Recommended dimensions: 800x800 pixels or larger (square aspect ratio)
   - Supported formats: JPG, PNG, WebP
   - File size: Keep under 2MB for optimal performance

2. **Place the image:**
   - Save your image as `profile-image.jpg` in the `public/` folder
   - The full path should be: `public/profile-image.jpg`

3. **Uncomment the Image component:**
   - In `src/components/Hero.tsx`, find the commented Image section (around line 30)
   - Remove the comment markers `{/* */}` to enable the real image
   - The component will automatically use your image instead of the placeholder

### Option 2: Use a Different Image Path

If you prefer to use a different image or path:

1. **Update the Hero component:**
   ```tsx
   // In src/components/Hero.tsx, uncomment and modify:
   <Image
     src="/your-image-path.jpg"  // Change this line
     alt="Your Name - Your Title"
     fill
     className="object-cover"
     priority
     sizes="(max-width: 768px) 320px, 320px"
   />
   ```

2. **Place your image:**
   - Put your image in the `public/` folder
   - Reference it with the correct path (e.g., `/your-image.jpg`)

### Option 3: Use an External Image URL

You can also use an external image URL:

```tsx
<Image
  src="https://example.com/your-image.jpg"
  alt="Your Name - Your Title"
  fill
  className="object-cover"
  priority
  sizes="(max-width: 768px) 320px, 320px"
/>
```

## Current Working Placeholder

The current placeholder includes:
- **Circular frame** with portfolio blue border and shadow
- **Profile icon** (person silhouette) in the center
- **Decorative badges** (glasses icon top-right, checkmark bottom-left)
- **Gradient background** that matches the portfolio theme

## How to Switch to Real Image

1. **Add your image file** to `public/profile-image.jpg`
2. **Uncomment the Image component** in Hero.tsx:
   ```tsx
   // Find this section and remove the comment markers:
   {/* 
   <Image
     src="/profile-image.jpg"
     alt="Alex Chen - Full Stack Developer"
     fill
     className="object-cover"
     priority
     sizes="(max-width: 768px) 320px, 320px"
   />
   */}
   ```
3. **Remove the placeholder SVG** (optional):
   ```tsx
   // Remove or comment out this section:
   {/* Placeholder SVG Profile Icon */}
   <div className="w-full h-full flex items-center justify-center">
     <svg className="w-32 h-32 text-portfolio-blue/60" fill="currentColor" viewBox="0 0 24 24">
       <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
     </svg>
   </div>
   ```

## Image Optimization

When you add your real image, the Next.js Image component provides:
- Automatic optimization
- Responsive sizing
- Lazy loading (except for priority images)
- WebP format conversion when supported

## Troubleshooting

**Image not showing:**
- Check that the image file exists in the correct location
- Verify the file path in the `src` attribute
- Make sure you've uncommented the Image component
- Check browser console for any errors

**Image looks distorted:**
- Use a square aspect ratio image
- Ensure the image is high resolution (800x800 or larger)
- The `object-cover` class will crop the image to fit the circular container

## Example File Structure

```
portfolio-website/
├── public/
│   └── profile-image.jpg    ← Add your image here
├── src/components/
│   └── Hero.tsx            ← Component with commented Image section
└── IMAGE_SETUP.md          ← This file
```

## Next Steps

1. **Current state**: Website works with beautiful placeholder ✅
2. **Add your image**: Place `profile-image.jpg` in the `public/` folder
3. **Enable real image**: Uncomment the Image component in Hero.tsx
4. **Customize**: Update alt text and other details as needed

Your portfolio is now fully functional and ready to display your real profile image when you're ready!
