#!/bin/bash
echo "Building NYRO for production..."
npm run build
echo "Build complete. Pushing to GitHub..."
git add .
git commit -m "${1:-deploy}"
git push origin main
echo "Pushed to GitHub. Netlify will now deploy."
echo "Done."
