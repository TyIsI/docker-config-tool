FROM node:20-slim AS stage-71e4d4e5

ENV PNPM_HOME="/pnpm"

ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable

FROM stage-71e4d4e5 AS stage-f85cc7a1

COPY . /usr/src/app

WORKDIR /usr/src/app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile

RUN pnpm run -r build

RUN pnpm deploy --filter=app1 --prod /prod/app1

RUN pnpm deploy --filter=app2 --prod /prod/app2

FROM stage-71e4d4e5 AS app1

COPY --from=stage-f85cc7a1 /prod/app1 /prod/app1

WORKDIR /prod/app1

EXPOSE 8000/tcp

CMD ["pnpm","start"]

FROM stage-71e4d4e5 AS app2

COPY --from=stage-f85cc7a1 /prod/app2 /prod/app2

WORKDIR /prod/app2

EXPOSE 8001/tcp

CMD ["pnpm","start"]
