FROM nginx:1.10.3
COPY nginx.conf /etc/nginx/nginx.conf
COPY build /usr/share/nginx/algohub
