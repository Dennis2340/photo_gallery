import { db } from "@/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const universityId = searchParams.get('universityId');
  const year = parseInt(searchParams.get('year') || '', 10);

  if (!universityId || isNaN(year)) {
    return new Response(JSON.stringify({ message: 'universityId and year are required.' }), { status: 400 });
  }

  try {
    const classEntry = await db.class.findFirst({
      where: {
        universityId,
        year,
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

    // Check if class already exists
    const existingClass = await db.class.findFirst({
        where: {
          universityId,
          year,
        },
    });

    if (existingClass) {
     return new Response(JSON.stringify(existingClass), { status: 200 });
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
