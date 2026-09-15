import { expect, test } from "@playwright/test";

test("inicia la partida, usa el backend y valida un movimiento", async ({
  page,
  request,
}) => {
  const estado = await request.get("/api/estado");

  expect(estado.ok()).toBeTruthy();

  const datos = await estado.json();

  expect(datos.juego).toContain("Plushie Panic");

  await page.goto("/");

  await expect(
    page.getByText("PLUSHIE PANIC").first()
  ).toBeVisible();

  await page
    .getByRole("button", { name: "START GAME" })
    .click();

  await expect(
    page.getByText("0 / 90 MOVES")
  ).toBeVisible();

  await page.waitForTimeout(300);

  await page.keyboard.press("a");

  await expect(
    page.getByTestId("mensaje-juego")
  ).toContainText("No puedes salir");

  await page.keyboard.press("d");

  await expect(
    page.getByText("1 / 90 MOVES")
  ).toBeVisible();
});