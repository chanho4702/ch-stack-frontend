import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import { createPost, getPost, updatePost } from './boardStore';
import { useAuth } from '../auth/AuthContext';

export default function BoardFormPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const isEdit = Boolean(id);

  const existing = React.useMemo(() => (id ? getPost(id) : undefined), [id]);

  const [title, setTitle] = React.useState('');
  const [author, setAuthor] = React.useState('');
  const [content, setContent] = React.useState('');
  const [touched, setTouched] = React.useState(false);

  React.useEffect(() => {
    if (existing) {
      setTitle(existing.title);
      setAuthor(existing.author);
      setContent(existing.content);
    } else if (!isEdit) {
      // 새 글: 작성자 기본값으로 로그인 이메일 채워둠
      setAuthor(user?.email ?? '');
    }
  }, [existing, isEdit, user]);

  const titleError = touched && !title.trim();
  const contentError = touched && !content.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!title.trim() || !content.trim()) {
      return;
    }
    const input = { title, author, content };
    if (isEdit && id) {
      updatePost(id, input);
      navigate(`/app/board/${id}`, { replace: true });
    } else {
      const created = createPost(input);
      navigate(`/app/board/${created.id}`, { replace: true });
    }
  };

  // 수정 모드인데 글이 없으면 안내
  if (isEdit && !existing) {
    return (
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          존재하지 않는 글입니다.
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button onClick={() => navigate('/app/board')}>목록으로</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900 }}>
      <Typography variant="h5" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
        {isEdit ? '글 수정' : '글쓰기'}
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
              label="작성자"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              helperText="비우면 '익명' 으로 저장됩니다."
              fullWidth
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
              <Button onClick={() => navigate(-1)}>취소</Button>
              <Button type="submit" variant="contained">
                {isEdit ? '수정 완료' : '등록'}
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Paper>
    </Box>
  );
}
