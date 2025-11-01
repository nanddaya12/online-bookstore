# 📚 Online Bookstore

A modern, responsive online bookstore built with HTML, CSS, and JavaScript. Features category filtering, search functionality, shopping cart management, and admin panel.

## 🚀 Features

- **Modern Design**: Gradient backgrounds, smooth animations, and responsive layout
- **Category Filtering**: Filter books by Programming, Fiction, or view all
- **Search Functionality**: Real-time search through book titles and authors
- **Shopping Cart**: Add, remove, and manage cart items with quantity controls
- **Admin Panel**: Add new books with categories and pricing
- **User Authentication**: Sign-in system for users and admins
- **Dark Mode**: Toggle between light and dark themes
- **Mobile Responsive**: Optimized for all device sizes
- **Automated Testing**: Playwright tests for comprehensive coverage

## 🛠️ Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Testing**: Playwright
- **CI/CD**: GitHub Actions
- **Hosting**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/nanddaya12/online-bookstore.git
cd online-bookstore
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npm run install-browsers
```

## 🧪 Testing

### Run Tests Locally
```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui
```

### Test Coverage
- Homepage loading and book display
- Search functionality
- Category filtering
- Cart operations (add/remove items)
- Navigation between pages
- Dark mode toggle
- Mobile responsiveness
- Form submissions

## 🚀 Development

### Start Local Server
```bash
npm start
```
Then open http://localhost:8000 in your browser.

### Project Structure
```
online-bookstore/
├── index.html          # Homepage with book listings
├── cart.html           # Shopping cart page
├── admin.html          # Admin panel
├── signin.html         # User sign-in
├── admin-signin.html   # Admin sign-in
├── about.html          # About page
├── contact.html        # Contact page
├── style.css           # Main stylesheet
├── script.js           # Main JavaScript
├── package.json        # Dependencies and scripts
├── playwright.config.js # Test configuration
├── tests/
│   └── bookstore.spec.js # Test suite
└── .github/
    └── workflows/
        └── ci.yml      # GitHub Actions CI
```

## 📱 Pages

- **Home** (`index.html`): Book listings with search and filters
- **Cart** (`cart.html`): Shopping cart management
- **Admin** (`admin.html`): Book management (requires admin login)
- **Sign In** (`signin.html`): User authentication
- **About** (`about.html`): Information about the bookstore
- **Contact** (`contact.html`): Contact form and information

## 🔧 Features in Detail

### Book Management
- Books stored in localStorage
- Categories: Programming, Fiction
- Admin can add new books with title, author, price, and category

### Shopping Cart
- Persistent cart using localStorage
- Quantity controls
- Remove items
- Total calculation
- Checkout functionality

### Search & Filter
- Real-time search by title/author
- Category-based filtering
- Combined search and filter support

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Touch-friendly buttons
- Optimized for tablets and desktops

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Commit your changes: `git commit -am 'Add feature'`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌐 Live Demo

View the live demo at: [https://nanddaya12.github.io/online-bookstore/](https://nanddaya12.github.io/online-bookstore/)

## 📞 Contact

For questions or feedback, please use the contact form on the website or create an issue in this repository.
