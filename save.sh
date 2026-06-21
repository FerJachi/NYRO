#!/bin/bash
echo "Saving changes to GitHub (no deploy)..."
git add .
git commit -m "[skip netlify] ${1:-save}"
git push origin main
echo "Saved to GitHub. Netlify will NOT deploy."
