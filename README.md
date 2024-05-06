# docker-config-tool-js

Dockerfile as Code

## Motivation & Goals

For a project, I was struggling with integrating `pnpm` in a monorepo setting that incorporated multi-stage builds to enhance caching. Due to the nature of `pnpm` and its shared caching and global lockfile, I was forced to rethink the entire setup.

While a simple solution, templated Dockerfiles simply did not make sense and would not promote DRY principles.

I started this project to create an easy way and lightweight solution to create Dockerfiles through code in a way that would promote re-use of existing stages.

Initially starting as a Typescript project, one of the longterm goals is to implement the API in other languages, like Python.

### Notes

As I had wanted to get more `jest` experience and more specifically on how to design, architect and implement extensive unit testing, I decided to over-engineer unit testing as a means to get a more intuitive understanding of how testing frameworks (like `jest`) behave.
This project also led me to the opportunity to play around with `zod` and use that for input validation.

### Alternatives

Dagger.io was evaluated but due to its integration with the Dagger Engine felt like it had too much overhead for this project's intended purposes. DCT implements a similar naming convention for incorporating instructions into stages.

## Usage

See the docker-config-tool-js package documentation.

### Conventions

Docker file "commands" are referred to as Instructions.

To prevent confusion and possible overlap with the `ARG` instruction, method and function arguments are referred to as parameters. Abbreviated to params or param for singular instances. Expanded (spread) parameters will always be named as plural.

#### Docker Instructions Naming

| Scope      | Convention                                                        | Example         |
| ---------- | ----------------------------------------------------------------- | --------------- |
| Methods    | Methods are camel case with Pascal Case for the instruction names | `withWorkDir`   |
| Parameters | Full lower case                                                   | `workdirParams` |
