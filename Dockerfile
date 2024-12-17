FROM centos:latest

LABEL author="abidiyassine@outlook.com"

# Copy the photogenic.zip file to the container
COPY photogenic.zip /var/www/html/

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Unzip the photogenic.zip file
RUN unzip photogenic.zip

# Copy all contents from the 'photogenic' directory to the current directory
RUN cp -rvf photogenic/* .

# Clean up unnecessary files
RUN rm -rf photogenic photogenic.zip

# Start the HTTP server
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]

# Expose ports
EXPOSE 80 22
