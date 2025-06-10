import { test, expect } from "@playwright/test";

test.describe("Shopping Cart Tests", () => {

  test("Test 1: Validate the heading and initial cart state", async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');
    
    // Validate heading text
    await expect(page.locator('h1')).toHaveText("Items Added to Cart");
    
    // Validate cart is empty by default
    await expect(page.locator('.cart-item')).toHaveCount(0);
    
    // Validate total price is $0
    await expect(page.locator('.total-price')).toHaveText('$0');
    
    // Validate Place Order button is visible, disabled, and has correct text
    const placeOrderBtn = page.locator('button:has-text("Place Order")');
    await expect(placeOrderBtn).toBeVisible();
    await expect(placeOrderBtn).toBeDisabled();
    await expect(placeOrderBtn).toHaveText('Place Order');
  });

  test("Test 2: Add one course to cart and validate", async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');

    const firstCourse = page.locator('.card').first();
    await firstCourse.locator('button:has-text("Add to Cart")').click();

    // Validate course appears in cart
    const cartItem = page.locator('.cart-item').first();
    await expect(cartItem.locator('img')).toBeVisible();

    const courseName = await firstCourse.locator('h5').innerText();
    await expect(cartItem.locator('.course-name')).toHaveText(courseName);

    // Validate discount if exists
    const discountLocator = firstCourse.locator('.discount');
    if (await discountLocator.count() > 0) {
      const discountText = await discountLocator.innerText();
      await expect(cartItem.locator('.discount')).toHaveText(discountText);
    }

    // Validate total price excludes discount
    const priceText = await firstCourse.locator('.card-footer h3').innerText();
    const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    let discount = 0;
    if (await discountLocator.count() > 0) {
      const discountText = await discountLocator.innerText();
      discount = parseFloat(discountText.replace(/[^0-9.]/g, ''));
    }
    const expectedTotal = price - discount;

    const totalPriceText = await page.locator('.total-price').innerText();
    const totalPrice = parseFloat(totalPriceText.replace(/[^0-9.]/g, ''));
    expect(totalPrice).toBeCloseTo(expectedTotal, 2);

    // Place order
    const placeOrderBtn = page.locator('button:has-text("Place Order")');
    await expect(placeOrderBtn).toBeEnabled();
    await placeOrderBtn.click();

    // Success message
    await expect(page.locator('.success-message')).toHaveText('Your order has been placed.');

    // Cart empty and total reset
    await expect(page.locator('.cart-item')).toHaveCount(0);
    await expect(page.locator('.total-price')).toHaveText('$0');
  });

  test("Test 3: Add two courses to cart and validate", async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');

    const courses = page.locator('.card');
    await courses.nth(0).locator('button:has-text("Add to Cart")').click();
    await courses.nth(1).locator('button:has-text("Add to Cart")').click();

    const cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(2);

    let expectedTotal = 0;

    for (let i = 0; i < 2; i++) {
      const course = courses.nth(i);
      const cartItem = cartItems.nth(i);

      await expect(cartItem.locator('img')).toBeVisible();

      const courseName = await course.locator('h5').innerText();
      await expect(cartItem.locator('.course-name')).toHaveText(courseName);

      const discountLocator = course.locator('.discount');
      if (await discountLocator.count() > 0) {
        const discountText = await discountLocator.innerText();
        await expect(cartItem.locator('.discount')).toHaveText(discountText);
      }

      const priceText = await course.locator('.card-footer h3').innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

      let discount = 0;
      if (await discountLocator.count() > 0) {
        const discountText = await discountLocator.innerText();
        discount = parseFloat(discountText.replace(/[^0-9.]/g, ''));
      }

      expectedTotal += price - discount;
    }

    const totalPriceText = await page.locator('.total-price').innerText();
    const totalPrice = parseFloat(totalPriceText.replace(/[^0-9.]/g, ''));
    expect(totalPrice).toBeCloseTo(expectedTotal, 2);

    const placeOrderBtn = page.locator('button:has-text("Place Order")');
    await expect(placeOrderBtn).toBeEnabled();
    await placeOrderBtn.click();

    await expect(page.locator('.success-message')).toHaveText('Your order has been placed.');
    await expect(page.locator('.cart-item')).toHaveCount(0);
    await expect(page.locator('.total-price')).toHaveText('$0');
  });

  test("Test 4: Add all three courses to cart and validate", async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');

    const courses = page.locator('.card');
    const courseCount = await courses.count();
    expect(courseCount).toBe(3);

    for (let i = 0; i < courseCount; i++) {
      await courses.nth(i).locator('button:has-text("Add to Cart")').click();
    }

    const cartItems = page.locator('.cart-item');
    await expect(cartItems).toHaveCount(3);

    let expectedTotal = 0;

    for (let i = 0; i < courseCount; i++) {
      const course = courses.nth(i);
      const cartItem = cartItems.nth(i);

      await expect(cartItem.locator('img')).toBeVisible();

      const courseName = await course.locator('h5').innerText();
      await expect(cartItem.locator('.course-name')).toHaveText(courseName);

      const discountLocator = course.locator('.discount');
      if (await discountLocator.count() > 0) {
        const discountText = await discountLocator.innerText();
        await expect(cartItem.locator('.discount')).toHaveText(discountText);
      }

      const priceText = await course.locator('.card-footer h3').innerText();
      const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));

      let discount = 0;
      if (await discountLocator.count() > 0) {
        const discountText = await discountLocator.innerText();
        discount = parseFloat(discountText.replace(/[^0-9.]/g, ''));
      }

      expectedTotal += price - discount;
    }

    const totalPriceText = await page.locator('.total-price').innerText();
    const totalPrice = parseFloat(totalPriceText.replace(/[^0-9.]/g, ''));
    expect(totalPrice).toBeCloseTo(expectedTotal, 2);

    const placeOrderBtn = page.locator('button:has-text("Place Order")');
    await expect(placeOrderBtn).toBeEnabled();
    await placeOrderBtn.click();

    await expect(page.locator('.success-message')).toHaveText('Your order has been placed.');
    await expect(page.locator('.cart-item')).toHaveCount(0);
    await expect(page.locator('.total-price')).toHaveText('$0');
  });

  test("Test 5: Validate 'Add to Cart' buttons for all courses", async ({ page }) => {
    await page.goto('https://techglobal-training.com/frontend/shopping-cart');

    const courses = page.locator('.card');
    const courseCount = await courses.count();
    expect(courseCount).toBe(3);

    for (let i = 0; i < courseCount; i++) {
      const addToCartBtn = courses.nth(i).locator('button:has-text("Add to Cart")');
      await expect(addToCartBtn).toBeVisible();
      await expect(addToCartBtn).toBeEnabled();
      await expect(addToCartBtn).toHaveText("Add to Cart");
    }
  });

});

