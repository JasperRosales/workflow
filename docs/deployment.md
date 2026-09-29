# Deployment

## Building for Production

```bash
npm run build
```

This creates an optimized production build in the `.next/` directory.

## Deployment Platforms

### Vercel (Recommended)

The project includes a `vercel.json` configuration file. Deploy with:

```bash
npx vercel
```

Or connect your Git repository to Vercel for automatic deployments.

### Other Platforms

The app can be deployed to any platform that supports Next.js:

- **Node.js hosting**: `npm start` after `npm run build`
- **Docker**: Use a Node.js base image, run `npm install && npm run build && npm start`
- **Static export**: Not supported (requires server-side API routes)

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | Yes | Google Gemini API key |
| `GEMINI_MODEL` | No | Model name (default: `gemini-3.6-flash`) |

## Performance

- **Code splitting**: Results view is dynamically imported
- **PDF generation**: Lazy-loaded via dynamic imports
- **Local Storage**: Client-side persistence reduces server load
- **API routes**: Server-side processing for AI analysis

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Privacy

- **CV Builder**: All data stays in browser Local Storage
- **Resume Analyzer**: Files are processed in memory and discarded after analysis
- **No tracking**: No analytics or tracking scripts
