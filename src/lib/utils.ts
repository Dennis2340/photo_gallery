import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const createUniversity = async (name: string) => {
  const response = await fetch('/api/universities', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });
  const data = await response.json();
  if (response.status === 201) {
    // Successfully created
    return data.university;
  } else {
    throw new Error(data.message);
  }
};

export const fetchUniversities = async () => {
  const response = await fetch('/api/universities');
  const data = await response.json();
  return data.universities;
};

// Fetch class by universityId and year
export async function fetchClassByYearAndUniversity(universityId: string, year: number) {
  const res = await fetch(`/api/class?universityId=${universityId}&year=${year}`);
  if (res.ok) {
    return await res.json();
  }
  return null;
}
export async function fetchClasses(universityId: string) {
  const res = await fetch(`/api/class?universityId=${universityId}`);
  if (res.ok) {
    return await res.json();
  }
  return null;
}

// Create a new class entry
export async function createClass(universityId: string, year: string) {
  console.log(universityId, year)
  const res = await fetch('/api/class', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ universityId, year }),
  });

  if (res.ok) {
    return await res.json();
  }
  throw new Error('Failed to create class');
}
