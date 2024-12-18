# Food Delivery Backend

A backend service for managing food delivery operations, including menu management, order placement, and automated order status updates.

---

## Features

1. Menu Management: Add and view menu items.
2. Order Placement: Place orders by selecting items from the menu.
3. Order Tracking: Monitor order status (`Preparing → Out for Delivery → Delivered`).
4. Automated Status Updates: Uses cron jobs to update order statuses periodically.

---

## Technologies Used

- Node.js: Backend runtime.
- Express.js: Framework for routes and API handling.
- node-cron: For automated tasks.

---

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yashshetty776/food-delivery-backend.git
   cd food-delivery-backend
2. Install dependencies:
    npm install
3. Start the server:
    node index.js
    Server runs at http://localhost:3000.
   
## API Endpoints

### Menu Management

- **POST /menu**  
  Add a new menu item.  
  **Request Body**:  
  ```json
  {
    "name": "Pizza",
    "price": 10,
    "category": "Fast Food"
  }

GET /menu
Retrieve the list of all menu items.

Orders
POST /orders
Place an order by selecting items from the menu.
**Request Body**:  
```json
 {
   "items": ["Pizza", "Burger"]
 }
```

GET /orders/:id
Retrieve the details of a specific order by ID.

## Example Usage

1. Add a Menu Item:
   Send a POST request to /menu with item details.
2. Place an Order:
   Send a POST request to /orders with item names.
3. Check Order Status:
   Send a GET request to /orders/:id.

