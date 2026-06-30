import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { listPosts, type Page, type PostSummary } from './boardStore';

const PAGE_SIZE = 10;

export default function BoardListPage() {
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0); // 0-base (서버 기준)
  const [data, setData] = React.useState<Page<PostSummary> | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    let alive = true;
    setLoading(true);
    setError(null);
    listPosts(page, PAGE_SIZE)
      .then((res) => {
        if (alive) setData(res);
      })
      .catch((e: unknown) => {
        if (alive) setError(e instanceof Error ? e.message : '목록을 불러오지 못했습니다.');
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [page]);

  const rows = data?.content ?? [];
  const total = data?.totalElements ?? 0;
  const pageCount = Math.max(1, data?.totalPages ?? 1);

  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={2}
        sx={{ justifyContent: 'space-between', alignItems: { sm: 'center' }, mb: 2 }}
      >
        <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
          게시판
        </Typography>
        <Button
          variant="contained"
          startIcon={<EditRoundedIcon />}
          onClick={() => navigate('/app/board/new')}
        >
          글쓰기
        </Button>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={72} align="center">
                번호
              </TableCell>
              <TableCell>제목</TableCell>
              <TableCell width={160}>작성자</TableCell>
              <TableCell width={140}>작성일</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading &&
              !error &&
              rows.map((post, index) => (
                <TableRow
                  key={post.id}
                  hover
                  onClick={() => navigate(`/app/board/${post.id}`)}
                  sx={{ cursor: 'pointer' }}
                >
                  <TableCell align="center">{total - (page * PAGE_SIZE + index)}</TableCell>
                  <TableCell sx={{ fontWeight: 500 }}>{post.title}</TableCell>
                  <TableCell>{post.authorName}</TableCell>
                  <TableCell>{new Date(post.createdAt).toLocaleDateString('ko-KR')}</TableCell>
                </TableRow>
              ))}
            {loading && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            )}
            {!loading && error && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'error.main' }}>
                  {error}
                </TableCell>
              </TableRow>
            )}
            {!loading && !error && rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  등록된 글이 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack sx={{ alignItems: 'center', mt: 2 }}>
        <Pagination
          count={pageCount}
          page={page + 1}
          onChange={(_e, value) => setPage(value - 1)}
          color="primary"
        />
      </Stack>
    </Box>
  );
}
