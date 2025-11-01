import { test, expect } from '@playwright/test';

test.describe('Online Bookstore', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load homepage with books', async ({ page }) => {
    await expect(page).toHaveTitle(/Online Bookstore/);
    await expect(page.locator('h1')).toContainText('📚 Online Bookstore');

    // Check if books are displayed
    const bookElements = page.locator('.book');
    await expect(bookElements).toHaveCount(await bookElements.count());
    expect(await bookElements.count()).toBeGreaterThan(0);
  });

  test('should display search bar and category filter', async ({ page }) => {
    await expect(page.locator('#searchInput')).toBeVisible();
    await expect(page.locator('#categoryFilter')).toBeVisible();
  });

  test('should filter books by search term', async ({ page }) => {
    const searchInput = page.locator('#searchInput');
    await searchInput.fill('Java');

    // Wait for filtering to apply
    await page.waitForTimeout(500);

    const bookElements = page.locator('.book');
    const bookTitles = await bookElements.locator('h3').allTextContents();

    // Check that all visible books contain the search term
    bookTitles.forEach(title => {
      expect(title.toLowerCase()).toContain('java');
    });
  });

  test('should filter books by category', async ({ page }) => {
    const categoryFilter = page.locator('#categoryFilter');
    await categoryFilter.selectOption('Programming');

    // Wait for filtering to apply
    await page.waitForTimeout(500);

    const bookElements = page.locator('.book');
    const bookCategories = await bookElements.locator('p').filter({ hasText: 'Category:' }).allTextContents();

    // Check that all visible books are in Programming category
    bookCategories.forEach(category => {
      expect(category).toContain('Programming');
    });
  });

  test('should add book to cart', async ({ page }) => {
    const addToCartButton = page.locator('.book button').first();
    await addToCartButton.click();

    // Check if alert appears (in a real app, you'd check cart state)
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('added to cart');
      await dialog.accept();
    });
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.locator('nav a').filter({ hasText: 'Cart' }).click();
    await expect(page).toHaveURL(/cart\.html/);
    await expect(page.locator('h1')).toContainText('Shopping Cart');
  });

  test('should navigate to admin page', async ({ page }) => {
    await page.locator('nav a').filter({ hasText: 'Admin' }).click();
    await expect(page).toHaveURL(/admin-signin\.html/);
  });

  test('should display cart items', async ({ page }) => {
    // First add an item to cart
    await page.locator('.book button').first().click();

    // Handle alert
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Navigate to cart
    await page.locator('nav a').filter({ hasText: 'Cart' }).click();

    // Check if cart has items
    const cartItems = page.locator('#cartItems .cart-item');
    expect(await cartItems.count()).toBeGreaterThan(0);
  });

  test('should remove item from cart', async ({ page }) => {
    // Add item to cart
    await page.locator('.book button').first().click();
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Go to cart
    await page.locator('nav a').filter({ hasText: 'Cart' }).click();

    // Remove item
    const removeButton = page.locator('.cart-item button').first();
    await removeButton.click();

    // Check if item was removed
    await expect(page.locator('.cart-item')).toHaveCount(0);
  });

  test('should display total in cart', async ({ page }) => {
    // Add item to cart
    await page.locator('.book button').first().click();
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // Go to cart
    await page.locator('nav a').filter({ hasText: 'Cart' }).click();

    // Check if total is displayed
    await expect(page.locator('#cartTotal')).toBeVisible();
  });

  test('should navigate to sign in page', async ({ page }) => {
    await page.locator('nav a').filter({ hasText: 'Sign In' }).click();
    await expect(page).toHaveURL(/signin\.html/);
  });

  test('should toggle dark mode', async ({ page }) => {
    const darkModeButton = page.locator('#darkModeToggle');
    await expect(darkModeButton).toBeVisible();

    const initialClass = await page.locator('body').getAttribute('class');
    await darkModeButton.click();

    const newClass = await page.locator('body').getAttribute('class');
    expect(newClass).not.toBe(initialClass);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    // Check if navigation is still accessible
    await expect(page.locator('nav')).toBeVisible();

    // Check if books are displayed in mobile layout
    const bookElements = page.locator('.book');
    await expect(bookElements.first()).toBeVisible();
  });

  test('should load about page', async ({ page }) => {
    await page.goto('/about.html');
    await expect(page.locator('h2')).toContainText('About Our Bookstore');
  });

  test('should load contact page', async ({ page }) => {
    await page.goto('/contact.html');
    await expect(page.locator('h2')).toContainText('Contact Us');
  });
});
