import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import '@aws-amplify/ui-react/styles.css';
import { Authenticator, ThemeProvider } from '@aws-amplify/ui-react';
import { theme } from '@/themes/amplifytheme';
import "../styles/loginpage.css";
import { Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';


const MotionBox = motion(Box);

export default function LoginPage() {
  const user = useAppSelector((state) => state.user);
  const [isInteracting, setIsInteracting] = useState(false);

  if (user.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleInteractionStart = () => setIsInteracting(true);
  const handleInteractionEnd = () => setIsInteracting(false);

  return (
    <>
      <div className="login-page">
      <div className="login-overlay"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
      <div className="animated-object"></div>
        <div className="login-container">
          <h1 className="login-heading"><b>Dopamine Lite</b></h1>
          <p className='login-subtext'>Your journey to mastering biology starts here</p>
            <MotionBox
              as="div"
              animate={
                !isInteracting
                  ? { y: [0, -12, 0] } 
                  : { y: 0 } 
              }
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: !isInteracting ? Infinity : 0, 
                repeatType: "loop",
              }}
              onMouseEnter={handleInteractionStart}
              onTouchStart={handleInteractionStart}
              onMouseLeave={handleInteractionEnd}
              onTouchEnd={handleInteractionEnd}
              onChange={handleInteractionStart}
            >
              <div className="auth-container">
              <ThemeProvider theme={theme}>
                <Authenticator.Provider>
                  <Authenticator socialProviders={['google']} />
                </Authenticator.Provider>
              </ThemeProvider>
            </div>
            </MotionBox>
        </div>
      </div>
    </>
  );
}
