import { useEffect } from 'react'
import { Grid, Typography } from '@mui/material'
import ProgramsCard, { type Levels } from '../components/ProgramsCard'
import { useProgramStore } from '../store/programStore'
import { type Course } from './Courses'

export interface Level {
  id: number
  attributes: {
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    courses: {
      data: Course[]
    }
  }
}

interface ProgramAttributes {
  program_title: string
  program_description: string
  levels: {
    data: Level[]
  }
}

export interface Program {
  id: number
  attributes: ProgramAttributes
}

const Programs = () => {
  const { setPrograms, programs } = useProgramStore()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${
            import.meta.env.VITE_APP_BASE_URL
          }/programs?populate=levels.courses.course_image`
        )
        const data = await response.json()
        const updatedPrograms = data.data.map((program: Program) => {
          const updatedLevels = program.attributes.levels.data.map(
            (level: Level) => {
              const updatedCourses = level.attributes.courses.data.map(
                (course: Course) => ({
                  ...course,
                  course_image:
                    course.attributes.course_image.data.attributes.url
                })
              )
              return {
                ...level,
                attributes: {
                  ...level.attributes,
                  courses: { data: updatedCourses }
                }
              }
            }
          )
          return {
            ...program,
            attributes: {
              ...program.attributes,
              levels: { data: updatedLevels }
            }
          }
        })
        setPrograms(updatedPrograms)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchContent().catch((error) => {
      console.error('Error in useEffect:', error)
    })
  }, [])

  console.log('programs', programs)

  return (
    <Grid>
      <Grid display={'flex'} justifyContent={'center'} mt={10} mb={10}>
        <Grid>
          <Typography
            className='typing-effect'
            fontSize={50}
            fontWeight={900}
            sx={{ color: '#301038' }}
          >
            Choose one of our programs
          </Typography>
        </Grid>
      </Grid>
      <Grid
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'space-around'}
      >
        {programs?.map((program) => (
          <Grid key={program.id}>
            <ProgramsCard
              title={program?.attributes?.program_title}
              description={program?.attributes?.program_description}
              levels={program?.attributes?.levels as Levels}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Programs
