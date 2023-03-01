import React from "react";
import { screen, waitFor } from "@testing-library/react";
import App from "../App";
import renderWithContext from "./helpers/renderWithContext";
import userEvent from "@testing-library/user-event";

describe("Testes Gerais da Aplicação", () => {
  it("Verifica se uma tabela com todos os Planetas é renderizada", async () => {
    renderWithContext(<App />);

    const planets = await waitFor(() => screen.getAllByTestId("planet-name"), {
      timeout: 5000,
    });
    expect(planets.length).toBe(10);
  });

  it("Verifica se os inputs dos Filtros são renderizados", () => {
    renderWithContext(<App />);

    const searchInput = screen.getByTestId("name-filter");
    expect(searchInput).toBeInTheDocument();

    const columnFilter = screen.getByTestId("column-filter");
    expect(columnFilter).toBeInTheDocument();
    const comparisonFilter = screen.getByTestId("comparison-filter");
    expect(comparisonFilter).toBeInTheDocument();
    const valueFilter = screen.getByTestId("value-filter");
    expect(valueFilter).toBeInTheDocument();
    const buttonFilter = screen.getByTestId("button-filter");
    expect(buttonFilter).toBeInTheDocument();

    const columnSort = screen.getByTestId("column-sort");
    expect(columnSort).toBeInTheDocument();
    const sortASC = screen.getByTestId("column-sort-input-asc");
    expect(sortASC).toBeInTheDocument();
    const sortDESC = screen.getByTestId("column-sort-input-desc");
    expect(sortDESC).toBeInTheDocument();
  });

  it("Verifica se ao realizar uma pesquisa o resultado é renderizado corretamente", async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const searchInput = screen.getByTestId("name-filter");
    userEvent.type(searchInput, "tat");
    const planets = screen.getAllByTestId("planet-name");
    expect(planets.length).toBe(1);
    expect(planets[0].innerHTML).toBe("Tatooine");
  });

  it('Testa filtro numérico "maior que"', async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "population");
    expect(columnFilter).toHaveValue("population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    expect(comparisonFilter).toHaveValue("maior que");
    userEvent.type(valueFilter, "100000");
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId("planet-name");
    const filters = screen.getAllByTestId("filter");
    expect(planets.length).toBe(7);
    expect(filters.length).toBe(1);
  });

  it('Testa filtro numérico "maior que"', async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "surface_water");
    expect(columnFilter).toHaveValue("surface_water");
    userEvent.selectOptions(comparisonFilter, "menor que");
    expect(comparisonFilter).toHaveValue("menor que");
    userEvent.type(valueFilter, "40");
    userEvent.click(buttonFilter);

    const planets2 = screen.getAllByTestId("planet-name");
    const filters2 = screen.getAllByTestId("filter");
    expect(planets2.length).toBe(6);
    expect(filters2.length).toBe(1);
  });

  it('Testa filtro numérico "igual a"', async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "diameter");
    expect(columnFilter).toHaveValue("diameter");
    userEvent.selectOptions(comparisonFilter, "igual a");
    expect(comparisonFilter).toHaveValue("igual a");
    userEvent.type(valueFilter, "10200");
    userEvent.click(buttonFilter);

    const planets3 = screen.getAllByTestId("planet-name");
    const filters3 = screen.getAllByTestId("filter");
    expect(planets3.length).toBe(1);
    expect(filters3.length).toBe(1);
  });

  it('testa se possível remover um filtro / todos os filtros', async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const columnFilter = screen.getByTestId("column-filter");
    const comparisonFilter = screen.getByTestId("comparison-filter");
    const valueFilter = screen.getByTestId("value-filter");
    const buttonFilter = screen.getByTestId("button-filter");

    userEvent.selectOptions(columnFilter, "population");
    expect(columnFilter).toHaveValue("population");
    userEvent.selectOptions(comparisonFilter, "maior que");
    expect(comparisonFilter).toHaveValue("maior que");
    userEvent.type(valueFilter, "100000");
    userEvent.click(buttonFilter);

    const planets = screen.getAllByTestId("planet-name");
    const filters = screen.getAllByTestId("filter");
    expect(planets.length).toBe(7);
    expect(filters.length).toBe(1);

    const removeFilter = screen.getByTestId("button-remove-filter");
    expect(removeFilter).toBeInTheDocument()
    userEvent.click(removeFilter)
    expect(removeFilter).not.toBeInTheDocument()

    userEvent.click(buttonFilter)
    userEvent.click(buttonFilter)
    userEvent.click(buttonFilter)
    userEvent.click(buttonFilter)
    userEvent.click(buttonFilter)
    const removeAllFilters = screen.getByTestId("button-remove-filters");
    userEvent.click(removeAllFilters)
  })

  it('Testa se os resultados são ordenados corretamente', async () => {
    renderWithContext(<App />);

    const table = await waitFor(() => screen.findByRole("table"), {
      timeout: 3000,
    });
    expect(table).toBeInTheDocument();

    const columnSort = screen.getByTestId("column-sort");
    const sortASC = screen.getByTestId("column-sort-input-asc");
    const sortDESC = screen.getByTestId("column-sort-input-desc");
    const buttonSort = screen.getByTestId("column-sort-button");

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(sortASC);
    userEvent.click(buttonSort);

    const planets = screen.getAllByTestId("planet-name");
    expect(planets[0].innerHTML).toBe('Endor')

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(sortDESC);
    userEvent.click(buttonSort);

    const planets2 = screen.getAllByTestId("planet-name");
    expect(planets2[0].innerHTML).toBe('Coruscant')
  })
});
