import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@magamerx/medium-common";



export const userRoute=new Hono<{
    Bindings:{
        DATABASE_URL:string,
        JWT_SECRET:string
    }
}>();

userRoute.post("/signup",async (c)=>{
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
  
    const body=await c.req.json();
    const { success } = signupInput.safeParse(body);

    if(!success){
      c.status(411);
      return c.json({
        msg:"Inputs not correct"
      })
    }
  
    const user = await prisma.user.create({
      data:{
        email:body.username,
        password:body.password,
        name:body.name
      }
    });
  
    //@ts-ignore
    const token = await sign({id:user.id},c.env.JWT_SECRET);
  
    return c.json({
      jwt:token
    })
  })
  
  
  userRoute.post("/signin", async (c) => {
      const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const { success } = signinInput.safeParse(body);
  
      if(!success){
        c.status(411);
        return c.json({
          msg:"Inputs not correct"
        })
      }
      
      try{
      const user = await prisma.user.findUnique({
        where: {
          email: body.username,
          password:body.password
        }
      });
    
      if (!user) {
        c.status(403);
        return c.json({ error: "user not found" });
      }
    
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    }
    catch(e){
      console.log(e);
      c.status(411);
      return c.json({msg:"Invalid"});
    }
  })
  