import { db } from "@/db"

export async function POST(req: Request) {
  try {
    const { url, caption, classId } = await req.json();

    if (!url || !classId) {
      return new Response(JSON.stringify({ message: 'URL and classId are required.' }), { status: 400 });
    }

    const newPhoto = await db.photo.create({
      data: {
        url,
        caption,
        classId,
      },
    });

    return new Response(JSON.stringify(newPhoto), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const classId = searchParams.get('classId');
    const universityId = searchParams.get('universityId');

    if (!classId) {
      return new Response(JSON.stringify({ message: 'classId is required.' }), { status: 400 });
    }

    const photos = await db.photo.findMany({
      where: {
        classId,
      },
    });

    return new Response(JSON.stringify(photos), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: 'Internal server error.' }), { status: 500 });
  }
}
