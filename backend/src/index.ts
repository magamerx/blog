import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { jwt, sign, verify } from 'hono/jwt'
import { use } from 'hono/jsx'
import { jwk } from 'hono/jwk'
import { userRoute } from './routes/user'
import { blogRoute } from './routes/blog'
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings:{
    DATABASE_URL:string,
    JWT_SECRET:string
  }
}>()

app.use("/*",cors());

app.route("/api/v1/user",userRoute);
app.route("/api/v1/blog",blogRoute);


export default app
