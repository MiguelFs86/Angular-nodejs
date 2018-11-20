# STEP 1 build static website

FROM node:alpine as builder
RUN apk update && apk add --no-cache make git

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy project files into the docker image
COPY . .

RUN npm run build

# STEP 2 build a small nginx image with static website

FROM nginx

## From 'builder' copy website to default apache public folder

# COPY --from=builder /app/dist/fe /usr/local/apache2/htdocs/
COPY --from=builder /app/dist/fe /usr/share/nginx/html

EXPOSE 80

# CMD apachectl -DFOREGROUND
CMD ["nginx", "-g", "daemon off;"]
