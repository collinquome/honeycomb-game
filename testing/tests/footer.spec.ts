import { test, expect } from '@playwright/test';

test.describe('Footer', () => {
  test('displays bee-themed branding and copyright', async ({ page }) => {
    await page.goto('/');
    // Footer should be present
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();

    // Check for bee-themed branding - logo alt text or heading
    await expect(footer).toContainText(/buzzwords/i);

    // Check for copyright year
    const currentYear = new Date().getFullYear();
    await expect(footer).toContainText(currentYear.toString());
  });

  test('footer contains navigation links', async ({ page }) => {
    await page.goto('/');
    const footer = page.locator('footer');
    // Home link
    await expect(footer.getByRole('link', { name: /home/i })).toBeVisible();
    // Game link
    await expect(footer.getByRole('link', { name: /game/i })).toBeVisible();
    // Leaderboard link
    await expect(footer.getByRole('link', { name: /leaderboard/i })).toBeVisible();
    // About link
    await expect(footer.getByRole('link', { name: /about/i })).toBeVisible();
  });
});
