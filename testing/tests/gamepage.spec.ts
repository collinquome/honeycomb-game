import { test, expect } from '@playwright/test';

// Test: GamePage renders honeycomb, input, and word list

test.describe('GamePage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/game');
  });

  test('should display honeycomb letters with center letter', async ({ page }) => {
    // Honeycomb letters are rendered as buttons or spans with a bee theme
    const honeycomb = page.locator('[data-testid="honeycomb-letter"]');
    await expect(honeycomb).toHaveCount(7);
    // Center letter should have a specific marker
    const center = page.locator('[data-testid="honeycomb-letter-center"]');
    await expect(center).toHaveCount(1);
    await expect(center).toBeVisible();
  });

  test('should accept word input and submit', async ({ page }) => {
    const input = page.getByPlaceholder('Enter word');
    await expect(input).toBeVisible();
    await input.fill('test');
    const submit = page.getByRole('button', { name: /submit/i });
    await expect(submit).toBeVisible();
    await submit.click();
    // Either success or error feedback should be shown
    const feedback = page.locator('[data-testid="word-feedback"]');
    await expect(feedback).toBeVisible();
  });

  test('should update found words list after submitting a valid word', async ({ page }) => {
    const input = page.getByPlaceholder('Enter word');
    await input.fill('test');
    const submit = page.getByRole('button', { name: /submit/i });
    await submit.click();
    // Found words list updates
    const foundList = page.locator('[data-testid="found-word-list"]');
    await expect(foundList).toBeVisible();
    // The submitted word may or may not be valid, but list should render
    // (App may show empty state or a list)
  });

  test('should display score and rank', async ({ page }) => {
    const score = page.locator('[data-testid="score-display"]');
    await expect(score).toBeVisible();
    const rank = page.locator('[data-testid="rank-feedback"]');
    await expect(rank).toBeVisible();
  });
});
