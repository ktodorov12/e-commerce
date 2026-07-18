import { expect, test } from '@playwright/test';

/**
 * Phase-1 smoke suite: home → product → add-to-bag → cart drawer, against
 * mock.shop. Assertions key on the user-facing copy in
 * frontend/src/content/site.ts (mirrored here — tests/ does not import the app).
 */
test.describe('storefront smoke', () => {
  test('home renders the hero', async ({ page }) => {
    await page.goto('/');
    // Role + accessible name: the headline renders as word-stagger spans,
    // so the accessible name (not raw text content) carries the spacing.
    await expect(
      page.getByRole('heading', { name: 'Quiet pieces, worn loud.', level: 1 }),
    ).toBeVisible();
  });

  test('product listing renders pieces from mock.shop', async ({ page }) => {
    await page.goto('/products');
    await expect(page.getByRole('heading', { name: 'All Pieces' })).toBeVisible();
    await expect(page.locator('a[href^="/products/"]').first()).toBeVisible();
  });

  test('add to bag opens the cart with a checkout action', async ({ page }) => {
    await page.goto('/products');
    await page.locator('a[href^="/products/"]').first().click();

    // Generous timeout: a cold dev server compiles the PDP route on first hit.
    await expect(page).toHaveURL(/\/products\/.+/, { timeout: 20_000 });
    await page.getByRole('button', { name: 'Add to Bag' }).first().click();

    // Adding a line auto-opens the cart drawer (see machines/cartMachine.ts),
    // which surfaces the checkout hand-off.
    await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
  });
});
