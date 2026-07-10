import * as React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import {
  createDesign,
  getDesign,
  updateDesign,
  DESIGN_CATEGORIES,
  type DesignCategory,
} from './designsStore';
import { useNotify } from '../../notifications';

export default function DesignsFormPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const existing = React.useMemo(() => (id ? getDesign(id) : undefined), [id]);

  const [title, setTitle] = React.useState(existing?.title ?? '');
  const [category, setCategory] = React.useState<DesignCategory>(
    existing?.category ?? DESIGN_CATEGORIES[0],
  );
  const [content, setContent] = React.useState(existing?.content ?? '');
  const [touched, setTouched] = React.useState(false);

  const titleError = touched && !title.trim();
  const contentError = touched && !content.trim();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTouched(true);
    if (!title.trim() || !content.trim()) return;

    const input = { title: title.trim(), category, content: content.trim() };
    if (isEdit && id) {
      updateDesign(id, input);
      notify.success('문서를 수정했습니다.');
      navigate(`/designs/${id}`, { replace: true });
    } else {
      const created = createDesign(input);
      notify.success('문서를 등록했습니다.');
      navigate(`/designs/${created.id}`, { replace: true });
    }
  };

  if (isEdit && !existing) {
    return (
      <Box sx={{ maxWidth: 880 }}>
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          존재하지 않는 문서입니다.
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button onClick={() => navigate('/designs')}>문서 홈으로</Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 880 }}>
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link component={RouterLink} to="/" underline="hover" color="inherit">
          홈
        </Link>
        <Link component={RouterLink} to="/designs" underline="hover" color="inherit">
          설계 문서
        </Link>
        <Typography color="text.primary">{isEdit ? '문서 수정' : '새 문서'}</Typography>
      </Breadcrumbs>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Stack spacing={2.5}>
          <TextField
            placeholder="제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={titleError}
            helperText={titleError ? '제목을 입력하세요.' : ' '}
            variant="standard"
            fullWidth
            autoFocus
            sx={{ '& .MuiInputBase-input': { fontSize: '2rem', fontWeight: 700 } }}
          />
          <TextField
            select
            label="분류"
            value={category}
            onChange={(e) => setCategory(e.target.value as DesignCategory)}
            sx={{ maxWidth: 240 }}
          >
            {DESIGN_CATEGORIES.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
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
            minRows={16}
          />
          <Stack direction="row" spacing={1} sx={{ justifyContent: 'flex-end' }}>
            <Button onClick={() => navigate(-1)}>취소</Button>
            <Button type="submit" variant="contained">
              {isEdit ? '수정 완료' : '등록'}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
