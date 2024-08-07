"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { createUniversity, fetchUniversities } from '@/lib/utils';
import MaxWidthWrapper from './MaxWidthWrapper';

type University = {
  id: string;
  name: string;
};

export default function UniversitySelectionPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [newUniversity, setNewUniversity] = useState('');
  const [showNewUniversityInput, setShowNewUniversityInput] = useState(false);

  useEffect(() => {
    async function fetchUniversitiesEffect() {
      const data = await fetchUniversities();
      setUniversities(data);
    }
    fetchUniversitiesEffect();
  }, []);

  const handleUniversityChange = (value: string) => {
    if (value === "other") {
      setShowNewUniversityInput(true);
      setSelectedUniversity("");
    } else {
      setShowNewUniversityInput(false);
      setSelectedUniversity(value);
    }
  };

  const handleAddNewUniversity = async () => {
    try {
      const newUni = await createUniversity(newUniversity);
      setUniversities([...universities, newUni]);
      setSelectedUniversity(newUni.id);
      setNewUniversity("");
      setShowNewUniversityInput(false);
    } catch (error) {
      console.error(error);
      // Handle error (e.g., show a message to the user)
    }
  };

  const handleNewUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUniversity(e.target.value);
  };

  const handleViewPhotosClick = async () => {
    if (showNewUniversityInput) {
      await handleAddNewUniversity();
    }
    if (selectedUniversity || (!showNewUniversityInput && newUniversity)) {
      const universityId = showNewUniversityInput ? selectedUniversity : universities.find(u => u.name === newUniversity)?.name || '';
      window.location.href = `/gallery?universityId=${universityId}&year=${selectedYear}`;
    }
  };

  return (
    <MaxWidthWrapper>
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Select University and Class Year</h1>
        <div className="mb-4">
          <label className="block mb-2">University</label>
          <Select onValueChange={handleUniversityChange}>
            <SelectTrigger className="w-full px-4 py-2 border rounded">
              <SelectValue placeholder="Select University" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Universities</SelectLabel>
                {universities?.map((university) => (
                  <SelectItem key={university.id} value={university.id}>
                    {university.name}
                  </SelectItem>
                ))}
                <SelectItem value="other">Other...</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          {showNewUniversityInput && (
            <div className="mt-4">
              <label className="block mb-2">New University</label>
              <Input
                type="text"
                value={newUniversity}
                onChange={handleNewUniversityChange}
                className="w-full px-4 py-2 border rounded mb-2"
                placeholder="Enter new university name"
              />
            </div>
          )}
        </div>
        <div className="mb-4">
          <label className="block mb-2">Class Year</label>
          <Input
            type="number"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Enter class year"
          />
        </div>
        <Button
          onClick={handleViewPhotosClick}
          className={buttonVariants({ size: "lg", className: "mt-5" })}
        >
          {showNewUniversityInput ? "Add University" : "View Photos"}
        </Button>
      </div>
    </div>
    </MaxWidthWrapper>
  );
}
