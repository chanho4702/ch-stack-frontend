import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteProfileDoc, getProfileDoc } from './profileStore';
import { useAuth } from '../../auth';
import { useNotify } from '../../notifications';
import PublicPageShell from '../components/PublicPageShell';

export default function ProfileDetailPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const doc = React.useMemo(() => (id ? getProfileDoc(id) : undefined), [id]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDelete = () => {
    if (!id) return;
    deleteProfileDoc(id);
    setConfirmOpen(false);
    notify.success('문서를 삭제했습니다.');
    navigate('/profile');
  };

  if (!doc) {
    return (
      <PublicPageShell maxWidth="md">
        <Box sx={{ maxWidth: 720, mx: 'auto' }}>
          <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
            존재하지 않는 문서입니다.
          </Typography>
          <Stack sx={{ alignItems: 'center' }}>
            <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/profile')}>
              목록으로
            </Button>
          </Stack>
        </Box>
      </PublicPageShell>
    );
  }

  return (
    <PublicPageShell maxWidth="md">
      <Box component="article" sx={{ maxWidth: 720, mx: 'auto' }}>
        <Chip label={doc.docType} size="small" color="primary" variant="outlined" sx={{ mb: 2 }} />
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700, mb: 1 }}>
          {doc.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {new Date(doc.createdAt).toLocaleDateString('ko-KR')}
        </Typography>
        <Divider sx={{ my: 3 }} />
        <Typography
          variant="body1"
          sx={{ whiteSpace: 'pre-wrap', minHeight: 200, lineHeight: 1.8, fontSize: '1.05rem' }}
        >
          {doc.content}
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Stack direction="row" spacing={1} sx={{ justifyContent: 'space-between' }}>
          <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/profile')}>
            목록으로
          </Button>
          {isAuthenticated && (
            <Stack direction="row" spacing={1}>
              <Button
                variant="outlined"
                startIcon={<EditRoundedIcon />}
                onClick={() => navigate(`/profile/${doc.id}/edit`)}
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
          )}
        </Stack>
      </Box>

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>문서를 삭제할까요?</DialogTitle>
        <DialogContent>
          <DialogContentText>삭제한 문서는 복구할 수 없습니다.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>취소</Button>
          <Button color="error" variant="contained" onClick={handleDelete}>
            삭제
          </Button>
        </DialogActions>
      </Dialog>
    </PublicPageShell>
  );
}
