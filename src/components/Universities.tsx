"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button, buttonVariants } from './ui/button';
import { Input } from './ui/input';
import { createUniversity, fetchUniversities, createClass, fetchClasses } from '@/lib/utils';
import MaxWidthWrapper from './MaxWidthWrapper';
import { Loader2 } from 'lucide-react';

type University = {
  id: string;
  name: string;
};

type Class = {
  id: string;
  year: string;
};

export default function UniversitySelectionPage() {
  const [universities, setUniversities] = useState<University[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [selectedUniversity, setSelectedUniversity] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [newUniversity, setNewUniversity] = useState('');
  const [newClass, setNewClass] = useState('');
  const [showNewUniversityInput, setShowNewUniversityInput] = useState(false);
  const [showNewClassInput, setShowNewClassInput] = useState(false);
  const [loadingUniversities, setLoadingUniversities] = useState(true);
  const [loadingClasses, setLoadingClasses] = useState(false);

  useEffect(() => {
    async function fetchUniversitiesEffect() {
        setLoadingUniversities(true);
        try {
          const data = await fetchUniversities();
          setUniversities(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoadingUniversities(false);
        }
      }
    fetchUniversitiesEffect();
  }, []);

  useEffect(() => {
    async function fetchClassesEffect() {
        if (selectedUniversity) {
          setLoadingClasses(true);
          try {
            const data = await fetchClasses(selectedUniversity);
            setClasses(data);
          } catch (error) {
            console.error(error);
          } finally {
            setLoadingClasses(false);
          }
        }
      }
    fetchClassesEffect();
  }, [selectedUniversity]);

  const handleUniversityChange = (value: string) => {
    if (value === "other") {
      setShowNewUniversityInput(true);
      setSelectedUniversity("");
      setClasses([]);
    } else {
      setShowNewUniversityInput(false);
      setSelectedUniversity(value);
    }
  };

  const handleClassChange = (value: string) => {
    if (value === "other") {
      setShowNewClassInput(true);
      setSelectedClass("");
    } else {
      setShowNewClassInput(false);
      setSelectedClass(value);
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

  console.log("this is the selected university", selectedUniversity, newClass)
  const handleAddNewClass = async () => {
    try {
      
      if(selectedUniversity && newClass){
        const newCls = await createClass(selectedUniversity, newClass);
        setClasses([...classes, newCls]);
        setSelectedClass(newCls.id);
        setNewClass("");
        setShowNewClassInput(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUniversity(e.target.value);
  };

  const handleNewClassChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewClass(e.target.value);
  };

  const handleViewPhotosClick = async () => {
    if (showNewUniversityInput) {
      await handleAddNewUniversity();
    }
    if (showNewClassInput) {
      await handleAddNewClass();
    }
    if (selectedUniversity || (!showNewUniversityInput && newUniversity)) {
      const universityId = selectedUniversity || universities.find(u => u.name === newUniversity)?.id || '';
      const classId = selectedClass || classes.find(c => c.year === newClass)?.id || '';
      window.location.href = `/gallery?universityId=${universityId}&classId=${classId}`;
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
                  {loadingUniversities ? (
                    <Loader2 className='ml-8 h-5 w-5 animate-spin'/>  
                  ) : (
                    universities.map((university) => (
                      <SelectItem key={university.id} value={university.id}>
                        {university.name}
                      </SelectItem>
                    ))
                  )}
                  
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
          {selectedUniversity && (
            <div className="mb-4">
              <label className="block mb-2">Class Year</label>
              <Select onValueChange={handleClassChange}>
                <SelectTrigger className="w-full px-4 py-2 border rounded">
                  <SelectValue placeholder="Select Class Year" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Classes</SelectLabel>
                    {loadingClasses ? (
                         <Loader2 className='ml-8 h-5 w-5 animate-spin'/>
                    ) : (
                      classes.map((cls) => (
                        <SelectItem key={cls.id} value={cls.id}>
                          {cls.year}
                        </SelectItem>
                      ))
                    )}
                    <SelectItem value="other">Other...</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              {showNewClassInput && (
                <div className="mt-4">
                  <label className="block mb-2">New Class Year</label>
                  <Input
                    type="text"
                    value={newClass}
                    onChange={handleNewClassChange}
                    className="w-full px-4 py-2 border rounded mb-2"
                    placeholder="Enter new class year"
                  />
                </div>
              )}
            </div>
          )}
          <Button
            onClick={handleViewPhotosClick}
            className={buttonVariants({ size: "lg", className: "mt-5" })}
          >
            {showNewClassInput ? "Add Class" : "View Photos"}
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
