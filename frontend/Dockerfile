FROM node:18 as build
WORKDIR /app
COPY package*.json ./
# Ensure devDependencies (vite, plugins) are installed for the build
RUN npm install --silent --include=dev
COPY . .
# If a prebuilt `dist` exists in the build context, skip running the build
# (this allows local `npm run build` output to be reused). Otherwise run build.
RUN [ -d ./dist ] || npm run build
FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemon off;"]