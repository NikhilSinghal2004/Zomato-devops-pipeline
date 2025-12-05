FROM node:18
WORKDIR /app
COPY package*.json ./
RUN if [ -f package-lock.json ] || [ -f npm-shrinkwrap.json ]; then \
			npm ci --silent; \
		else \
			npm install --silent; \
		fi
# Rebuild native modules (bcrypt) inside the container to avoid ABI issues
RUN npm rebuild bcrypt --build-from-source || true
COPY . .
EXPOSE 4000
CMD ["npm","start"]