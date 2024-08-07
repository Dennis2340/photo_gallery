import { db } from "@/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('universityId');
 
  if (!universityId) {
    return new Response(JSON.stringify({ message: 'universityId and year are required.' }), { status: 400 });
  }

  try {
    const classEntry = await db.class.findMany({
      where: {
        universityId,
      },
    });

    return new Response(JSON.stringify(classEntry), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { universityId, year } = await req.json();

    if (!universityId || !year) {
      return new Response(JSON.stringify({ message: 'universityId and year are required.' }), { status: 400 });
    }

    const newClass = await db.class.create({
      data: {
        universityId,
        year,
      },
    });

    return new Response(JSON.stringify(newClass), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
