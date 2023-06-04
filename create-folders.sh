#!/bin/bash

# Create the User Service directory
mkdir user-service
cd user-service
mkdir models controllers routes

# Create the Product Service directory
cd ..
mkdir product-service
cd product-service
mkdir models controllers routes

# Create the Order Service directory
cd ..
mkdir order-service
cd order-service
mkdir models controllers routes

# Create the Inventory Service directory
cd ..
mkdir inventory-service
cd inventory-service
mkdir models controllers routes

# Create the Payment Service directory
cd ..
mkdir payment-service
cd payment-service
mkdir models controllers routes

# Create the Review Service directory
cd ..
mkdir review-service
cd review-service
mkdir models controllers routes

# Create the Notification Service directory
cd ..
mkdir notification-service
cd notification-service
mkdir models controllers routes

echo "Folder structure created successfully!"
