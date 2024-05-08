import { useLocation } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { Grid, Typography } from '@mui/material'
import { useProgramStore } from '../store/programStore'

export interface CourseImage {
  data: {
    attributes: {
      url: string
    }
  }
}
export interface Course {
  id: number
  attributes: {
    area_name: string
    topic: string
    learning_expection: string
    link_suggested: string
    spoc: string
    training_hrs: string
    createdAt: string
    updatedAt: string
    publishedAt: string
    course_image: CourseImage
  }
}

const Courses = () => {
  const location = useLocation()
  const { programs } = useProgramStore()

  const pathParts = location.pathname.split('/')

  console.log('pathParts', pathParts)
  const programName = pathParts[1].toLowerCase()
  const levelName = pathParts[3].toLowerCase()
  const capitalizedPathName =
    levelName.charAt(0).toUpperCase() + levelName.slice(1)

  console.log(programs)

  let courses
  for (const program of programs) {
    if (program.attributes.program_title.toLowerCase() === programName) {
      const level = program.attributes.levels.data.find(
        (level) => level.attributes.title.trim().toLowerCase() === levelName
      )
      console.log('level', level)
      if (level !== undefined) {
        courses = level.attributes.courses.data
        break
      }
    }
  }

  return (
    <Grid>
      <Grid
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        mt={6}
        mb={-6}
      >
        <Typography variant='h2' fontWeight={900} color={'#301038'}>
          {capitalizedPathName} Courses
        </Typography>
      </Grid>
      <Grid>
        {courses?.map((course, index) => (
          <Grid key={index} p={20}>
            <CourseCard
              title={course.attributes.area_name}
              description={course.attributes.learning_expection}
              link={course.attributes.link_suggested}
              spoc={course.attributes.spoc}
              hours={course.attributes.training_hrs}
              topic={course.attributes.topic}
              image={`${import.meta.env.VITE_APP_BASE_IMAGE}${
                course.attributes.course_image.data.attributes.url
              }`}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}

export default Courses
