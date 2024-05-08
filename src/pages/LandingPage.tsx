import { useState, useEffect } from 'react'
import {
  Grid,
  Typography,
  Paper,
  TextField,
  Box,
  Button,
  LinearProgress
} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import relax from '../assets/study2.svg'
import { useNavigate } from 'react-router-dom'

interface Attributes {
  title: string
  subtitle: string
  description: string
  icon_typography: string
  createdAt: string
  updatedAt: string
  publishedAt: string
}

interface DataItem {
  id: number
  attributes: Attributes
}

interface ApiResponse {
  data: DataItem[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

const LandingPage = () => {
  const [content, setContent] = useState<ApiResponse | null>(null)
  const navigate = useNavigate()
  const { loginWithRedirect, isAuthenticated, user, isLoading } = useAuth0()

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_APP_BASE_URL}/landing-pages`
        )
        const data = await response.json()
        setContent(data)
      } catch (error) {
        console.error('Error:', error)
      }
    }
    fetchContent().catch((error) => {
      console.error('Error in useEffect:', error)
    })
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('userProfile', JSON.stringify(user))
      navigate('/programs')
    }
  }, [isAuthenticated, navigate])

  if (isLoading) {
    return (
      <Box
        display='flex'
        justifyContent='center'
        alignItems='center'
        minHeight='100vh'
        flexDirection={'column'}
      >
        <Typography
          variant='h2'
          color={'#301038'}
          textAlign={'center'}
          fontWeight={900}
        >
          BagdeUp!
        </Typography>
        <LinearProgress />
      </Box>
    )
  }

  return (
    <Grid
      display={'flex'}
      width={'100%'}
      height={'100dvh'}
      position={'relative'}
    >
      <Grid
        flex={1}
        sx={{ background: 'linear-gradient(to bottom, #A786B1, #573661)' }}
        display={'flex'}
        flexDirection={'column'}
      >
        <Grid mt={5} p={'0 150px'} zIndex={1}>
          <Grid
            bgcolor={'rgba(255, 255, 255)'}
            p={4}
            borderRadius={'20px'}
            mt={7}
          >
            <Typography
              variant='h1'
              fontSize={'56px'}
              color={'#301038'}
              fontWeight={900}
              textAlign={'center'}
            >
              {content?.data[0]?.attributes?.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          display={'flex'}
          justifyContent={'center'}
          alignItems={'center'}
          mt={10}
        >
          <Box
            component={'img'}
            src={relax}
            position={'absolute'}
            width={900}
            sx={{
              opacity: 0.4
            }}
          />
        </Grid>
        <Grid mt={25} p={'0 80px'} gap={2} zIndex={1}>
          <Grid
            boxShadow='3px 3px 6px #00000029'
            bgcolor={'#1E0624'}
            display={'flex'}
            flexDirection={'column'}
            borderRadius={'20px'}
            p={6}
            gap={2}
          >
            <Typography
              variant='body1'
              color={'white'}
              textAlign={'center'}
              fontWeight={900}
              fontSize={'20px'}
            >
              {content?.data[0]?.attributes?.subtitle}
            </Typography>
            <Typography
              variant='body2'
              color={'white'}
              fontWeight={700}
              fontSize={'18px'}
            >
              {content?.data[0]?.attributes?.description}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        flex={1}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Grid>
          <Grid mb={6}>
            <Typography
              variant='h2'
              color={'#301038'}
              textAlign={'center'}
              fontWeight={900}
            >
              {content?.data[0]?.attributes?.icon_typography}
            </Typography>
          </Grid>
          <Paper elevation={24} square={false} sx={{ borderRadius: '20px' }}>
            <Grid p={5} display={'flex'} flexDirection={'column'} gap={2}>
              <Grid display={'flex'} flexDirection={'column'} gap={1}>
                <Typography
                  fontWeight={900}
                  fontSize={'14px'}
                  color={'#301038'}
                >
                  Username
                </Typography>
                <TextField
                  size='small'
                  placeholder='example@example.com'
                  disabled
                />
              </Grid>
              <Grid display={'flex'} flexDirection={'column'} gap={1}>
                <Typography
                  fontWeight={900}
                  fontSize={'14px'}
                  color={'#301038'}
                >
                  Password
                </Typography>

                <TextField
                  size='small'
                  placeholder='Password'
                  type='password'
                  disabled
                />
              </Grid>
              <Button
                variant='contained'
                onClick={() => {
                  void loginWithRedirect()
                }}
                disabled
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
                Login
              </Button>
              <Button
                variant='contained'
                onClick={() => {
                  void loginWithRedirect()
                }}
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
                SSO
              </Button>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LandingPage
