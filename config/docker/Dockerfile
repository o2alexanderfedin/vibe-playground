FROM nginx:alpine

# Remove default nginx static resources
RUN rm -rf /usr/share/nginx/html/*

# Copy static files to nginx directory
COPY src/ /usr/share/nginx/html/

# Copy nginx configuration
COPY config/docker/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]