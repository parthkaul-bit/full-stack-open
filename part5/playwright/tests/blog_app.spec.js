const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Matti Luukkainen",
        username: "mluukkai",
        password: "salainen",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const loginForm = await page.locator("form");
    await expect(loginForm).toBeVisible();

    const usernameInput = await page.locator('input[name="Username"]');
    const passwordInput = await page.locator('input[name="Password"]');
    await expect(usernameInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  describe("Login", () => {
    test("fails with wrong credentials", async ({ page }) => {
      await page.fill('input[name="Username"]', "wronguser");
      await page.fill('input[name="Password"]', "wrongpassword");
      await page.click('button[type="submit"]');

      await expect(
        page.locator("text=Wrong username or password")
      ).toBeVisible();
    });

    test("succeeds with correct credentials", async ({ page }) => {
      await page.fill('input[name="Username"]', "mluukkai");
      await page.fill('input[name="Password"]', "salainen");
      await page.click('button[type="submit"]');

      await expect(page.locator("text=mluukkai logged in")).toBeVisible();
    });

    describe("After login", () => {
      beforeEach(async ({ page }) => {
        await page.fill('input[name="Username"]', "mluukkai");
        await page.fill('input[name="Password"]', "salainen");
        await page.click('button[type="submit"]');

        await expect(page.locator("text=mluukkai logged in")).toBeVisible();

        await page.goto("http://localhost:5173/blogs");
      });

      test("a new blog can be created", async ({ page }) => {
        await page.click('button[name="label"]');
        await page.fill('input[name="title"]', "My New Blog");
        await page.fill('input[name="author"]', "Test Author");
        await page.fill('input[name="url"]', "http://example.com");
        await page.click('button[type="submit"]');

        await expect(
          page.locator("text=a new blog My New Blog by Test Author added")
        ).toBeVisible();

        await page.goto("http://localhost:5173/blogs");
        await expect(page.locator("text=My New Blog")).toBeVisible();
      });

      test("a blog can be liked", async ({ page }) => {
        await page.click('button[name="label"]');
        await page.fill('input[name="title"]', "My New Blog");
        await page.fill('input[name="author"]', "Test Author");
        await page.fill('input[name="url"]', "http://example.com");
        await page.click('button[type="submit"]');
        await page.locator("button", { hasText: "view" }).click();
        await page.locator("button", { hasText: "like" }).click();

        await expect(page.locator("text=Likes: 1")).toBeVisible();
      });

      test("user can delete a blog they created", async ({ page }) => {
        await page.click('button[name="label"]');
        await page.fill('input[name="title"]', "Blog to be deleted");
        await page.fill('input[name="author"]', "Test Author");
        await page.fill('input[name="url"]', "http://example.com");
        await page.click('button[type="submit"]');

        await page.goto("http://localhost:5173/blogs");
        await page.locator("button", { hasText: "view" }).click();

        // Handle the confirmation dialog
        await page.on("dialog", (dialog) => dialog.accept());
        await page.locator("button", { hasText: "delete" }).click();

        // Expect the blog to no longer be visible
        await expect(page.locator("text=Blog to be deleted")).not.toBeVisible();
      });

      test("only the blog creator can see the delete button", async ({
        page,
        request,
      }) => {
        await page.click('button[name="label"]');
        await page.fill('input[name="title"]', "My New Blog");
        await page.fill('input[name="author"]', "Test Author");
        await page.fill('input[name="url"]', "http://example.com");
        await page.click('button[type="submit"]');

        await page.goto("http://localhost:5173/blogs");
        await page.locator("button", { hasText: "view" }).click();

        await expect(
          page.locator("button", { hasText: "delete" })
        ).toBeVisible();

        await request.post("http://localhost:3003/api/users", {
          data: {
            name: "Another User",
            username: "anotheruser",
            password: "anotherpassword",
          },
        });

        await page.locator("button", { hasText: "logout" }).click();
        await page.fill('input[name="Username"]', "anotheruser");
        await page.fill('input[name="Password"]', "anotherpassword");
        await page.click('button[type="submit"]');

        await page.locator("button", { hasText: "view" }).click();

        await expect(
          page.locator("button", { hasText: "delete" })
        ).not.toBeVisible();
      });
    });
  });
});
