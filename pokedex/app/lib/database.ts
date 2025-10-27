import fs from "fs/promises";
import path from "path";

const DB_PATH = path.join(process.cwd(), "database.json");

export interface FavoritePokemon {
  id: number;
}

class Database {
  private async readDB(): Promise<FavoritePokemon[]> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async writeDB(data: FavoritePokemon[]): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));
  }

  async getAll(): Promise<FavoritePokemon[]> {
    return await this.readDB();
  }

  async add(id: number): Promise<FavoritePokemon> {
    const data = await this.readDB();

    // Evitar duplicados
    if (data.find((p) => p.id === id)) {
      throw new Error("El Pokémon ya está en favoritos");
    }

    const newPokemon: FavoritePokemon = {
      id,
    };

    data.push(newPokemon);
    await this.writeDB(data);
    return newPokemon;
  }

  async delete(id: number): Promise<boolean> {
    const data = await this.readDB();
    const filtered = data.filter((p) => p.id !== id);

    if (filtered.length === data.length) return false;

    await this.writeDB(filtered);
    return true;
  }
}

export const db = new Database();
