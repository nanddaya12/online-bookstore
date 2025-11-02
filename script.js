let books = [
  { title: "Java Basics", author: "James Gosling", price: 500, image: "https://via.placeholder.com/250x200?text=Java+Basics", category: "Programming" },
  { title: "Python for Beginners", author: "Guido van Rossum", price: 600, image: "https://via.placeholder.com/250x200?text=Python+for+Beginners", category: "Programming" },
  { title: "C++ Mastery", author: "Bjarne Stroustrup", price: 550, image: "https://via.placeholder.com/250x200?text=C%2B%2B+Mastery", category: "Programming" },
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald", price: 450, image: "https://via.placeholder.com/250x200?text=The+Great+Gatsby", category: "Fiction" },
  { title: "To Kill a Mockingbird", author: "Harper Lee", price: 520, image: "https://via.placeholder.com/250x200?text=To+Kill+a+Mockingbird", category: "Fiction" },
  { title: "1984", author: "George Orwell", price: 480, image: "https://via.placeholder.com/250x200?text=1984", category: "Fiction" },
  { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", price: 650, image: "https://via.placeholder.com/250x200?text=Sapiens", category: "History" },
  { title: "The Immortal Life of Henrietta Lacks", author: "Rebecca Skloot", price: 580, image: "https://via.placeholder.com/250x200?text=Henrietta+Lacks", category: "Biography" },
  { title: "A Brief History of Time", author: "Stephen Hawking", price: 620, image: "https://via.placeholder.com/250x200?text=Brief+History+of+Time", category: "Science" },
  { title: "Atomic Habits", author: "James Clear", price: 540, image: "https://via.placeholder.com/250x200?text=Atomic+Habits", category: "Self-Help" },
  { title: "The Code Breaker", author: "Walter Isaacson", price: 590, image: "https://via.placeholder.com/250x200?text=Code+Breaker", category: "Biography" },
  { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", price: 570, image: "https://via.placeholder.com/250x200?text=Thinking+Fast+Slow", category: "Self-Help" }
];

// Load additional books from localStorage if any
const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
books = [...books, ...storedBooks.filter(storedBook => !books.some(book => book.title === storedBook.title))];

let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
let users = JSON.parse(localStorage.getItem("users")) || [];
let orders = JSON.parse(localStorage.getItem("orders")) || [];

function loadBooks(searchTerm = "", category = "") {
  const bookList = document.getElementById("bookList");
  if (!bookList) return;

  bookList.innerHTML = "";
  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === "" || book.category === category;
    return matchesSearch && matchesCategory;
  });

  filteredBooks.forEach((book, index) => {
    const div = document.createElement("div");
    div.className = "book";
    div.innerHTML = `
      <img src="${book.image}" alt="${book.title}">
      <h3>${book.title}</h3>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Category:</b> ${book.category}</p>
      <p><b>Price:</b> Rs. ${book.price}</p>
      <button onclick="addToCart(${books.indexOf(book)})">Add to Cart</button>
    `;
    bookList.appendChild(div);
  });
}

function addToCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(books[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Book added to cart!");
}

function loadCart() {
  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  if (!cartItems) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartItems.innerHTML = "<p>Your cart is empty.</p>";
    if (cartTotal) cartTotal.innerHTML = "";
    return;
  }

  let total = 0;
  cartItems.innerHTML = cart.map((book, index) => {
    total += book.price;
    return `
      <div class="cart-item">
        <div>
          <h3>${book.title}</h3>
          <p>Rs. ${book.price}</p>
        </div>
        <button onclick="removeFromCart(${index})">Remove</button>
      </div>
    `;
  }).join("");

  if (cartTotal) {
    cartTotal.innerHTML = `<h2>Total: Rs. ${total}</h2>`;
  }
}

const checkoutBtn = document.getElementById("checkoutBtn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    document.getElementById("checkoutForm").style.display = "block";
    checkoutBtn.style.display = "none";
  });
}

const paymentMethod = document.getElementById("paymentMethod");
if (paymentMethod) {
  paymentMethod.addEventListener("change", (e) => {
    const cardDetails = document.getElementById("cardDetails");
    if (e.target.value === "card") {
      cardDetails.style.display = "block";
    } else {
      cardDetails.style.display = "none";
    }
  });
}

