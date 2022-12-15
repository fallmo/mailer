# SMTP Mailer Microservice (made with Deno)

Run with smtp environment variables and use to send mails

## Running

```
deno run --allow-env  --allow-net --allow-read "$(pwd)/index.ts"
```

or

```
docker run -it -p 8080:8080 quay.io/mohamedf0/mailer
```

## Example Usage

```
curl -X POST http://localhost:8080/send-mail \
    -h 'Content-Type: application/json' \
    # if required -h 'Authorization: Bearer <app-token>'
    -d '{"to": "example@domain.com", "subject": "subject", "content": "text content", "html": "<p>html content</p>"}'
```

## Environment Variables

| key                   | description                                         | example                |
| --------------------- | --------------------------------------------------- | ---------------------- |
| SMTP_HOST             | smtp mail host                                      | smtp.google.com        |
| SMTP_USERNAME         | smtp username                                       | username@gmail.com     |
| SMTP_PASSWORD         | smtp password                                       | xjsjdsjdj              |
| SMTP_PORT             | smtp port                                           | 465                    |
| SMTP_TLS              | smtp use tls                                        | true                   |
| SMTP_NAME             | value to use in mail 'from' attribute               | john doe               |
| AUTHORIZED_APP_TOKENS | bearer tokens to accept requests from (empty = all) | abcd,efgz,secretsecret |
