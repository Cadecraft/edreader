# edreader

edreader (pronounce: Ed-Reader) is an unofficial frontend client for Edstem's Ed Discussion using the [edstem API wrapper in rust](https://github.com/laggycomputer/edstem)

## Features
- Fully functional features
    - Nothing yet!
- Planned features
    - **Read-only** access to all courses and course discussions

## Running the project
- Frontend
```sh
cd frontend
npm install
npm run dev
```
- Backend
    - Create an `.env` file (`backend/.env`) containing your API key (obtain one [here](https://edstem.org/us/settings/api-tokens))
    - Run
    ```sh
    cargo run
    ```

## Technologies
- Frontend
    - Vite
    - React
    - Typescript
- Rust backend
    - [laggycomputer/edstem](https://github.com/laggycomputer/edstem)
