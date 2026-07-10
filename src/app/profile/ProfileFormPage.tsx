import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';
import {
  createProfileDoc,
  getProfileDoc,
  updateProfileDoc,
  PROFILE_DOC_TYPES,
  type ProfileDocType,
} from './profileStore';
import { useNotify } from '../../notifications';
import PublicPageShell from '../components/PublicPageShell';

export default function ProfileFormPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const existing = React.useMemo(() => (id ? getProfileDoc(id) : undefined), [id]);

  const [title, setTitle] = React.useState(existing?.title ?? '');
  const [docType, setDocType] = React.useState<ProfileDocType>(
    existing?.docType ?? PROFILE_DOC_TYPES[0],
  );
  const [content, setContent] = React.useState(existing?.content ?? '');
  const [touched, setTouched] = React.useState(false);

  const titleError = touched && !title.trim();
  const contentError = touched && !content.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!title.trim() || !content.trim()) return;

    const input = { title: title.trim(), docType, content: content.trim() };
    if (isEdit && id) {
      updateProfileDoc(id, input);
      notify.success('문서를 수정했습니다.');
      navigate(`/profile/${id}`, { replace: true });
    } else {
      const created = createProfileDoc(input);
      notify.success('문서를 등록했습니다.');
      navigate(`/profile/${created.id}`, { replace: true });
    }
  };

  if (isEdit && !existing) {
    return (
      <PublicPageShell maxWidth="md">
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
            존재하지 않는 문서입니다.
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <Button onClick={() => navigate('/profile')}>목록으로</Button>
          </Stack>
        </Box>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell maxWidth="md">
      <Box sx={{ maxWidth: 720, mx: 'auto' }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
          {isEdit ? '자기소개/이력 수정' : '자기소개/이력 작성'}
        </Typography>
        <Paper variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
          <Box component="form" onSubmit={handleSubmit} noValidate>
            <Stack spacing={2.5}>
            <TextField
              label="제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={titleError}
              helperText={titleError ? '제목을 입력하세요.' : ' '}
              fullWidth
              required
              autoFocus
            />
            <TextField
              select
              label="유형"
              value={docType}
              onChange={(e) => setDocType(e.target.value as ProfileDocType)}
              fullWidth
            >
              {PROFILE_DOC_TYPES.map((t) => (
                <MenuItem key={t} value={t}>
                  {t}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="내용"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              error={contentError}
              helperText={contentError ? '내용을 입력하세요.' : ' '}
              fullWidth
              required
              multiline
              minRows={10}
            />
            <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
              <Button onClick={() => navigate(-1)}>취소</Button>
              <Button type="submit" variant="contained">
                {isEdit ? '수정 완료' : '등록'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
      </Box>
    </PublicPageShell>
  );
}
