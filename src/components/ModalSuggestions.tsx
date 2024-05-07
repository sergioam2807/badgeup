import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useAuth0 } from '@auth0/auth0-react'
import { Avatar, Button, Grid, TextField } from '@mui/material'
import { createManagementClient } from '@kontent-ai/management-sdk'
import { type ChangeEvent, useState } from 'react'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '20px',
  boxShadow: 24,
  p: 4
}

interface ModalSuggestionsProps {
  open: boolean
  handleClose: () => void
}

const clientMangement = createManagementClient({
  environmentId: import.meta.env.VITE_APP_KONTENT_PROJECT_ID,
  apiKey: import.meta.env.VITE_APP_KONTENT_API_KEY
})

export default function ModalSuggestions({
  open,
  handleClose
}: ModalSuggestionsProps) {
  const { user } = useAuth0()
  const [suggestion, setSuggestion] = useState('')

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setSuggestion(event.target.value)
  }

  // const userProfileString: string | null = localStorage.getItem('userProfile')
  // let userProfile: UserProfile | null = null
  // if (userProfileString !== null && userProfileString !== '') {
  //   userProfile = JSON.parse(userProfileString)
  // }

  const sendData = () => {
    clientMangement
      .addContentItem()
      .withData({
        name: `Suggestion from ${user?.name}`,
        type: {
          codename: 'suggestions'
        }
      })
      .toPromise()
      .then(async (response) => {
        await clientMangement
          .upsertLanguageVariant()
          .byItemId(response.data.id)
          .byLanguageCodename('default')
          .withData((builder) => {
            return {
              elements: [
                builder.textElement({
                  element: {
                    codename: 'user_name'
                  },
                  value: `${user?.name}`
                }),
                builder.textElement({
                  element: {
                    codename: 'suggestion_description'
                  },
                  value: suggestion
                })
              ]
            }
          })
          .toPromise()
          .then(async (response) => {
            const itemId = response?.data?.item?.id

            if (typeof itemId === 'string') {
              return await clientMangement
                .publishLanguageVariant()
                .byItemId(itemId)
                .byLanguageCodename('default')
                .withoutData()
                .toPromise()
            } else {
              throw new Error('Item ID is undefined')
            }
          })
      })
      .then((response) => {
        console.log('Workflow changed:', response)
      })
      .catch((error) => {
        console.error(error)
      })
    handleClose()
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <Box sx={style}>
        <Grid display={'flex'} alignItems={'center'} gap={2} mb={2}>
          <Avatar sx={{ bgcolor: '#301038' }} src={user?.picture} />
          <Grid display={'flex'} justifyContent={'center'}>
            <Typography id='modal-modal-title' variant='h6' fontWeight={700}>
              {user?.name}
            </Typography>
          </Grid>
        </Grid>
        <Grid display={'flex'} justifyContent={'center'}>
          <TextField
            onChange={handleChange}
            id='outlined-multiline-static'
            label='Suggestion'
            multiline
            rows={4}
            defaultValue=''
            variant='outlined'
            sx={{ mt: 2, bgcolor: 'rgba(0, 0, 0, 0.05)', color: '#301038' }}
            fullWidth
          />
        </Grid>
        <Grid display={'flex'} justifyContent={'space-between'} mt={2}>
          <Button
            variant='contained'
            onClick={handleClose}
            sx={{
              bgcolor: '#573661',
              fontWeight: 700,
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: '#41254D'
              }
            }}
          >
            Cancel
          </Button>

          <Button
            variant='contained'
            onClick={sendData}
            sx={{
              bgcolor: '#301038',
              fontWeight: 700,
              textTransform: 'capitalize',
              '&:hover': {
                backgroundColor: '#573661'
              }
            }}
          >
            Send
          </Button>
        </Grid>
      </Box>
    </Modal>
  )
}
