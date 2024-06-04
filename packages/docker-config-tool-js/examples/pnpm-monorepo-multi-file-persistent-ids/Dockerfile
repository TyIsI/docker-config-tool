FROM node:20-slim AS stage-80ad2e40

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM stage-80ad2e40 AS stage-2c276bb5

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=app1 --prod /prod/app1

RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM stage-80ad2e40 AS app1

COPY --from=stage-2c276bb5 /prod/app1 /prod/app1

WORKDIR /prod/app1

EXPOSE 8000/tcp

CMD ["pnpm","start"]

FROM stage-80ad2e40 AS app2

COPY --from=stage-2c276bb5 /prod/app2 /prod/app2

WORKDIR /prod/app2

EXPOSE 8001/tcp

CMD ["pnpm","start"]
