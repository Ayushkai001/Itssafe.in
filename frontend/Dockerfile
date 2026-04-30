# ────────────────────────────────────────────
# Stage 1 — Build the Vite/React app
# ────────────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Copy dependency manifests first for layer caching
COPY package.json package-lock.json ./

# Install all dependencies (including dev, needed for the build)
RUN npm ci

# Copy the rest of the source
COPY . .

# Build the production bundle → output goes to /app/dist
RUN npm run build

# ────────────────────────────────────────────
# Stage 2 — Serve with lightweight Nginx
# ────────────────────────────────────────────
FROM nginx:1.27-alpine AS production

# Remove the default nginx site config
RUN rm /etc/nginx/conf.d/default.conf

# Copy our custom nginx config
COPY nginx.conf /etc/nginx/conf.d/itssafe.conf

# Copy the built static files from the build stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose the port Nginx listens on (we'll map it externally)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
