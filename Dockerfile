FROM centos:latest

LABEL author="abidiyassine@outlook.com"

# Install dependencies
RUN yum install -y httpd zip unzip

# Copy the winrar.zip file from the build context to the container
COPY winrar.zip /var/www/html/

# Unzip the file and clean up
WORKDIR /var/www/html
RUN unzip winrar.zip && \
    cp -rvf photogenic/* . && \
    rm -rf photogenic photogenic.zip winrar.zip

# Start the HTTP server
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]

EXPOSE 80 22
