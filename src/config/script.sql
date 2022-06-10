CREATE TABLE users(
   "id" SERIAL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP DEFAULT NOW()
)

CREATE TABLE links(
    "id" SERIAL PRIMARY KEY,
    "userId" INTEGER REFERENCES "users"("id") NOT NULL,
    "url" TEXT NOT NULL,
    "code" TEXT UNIQUE NOT NULL,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP DEFAULT NOW()
)