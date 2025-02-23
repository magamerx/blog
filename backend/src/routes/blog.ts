import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { use } from "hono/jsx";
import { decode, verify } from "hono/jwt";
import { createBlogInput, CreateBlogInput, updateBlogInput } from "@magamerx/medium-common";

export const blogRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables:{
        userId:string
    }
}>();

blogRoute.use("/*",async (c,next)=>{
    const authHeader=c.req.header("Authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);

    if(user){
        c.set("userId",user.id);
        await next();
    }
})

blogRoute.post("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
          msg:"Inputs not correct"
        })
      }

    const userId=c.get("userId");

    const blog = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId:userId
            }
    })

    return c.json({
        id: blog.id
    });
})

blogRoute.put("/", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updateBlogInput.safeParse(body);

    if(!success){
        c.status(411);
        return c.json({
          msg:"Inputs not correct"
        })
      }
      

    console.log(body.id);
    
    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
      }
    })

    return c.json({
        id: blog.id
    });
})

//pagination
blogRoute.get("/bulk",async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogs = await prisma.post.findMany({
        select:{
            title:true,
            content:true,
            id:true,
            author:{
                select:{
                    name:true
                }
            }
        }
    });

    return c.json({
        blogs
    })
})

blogRoute.get("/:id", async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL,
    }).$extends(withAccelerate());
    try {
        const id=c.req.param("id");

        const blog = await prisma.post.findFirst({
            where: {
                id:id
            },
            select:{
                id:true,
                title:true,
                content:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }
        });

        return c.json({
            blog
        });
    }
    catch (e) {
        console.log(e);
        
        c.status(411);
        return c.json({
            msg: "Error while fetching blog"
        })
    }

})

