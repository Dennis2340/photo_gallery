import { db } from "@/db"

export async function POST(req:Request) {
    try {
        const { name } = await req.json();

        // Check if the university already exists
        const existingUniversity = await db.university.findUnique({
        where: { name },
        });

        if (existingUniversity) {
            return new Response(JSON.stringify({message: "University already exists", university: existingUniversity }), { status: 409 })
        
        }

        // Create a new university
        const newUniversity = await db.university.create({
        data: { name },
        });

       return new Response(JSON.stringify({message: "University created successfully", university: newUniversity }), { status: 201 })
        
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify({message: ""}), {status: 500})
    }
}

export async function GET(req: Request) {
    try {
      const universities = await db.university.findMany();
       return new Response(JSON.stringify({universities}), {status: 200});
    } catch (error) {
      console.error(error);
      return new Response(JSON.stringify({message: "Internal Server Error"}), {status: 500})
    }
  }