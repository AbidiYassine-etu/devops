FROM ubuntu:latest

LABEL author="abidiyassine@outlook.com"

# Install necessary packages
RUN apt-get update && apt-get install -y \
    apache2 \
    zip \
    unzip

# Copy the photogenic.zip file to the container
COPY photogenic.zip /var/www/html/

# Set the working directory to /var/www/html
WORKDIR /var/www/html

RUN unzip photogenic.zip

# Copy all contents from the 'photogenic' directory to the current directory
RUN cp -rvf photogenic/* .

# Clean up unnecessary files
RUN rm -rf photogenic photogenic.zip

# Start the HTTP server
CMD ["/usr/sbin/apache2ctl", "-D", "FOREGROUND"]

# Expose ports
EXPOSE 80 22
