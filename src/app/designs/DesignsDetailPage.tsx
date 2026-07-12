import * as React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { deleteDesign, getDesign } from './designsStore';
import { useAuth } from '../../auth';
import { useNotify } from '../../notifications';

export default function DesignsDetailPage() {
  const navigate = useNavigate();
  const notify = useNotify();
  const { isAuthenticated } = useAuth();
  const { id } = useParams<{ id: string }>();
  const doc = React.useMemo(() => (id ? getDesign(id) : undefined), [id]);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  const handleDelete = () => {
    if (!id) return;
    deleteDesign(id);
    setConfirmOpen(false);
    notify.success('문서를 삭제했습니다.');
    navigate('/designs');
  };

  if (!doc) {
    return (
      <Box sx={{ maxWidth: 880 }}>
        <Typography color="text.secondary" sx={{ py: 6, textAlign: 'center' }}>
          존재하지 않는 문서입니다.
        </Typography>
        <Stack sx={{ alignItems: 'center' }}>
          <Button startIcon={<ArrowBackRoundedIcon />} onClick={() => navigate('/designs')}>
            문서 홈으로
          </Button>
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
        <Typography color="text.secondary">{doc.category}</Typography>
        <Typography color="text.primary">{doc.title}</Typography>
      </Breadcrumbs>

      <Stack
        direction="row"
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}
      >
        <Box>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 700, mb: 1.5, letterSpacing: '-0.02em' }}>
            {doc.title}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Chip label={doc.category} size="small" color="primary" variant="outlined" />
            <Typography variant="body2" color="text.secondary">
              작성 {new Date(doc.createdAt).toLocaleString('ko-KR')}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              수정 {new Date(doc.updatedAt).toLocaleString('ko-KR')}
            </Typography>
          </Stack>
        </Box>
        {isAuthenticated && (
          <Stack direction="row" spacing={1} sx={{ flexShrink: 0 }}>
            <Button
              variant="outlined"
              size="small"
              startIcon={<EditRoundedIcon />}
              onClick={() => navigate(`/designs/${doc.id}/edit`)}
            >
              수정
            </Button>
            <Button
              variant="outlined"
              size="small"
              color="error"
              startIcon={<DeleteRoundedIcon />}
              onClick={() => setConfirmOpen(true)}
            >
              삭제
            </Button>
          </Stack>
        )}
      </Stack>

      <Divider sx={{ my: 3 }} />

      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', minHeight: 200, lineHeight: 1.7 }}>
        {doc.content}
      </Typography>

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
    </Box>
  );
}
