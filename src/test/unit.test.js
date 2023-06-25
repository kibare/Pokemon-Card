import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import PokemonList from "../page/PokemonList";
import { getPokemonList } from "../fetcher/getPokemonList";

jest.mock("../fetcher/getPokemonList");

describe("PokemonList", () => {
    test("should render PokemonList", async () => {
        const mockData = [
        {
            name: "bulbasaur",
            url: "https://pokeapi.co/api/v2/pokemon/1/",
        },
        {
            name: "ivysaur",
            url: "https://pokeapi.co/api/v2/pokemon/2/",
        },
        ];
    
        getPokemonList.mockResolvedValueOnce(mockData);
    
        render(
        <BrowserRouter>
            <PokemonList />
        </BrowserRouter>
        );
    
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    
        const pokemonList = await screen.findAllByTestId("pokemon-list");
        expect(pokemonList).toHaveLength(2);
    });
    }
    );
    

