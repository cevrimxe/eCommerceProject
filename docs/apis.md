## 📦 API Endpoints Overview

### 🔐 **1. Auth (Authentication) APIs**
- `POST /register` → Register a new user  
- `POST /login` → Log in (via session or JWT)  
- `POST /logout` → Log out (optional)  
- `GET /me` → Get current logged-in user info  

---

### 👤 **2. User APIs**
- `GET /users` → List all users (admin only)  
- `GET /users/{id}` → Get a specific user  
- `PUT /users/{id}` → Update user info  
- `DELETE /users/{id}` → Delete a user (admin only)  

---

### 🛍️ **3. Product APIs**
- `GET /products` → List all products  
- `GET /products/{id}` → Get product details  
- `POST /products` → Create a new product (admin only)  
- `PUT /products/{id}` → Update product info (admin only)  
- `DELETE /products/{id}` → Delete a product (admin only)  

---

### 🧺 **4. Cart APIs**
- `GET /cart` → Get the current user's cart  
- `POST /cart` → Add a product to the cart (`product_id`, `quantity`)  
- `PUT /cart/{item_id}` → Update quantity of a cart item  
- `DELETE /cart/{item_id}` → Remove item from cart  

---

### 📦 **5. Order APIs**
- `GET /orders` → List all orders for the logged-in user  
- `GET /orders/{id}` → Get order details  
- `POST /orders` → Convert cart to order  
- `PUT /orders/{id}/status` → Update order status (admin only)  

---

### 💳 **6. Payment APIs** (basic level)
- `POST /payment` → Initiate payment (mock implementation)  
- `GET /payment/status/{order_id}` → Check payment status  

---

### 📚 **7. Category APIs** (optional but recommended)
- `GET /categories` → List all categories  
- `POST /categories` → Create new category (admin only)  
- `PUT /categories/{id}` → Update category (admin only)  
- `DELETE /categories/{id}` → Delete category (admin only)  

---

### 🌟 **8. Review & Rating APIs** (extra feature)
- `GET /products/{id}/reviews` → Get reviews of a product  
- `POST /products/{id}/reviews` → Submit a review  
- `DELETE /reviews/{id}` → Delete a review (owner or admin only)  
