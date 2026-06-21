import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
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
import { useAuth, googleLoginUrl, SignupError } from '../../auth';
import { useNotify } from '../../notifications';

// "내 서비스" 의 실제 회원가입 페이지. 백엔드 POST /api/auth/signup 에 연동되며,
// 가입 성공 시 자동 로그인 후 /app 대시보드로 이동한다.
// (참고용 MUI 원본 SignUp 템플릿은 /sign-up 에 그대로 남아 있다.)

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

const SignUpContainer = styled(Stack)(({ theme }) => ({
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

export default function SignUpPage(props: { disableCustomTheme?: boolean }) {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const notify = useNotify();
  const [submitting, setSubmitting] = React.useState(false);

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmError, setConfirmError] = React.useState(false);
  const [confirmErrorMessage, setConfirmErrorMessage] = React.useState('');

  const validate = (email: string, password: string, confirm: string) => {
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
    if (confirm !== password) {
      setConfirmError(true);
      setConfirmErrorMessage('비밀번호가 일치하지 않습니다.');
      ok = false;
    } else {
      setConfirmError(false);
      setConfirmErrorMessage('');
    }
    return ok;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');
    const confirm = String(data.get('confirmPassword') ?? '');
    if (!validate(email, password, confirm)) {
      return;
    }
    setSubmitting(true);
    try {
      await signUp(email, password);
      notify.success('회원가입이 완료되었습니다. 환영합니다!');
      navigate('/app', { replace: true });
    } catch (err) {
      if (err instanceof SignupError && err.conflict) {
        setEmailError(true);
        setEmailErrorMessage('이미 가입된 이메일입니다.');
        notify.error('이미 가입된 이메일입니다. 다른 이메일을 사용하세요.');
      } else {
        const message =
          err instanceof Error && err.message ? err.message : '회원가입에 실패했습니다.';
        notify.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" sx={{ justifyContent: 'space-between' }}>
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            회원가입
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
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="confirmPassword">비밀번호 확인</FormLabel>
              <TextField
                error={confirmError}
                helperText={confirmErrorMessage}
                name="confirmPassword"
                placeholder="••••••"
                type="password"
                id="confirmPassword"
                autoComplete="new-password"
                required
                fullWidth
                variant="outlined"
                color={confirmError ? 'error' : 'primary'}
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained" disabled={submitting}>
              {submitting ? '가입 처리 중…' : '회원가입'}
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
              Google 계정으로 시작하기
            </Button>
            <Typography sx={{ textAlign: 'center' }}>
              이미 계정이 있으신가요?{' '}
              <Link href="/login" variant="body2">
                로그인
              </Link>
            </Typography>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
