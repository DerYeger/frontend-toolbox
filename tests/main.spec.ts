import { test, expect } from '@playwright/test';

test('can fetch a user', async ({ page }) => {
  await page.goto('/');

  await page.locator('input').fill('DerYeger')
  await page.locator('button').click()

  const details = page.locator('pre')
  await expect(details).toBeVisible()

  expect(await details.textContent()).toContain('"company": "@senacor"')
});

test('shows an error for unknown users', async ({ page }) => {
  await page.goto('/');

  await page.locator('input').fill('ThisUserCertainlyDoesNotExists1234')
  await page.locator('button').click()

  const toast = page.locator('[data-sonner-toast]>>nth=1')
  await expect(toast).toBeVisible()

  expect(await toast.textContent()).toContain('Unable to load user')
});
