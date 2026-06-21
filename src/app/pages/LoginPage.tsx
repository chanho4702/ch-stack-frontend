import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import AppTheme from '../../context/templates/shared-theme/AppTheme';
import ColorModeSelect from '../../context/templates/shared-theme/ColorModeSelect';
import {
  GoogleIcon,
  SitemarkIcon,
} from '../../context/templates/sign-in/components/CustomIcons';
import { useAuth } from '../auth/AuthContext';
import { googleLoginUrl } from '../../lib/api';

// 참고 자료인 SignIn 템플릿(src/context/templates/sign-in)을 활용해 만든
// "내 서비스" 의 실제 로그인 페이지. 제출하면 인증 후 /app 대시보드로 이동합니다.

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const LoginContainer = styled(Stack)(({ theme }) => ({
  height: '100dvh',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function LoginPage(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { loginWithPassword } = useAuth();
  const [submitError, setSubmitError] = React.useState('');

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');

  const validate = (email: string, password: string) => {
    let ok = true;
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      setEmailErrorMessage('올바른 이메일을 입력하세요.');
      ok = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
    if (!password || password.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('비밀번호는 6자 이상이어야 합니다.');
      ok = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    return ok;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    if (!validate(email, password)) {
      return;
    }
    setSubmitError('');
    try {
      await loginWithPassword(email, password);
      navigate('/app', { replace: true });
    } catch {
      setSubmitError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <LoginContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            로그인
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="email">이메일</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">비밀번호</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="로그인 상태 유지"
            />
            {submitError && (
              <Typography color="error" sx={{ fontSize: 14 }}>
                {submitError}
              </Typography>
            )}
            <Button type="submit" fullWidth variant="contained">
              로그인
            </Button>
          </Box>
          <Divider>또는</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => {
                window.location.href = googleLoginUrl();
              }}
              startIcon={<GoogleIcon />}
            >
              Google 계정으로 로그인
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              계정이 없으신가요?{' '}
              <Link href="/sign-up" variant="body2">
                회원가입
              </Link>
            </Typography>
          </Box>
        </Card>
      </LoginContainer>
    </AppTheme>
  );
}
