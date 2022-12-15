FROM denoland/deno as build

WORKDIR /build

COPY . .

RUN deno compile --allow-read --allow-env --allow-net --output mailer ./index.ts


FROM ubi8/ubi

COPY  --from=build /build/mailer /usr/local/bin

CMD ["/usr/local/bin/mailer"]

EXPOSE 8080

