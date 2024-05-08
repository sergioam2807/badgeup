import { Button, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export interface LevelData {
  id: number
  attributes: {
    title: string
    description: string
    createdAt: string
    updatedAt: string
    publishedAt: string
  }
}

export interface Levels {
  data: LevelData[]
}

interface ProgramsCardProps {
  title: string
  created?: string
  date?: string
  description: string
  levels?: Levels
}

const ProgramsCard = ({
  title,
  created = 'Sergio Alvarez',
  date = new Date().toLocaleDateString(undefined, {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  }),
  description,
  levels
}: ProgramsCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Grid
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'space-between'}
      sx={{ border: '1px solid #301038' }}
      width={'400px'}
      height={'450px'}
      borderRadius={'10px'}
      p={'20px 30px'}
      onMouseEnter={() => {
        setIsHovered(true)
      }}
      onMouseLeave={() => {
        setIsHovered(false)
      }}
    >
      <Grid>
        <Typography fontWeight={700} fontSize={30} sx={{ color: '#301038' }}>
          {title}
        </Typography>
        <Typography fontWeight={500} fontSize={10} sx={{ color: '#301038' }}>
          {created} {date}
        </Typography>
        <Grid mt={2} mb={2}>
          <Typography fontWeight={600} fontSize={15} sx={{ color: '#301038' }}>
            {description}
          </Typography>
        </Grid>
      </Grid>
      {isHovered &&
      levels?.data !== null &&
      levels?.data !== undefined &&
      levels?.data?.length > 0 ? (
        <Grid>
          <Grid display={'flex'} justifyContent={'center'}>
            <Typography
              fontWeight={800}
              fontSize={20}
              sx={{ color: '#301038' }}
            >
              Levels
            </Typography>
          </Grid>
          <Grid display={'flex'} justifyContent={'center'} gap={2} mt={2}>
            {levels?.data?.map((level, index) => (
              <Link
                to={`/${title.toLowerCase()}/courses/${level?.attributes?.title.toLowerCase()}`}
                key={index}
              >
                <Button
                  key={index}
                  variant='contained'
                  sx={{
                    backgroundColor: '#301038',
                    fontWeight: '700',
                    '&:hover': {
                      backgroundColor: '#A786B1',
                      color: '#301038',
                      fontWeight: '700'
                    }
                  }}
                >
                  {level.attributes.title}
                </Button>
              </Link>
            ))}
          </Grid>
        </Grid>
      ) : (
        <Grid display={'flex'} justifyContent={'center'}>
          <Button
            sx={{
              color: '#E0044E',
              border: '2px solid #E0044E',
              fontWeight: '700'
            }}
            variant='outlined'
          >
            Explore Levels
          </Button>
        </Grid>
      )}
    </Grid>
  )
}

export default ProgramsCard
