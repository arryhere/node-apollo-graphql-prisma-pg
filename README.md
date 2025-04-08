# NODE APOLLO TYPEGRAPHQL PRISMA

---

# Setup

- `[ -f .env ] || cp .env.sample .env`
- `npm i`
- `docker compose -f ./compose.db.yaml --env-file ./.env up -d --build`
- `npm run start:dev`

---

# Prisma Commands

- `npx prisma init --datasource-provider postgresql --output ../generated/prisma`
- `npx prisma generate`
- `npx prisma migrate dev --name <migration_name>`

---
