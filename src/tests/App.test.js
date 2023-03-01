import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithContext from "./helpers/renderWithContext";

describe("Requisito 01", () => {
  it("Verifica se uma tabela com todos os Planetas é renderizada", async () => {
    renderWithContext(<App />);

    const planets = await waitFor(() => screen.getAllByTestId('planet-name'), {
      timeout: 2000,
    });
    expect(planets.length).toBe(10);
  });
});
