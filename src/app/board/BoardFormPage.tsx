import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import CircularProgress from '@mui/material/CircularProgress';
import { createPost, getPost, updatePost } from './boardStore';
import { useNotify } from '../../notifications';

export default function BoardFormPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const postId = Number(id);

  const [title, setTitle] = React.useState('');
  const [content, setContent] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const [loading, setLoading] = React.useState(isEdit); // 수정 모드면 기존 글 로드
  const [loadError, setLoadError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // 수정 모드: 기존 글을 board-service 에서 불러와 폼을 채운다.
  React.useEffect(() => {
    if (!isEdit) return;
    let alive = true;
    setLoading(true);
    setLoadError(null);
    getPost(postId)
      .then((p) => {
        if (!alive) return;
        setTitle(p.title);
        setContent(p.content);
      })
      .catch((e: unknown) => {
        if (alive) setLoadError(e instanceof Error ? e.message : '글을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [isEdit, postId]);

  const titleError = touched && !title.trim();
  const contentError = touched && !content.trim();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!title.trim() || !content.trim()) {
      return;
    }
    const input = { title: title.trim(), content: content.trim() };
    setSubmitting(true);
    try {
      if (isEdit) {
        await updatePost(postId, input);
        notify.success('글을 수정했습니다.');
        navigate(`/app/board/${postId}`, { replace: true });
      } else {
        const created = await createPost(input);
        notify.success('글을 등록했습니다.');
        navigate(`/app/board/${created.id}`, { replace: true });
      }
    } catch (e: unknown) {
      notify.error(e instanceof Error ? e.message : '저장에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (isEdit && loading) {
    return (
      <Box sx={{ width: '100%', maxWidth: 900, textAlign: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (isEdit && loadError) {
    return (
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          {loadError}
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button onClick={() => navigate('/app/board')}>목록으로</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700 }}>
          {isEdit ? '글 수정' : '글쓰기'}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
          제목과 내용을 입력한 뒤 저장하세요.
        </Typography>
      </Box>
      <Paper variant="outlined" sx={{ p: { xs: 2.5, md: 4 } }}>
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
              <Button onClick={() => navigate(-1)} disabled={submitting}>
                취소
              </Button>
              <Button type="submit" variant="contained" disabled={submitting}>
                {isEdit ? '수정 완료' : '등록'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
