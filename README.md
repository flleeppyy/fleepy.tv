# fleepy.tv

This is my website that I work on every now and then.

## Running

1. Clone this repo
2. run `pnpm install -r`
3. run `pnpm i -g nodemon` because pnpm is stupid and doesnt like to inherit from parent node_modules
4. run `pnpm frontend_fancy:build:prod` (this is for /fancy)
5. run `pnpm run webserver:build` if running for prod
6. run `pnpm run webserver:start` or `pnpm run webserver:dev`
7. <https://localhost:8001> or <https://localhost:8080>

## License

This project is licensed under the terms of the [MIT license](LICENSE).
