import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import { Link } from 'react-router-dom'
export const LandingCard = ({ image, title, link }) => {
  return (
    <Link to={link} style={{ textDecoration: 'none' }}>
      <Card
        sx={{
          maxWidth: '100%',
          borderRadius: '4px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'pointer',

          height: 400,
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            '& .card-bottom': {
              opacity: 0.7,
              transform: 'translateY(0)',
            },
          },
        }}
      >
        <CardMedia
          component="img"
          height="100%"
          image={image}
          alt={title || 'Card image'}
          sx={{
            objectFit: 'cover',
            backgroundColor: image ? 'transparent' : '#f5f5f5',
            height: '100%',
            width: '100%',
          }}
        />
        {title && (
          <CardContent
            className="card-bottom"
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              background: 'rgba(255,255,255,0.95)', // semi-transparent overlay
              padding: '16px',
              borderTop: '1px solid rgba(0,0,0,0.08)',
              opacity: 0,
              transform: 'translateY(100%)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
          >
            <Typography
              variant="h5"
              component="div"
              sx={{
                fontWeight: 700,
                fontSize: '1.5rem',
                lineHeight: 1,
                color: '#333',
                textAlign: 'center',
              }}
            >
              {title}
            </Typography>
          </CardContent>
        )}
      </Card>
    </Link>
  )
}
