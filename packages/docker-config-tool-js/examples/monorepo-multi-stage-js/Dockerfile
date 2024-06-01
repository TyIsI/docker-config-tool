FROM scratch AS workspace

COPY --link . /workspace

FROM node:lts-alpine AS base

RUN apk add --no-cache libc6-compat vips vips-cpp

CMD ["npm","start"]

FROM base AS app-build

WORKDIR /build

USER 54321:54321

COPY --from=workspace --chown=runtime:runtime --link /workspace/app/frontend /build

RUN pnpm run build

FROM nginx:stable AS app-prod

EXPOSE 3000/tcp

COPY --from=app-build --link /build/dist/ /usr/share/nginx/html/
