FROM centos:latest

LABEL author="abidiyassine@outlook.com"

# Install dependencies in one layer
RUN yum install -y httpd zip unzip curl && \
    # Download the file using curl (with a user-agent to avoid blocking)
    curl -L -A "Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/109.0" \
    -o /var/www/html/photogenic.zip https://www.free-css.com/assets/files/free-css-template/download/page254/photogenic.zip && \
    # Unzip the template and clean up
    unzip /var/www/html/photogenic.zip -d /var/www/html/ && \
    cp -rvf /var/www/html/photogenic/* /var/www/html/ && \
    rm -rf /var/www/html/photogenic /var/www/html/photogenic.zip

# Set the working directory to the web root
WORKDIR /var/www/html

# Start the HTTP server in the foreground
CMD ["/usr/sbin/httpd", "-D", "FOREGROUND"]

# Expose the necessary ports
EXPOSE 80 22