const checkoutFormElement = document.getElementById("checkoutFormElement");
if (checkoutFormElement) {
  checkoutFormElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const paymentMethod = document.getElementById("paymentMethod").value;
    if (paymentMethod === "card") {
      // Simulate card verification
      const cardNumber = document.querySelector('input[placeholder="Card Number"]').value;
      const expiry = document.querySelector('input[placeholder="Expiry Date (MM/YY)"]').value;
      const cvv = document.querySelector('input[placeholder="CVV"]').value;
      if (!cardNumber || !expiry || !cvv) {
        alert("Please fill all card details!");
        return;
      }
      // Basic validation
      if (cardNumber.length < 16 || cvv.length < 3) {
        alert("Invalid card details!");
        return;
      }
      alert("Card verified successfully!");
    } else if (paymentMethod === "paypal") {
      alert("Redirecting to PayPal...");
      // Simulate PayPal redirect
    } else if (paymentMethod === "bank") {
      alert("Bank transfer initiated. Please complete the transfer.");
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const total = cart.reduce((sum, book) => sum + book.price, 0);
    const order = {
      id: Date.now(),
      user: currentUser ? currentUser.email : "guest",
      items: cart,
      total,
      date: new Date().toISOString()
    };
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    alert("Checkout successful! Thank you for your purchase.");
    localStorage.removeItem("cart");
    location.reload();
  });
}

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

const addBookBtn = document.getElementById("addBookBtn");
if (addBookBtn) {
  addBookBtn.addEventListener("click", () => {
    const title = document.getElementById("bookTitle").value;
    const author = document.getElementById("bookAuthor").value;
    const price = parseFloat(document.getElementById("bookPrice").value);
    const category = document.getElementById("bookCategory").value;
    if (title && author && price && category) {
      const newBook = {
        title,
        author,
        price,
        category,
        image: `https://via.placeholder.com/250x200?text=${encodeURIComponent(title)}`
      };
      books.push(newBook);
      localStorage.setItem("books", JSON.stringify(books));
      alert(`Book "${title}" added successfully!`);
      document.getElementById("bookTitle").value = "";
      document.getElementById("bookAuthor").value = "";
      document.getElementById("bookPrice").value = "";
      document.getElementById("bookCategory").value = "";
    } else {
      alert("Please fill all fields!");
    }
  });
}

const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", (e) => {
    const category = document.getElementById("categoryFilter").value;
    loadBooks(e.target.value, category);
  });
}

const categoryFilter = document.getElementById("categoryFilter");
if (categoryFilter) {
  categoryFilter.addEventListener("change", (e) => {
    const searchTerm = document.getElementById("searchInput").value;
    loadBooks(searchTerm, e.target.value);
  });
}

// Sign-in functions
const signinForm = document.getElementById("signinForm");
if (signinForm) {
  signinForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Signed in successfully!");
      window.location.href = "index.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

const googleSignInBtn = document.getElementById("googleSignInBtn");
if (googleSignInBtn) {
  googleSignInBtn.addEventListener("click", () => {
    // Simulate redirect to Google sign-in
    alert("Redirecting to Google Sign-In...");
    // In a real app, this would redirect to Google's OAuth URL
    // For demo, simulate successful sign-in
    setTimeout(() => {
      const email = "user@gmail.com"; // Simulated Google email
      let user = users.find(u => u.email === email);
      if (!user) {
        user = { email, password: "google", role: "user" };
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));
      }
      currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Signed in with Google!");
      window.location.href = "index.html";
    }, 2000);
  });
}

const signupLink = document.getElementById("signupLink");
if (signupLink) {
  signupLink.addEventListener("click", () => {
    const email = prompt("Enter email:");
    const password = prompt("Enter password:");
    if (email && password) {
      const user = { email, password, role: "user" };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      alert("Account created! Please sign in.");
    }
  });
}

const adminSigninForm = document.getElementById("adminSigninForm");
if (adminSigninForm) {
  adminSigninForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value;
    const password = document.getElementById("adminPassword").value;
    if (email === "admin@bookstore.com" && password === "admin123") {
      currentUser = { email, role: "admin" };
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      alert("Admin signed in!");
      window.location.href = "admin.html";
    } else {
      alert("Invalid admin credentials!");
    }
  });
}

const darkModeToggle = document.getElementById("darkModeToggle");
if (darkModeToggle) {
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const icon = darkModeToggle.querySelector("i");
    if (document.body.classList.contains("dark-mode")) {
      icon.className = "fas fa-sun";
      localStorage.setItem("darkMode", "true");
    } else {
      icon.className = "fas fa-moon";
      localStorage.setItem("darkMode", "false");
    }
  });
}

// Load dark mode preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  const icon = document.querySelector("#darkModeToggle i");
  if (icon) icon.className = "fas fa-sun";
}

window.onload = () => {
  loadBooks();
  loadCart();
};
