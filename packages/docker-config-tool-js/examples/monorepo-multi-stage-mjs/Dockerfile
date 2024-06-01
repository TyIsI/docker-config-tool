FROM scratch AS workspace

COPY --link . /workspace

FROM node:lts-alpine AS base

RUN apk add --no-cache libc6-compat vips vips-cpp

CMD ["npm","start"]

FROM base AS image-build

USER 54321:54321

COPY --from=workspace --chown=runtime:runtime --link /workspace/services/image-engine /build
