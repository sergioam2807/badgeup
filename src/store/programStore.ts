import { create } from 'zustand'
import { type Level, type Program } from '../pages/Programs'
import { type Course } from '../pages/Courses'

interface ProgramProps {
  programs: Program[]
  levels: Level[]
  courses: Course[]
  setPrograms: (programs: Program[]) => void
  setLevels: (levels: Level[]) => void
  setCourses: (courses: Course[]) => void
}

export const useProgramStore = create<ProgramProps>((set) => ({
  programs: [],
  levels: [],
  courses: [],
  setPrograms: (programs) => {
    set({ programs })
  },
  setLevels: (levels) => {
    set({ levels })
  },
  setCourses: (courses) => {
    set({ courses })
  }
}))
