import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deletePost, getPost, incrementViews, type Post } from './boardStore';

export default function BoardDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const viewedRef = React.useRef(false);
  const [post, setPost] = React.useState<Post | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  React.useEffect(() => {
    if (!id) {
      return;
    }
    // StrictMode 의 이중 실행에서 조회수가 2번 오르지 않도록 가드
    if (!viewedRef.current) {
      viewedRef.current = true;
      incrementViews(id);
    }
    setPost(getPost(id));
  }, [id]);

  const handleDelete = () => {
    if (id) {
      deletePost(id);
    }
    setConfirmOpen(false);
    navigate('/app/board');
  };

  if (!post) {
    return (
      <Box sx={{ width: '100%', maxWidth: 900 }}>
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          존재하지 않는 글입니다.
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/app/board')}>
            목록으로
          </Button>
        </Stack>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth: 900 }}>
      <Paper variant="outlined" sx={{ p: { xs: 2, md: 4 } }}>
        <Typography variant="h5" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {post.title}
        </Typography>
        <Stack
          direction="row"
          spacing={2}
          sx={{ color: 'text.secondary', flexWrap: 'wrap' }}
        >
          <Typography variant="body2">작성자 {post.author}</Typography>
          <Typography variant="body2">
            {new Date(post.createdAt).toLocaleString('ko-KR')}
          </Typography>
          <Typography variant="body2">조회 {post.views}</Typography>
        </Stack>
        <Divider sx={{ my: 2 }} />
        <Typography
          variant="body1"
          sx={{ whiteSpace: 'pre-wrap', minHeight: 160, lineHeight: 1.8 }}
        >
          {post.content}
        </Typography>
      </Paper>

      <Stack
        direction="row"
        spacing={1}
        sx={{ justifyContent: 'space-between', mt: 2 }}
      >
        <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/app/board')}>
          목록
        </Button>
        <Stack direction="row" spacing={1}>
          <Button
            variant="outlined"
            startIcon={<EditRoundedIcon />}
            onClick={() => navigate(`/app/board/${post.id}/edit`)}
          >
            수정
          </Button>
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteRoundedIcon />}
            onClick={() => setConfirmOpen(true)}
          >
            삭제
          </Button>
        </Stack>
      </Stack>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>글을 삭제할까요?</DialogTitle>
        <DialogContent>
          <DialogContentText>삭제한 글은 복구할 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>취소</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
