# edreader

edreader (pronounce: Ed-Reader) is an unofficial frontend client for Edstem's Ed Discussion using the [edstem API wrapper in rust](https://github.com/laggycomputer/edstem)

## Features
- Fully functional features
    - View your profile picture and username
    - More coming soon!
- Planned features
    - Read-only access to all courses and course discussions
    - Better appearance (custom color schemes, etc.)

## Running the project
- Frontend
    - Create a `.env` file (`frontend/.env`) containing the following (see `frontend/.env.example` for an example):
        - The URL the server is running on
    - Run
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
- Backend
    - Create a `.env` file (`backend/.env`) containing the following (see `backend/.env.example` for an example):
        - Your API key (obtain one [here](https://edstem.org/us/settings/api-tokens))
        - The URL you want the server to run on
    - Run
    ```sh
    cd backend
    cargo run
    ```

## Technologies
- Frontend
    - Vite
    - React
    - Typescript
- Backend
    - Rust
    - axum
    - [laggycomputer/edstem](https://github.com/laggycomputer/edstem)
