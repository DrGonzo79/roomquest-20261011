import {expect, test} from "@playwright/test";

test("builds a QA-ready personalized gift brief", async ({page}) => {
  await page.goto("/");
  await page.getByLabel("Recipient name").fill("Jordan");
  await page.getByRole("button", {name: /Pet rescue run/}).click();
  await page.getByRole("button", {name: "Generate gift brief"}).click();
  await expect(page.getByRole("heading", {name: /Jordan’s Pet rescue run/})).toBeVisible();
  await expect(page.getByText("QA ready", {exact: true})).toBeVisible();
  const qa = page.getByText("Faces and private screens are obscured");
  await qa.click();
  await expect(page.getByText("1/3 checked")).toBeVisible();
});

test("surfaces invalid recipient and photo reshoot state", async ({page}) => {
  await page.goto("/");
  await page.getByLabel("Recipient name").fill("A");
  await page.getByRole("button", {name: "Generate gift brief"}).click();
  await expect(page.locator("p.error")).toContainText("between 2 and 30");
  await page.getByLabel("Recipient name").fill("Sam");
  await page.getByRole("button", {name: /Night apartment/}).click();
  await page.getByRole("button", {name: "Generate gift brief"}).click();
  await expect(page.getByText("Needs reshoot", {exact: true})).toBeVisible();
  await expect(page.getByText(/Add more wide-angle/)).toBeVisible();
});

test("mobile layout does not overflow", async ({page}, testInfo) => {
  test.skip(testInfo.project.name !== "mobile");
  await page.goto("/");
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
  expect(overflow).toBeFalsy();
});
