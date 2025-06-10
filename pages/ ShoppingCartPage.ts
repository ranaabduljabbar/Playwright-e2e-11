import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ShoppingCartPage extends BasePage {
  readonly heading: Locator;
  readonly courses: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.locator("h1");
    this.courses = page.locator(".card");
  }

  // Add this method:
  async goto() {
    await this.page.goto("https://techglobal-training.com/frontend/shopping-cart");
  }

  // rest of your locators...

  courseImage(index: number): Locator {
    return this.courses.nth(index).locator("img");
  }

  courseName(index: number): Locator {
    return this.courses.nth(index).locator("h5");
  }

  courseTag(index: number): Locator {
    return this.courses.nth(index).locator(".badge");
  }

  coursePrice(index: number): Locator {
    return this.courses.nth(index).locator(".card-footer h3");
  }

  addToCartButton(index: number): Locator {
    return this.courses.nth(index).locator("button", { hasText: "Add to Cart" });
  }

  discountTag(index: number): Locator {
    return this.courses.nth(index).locator(".discount");
  }
}
