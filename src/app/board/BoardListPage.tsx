import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Pagination from '@mui/material/Pagination';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { listPosts } from './boardStore';

const PAGE_SIZE = 10;

export default function BoardListPage() {
  const navigate = useNavigate();
  const [query, setQuery] = React.useState('');
  const [page, setPage] = React.useState(1);

  // 목록은 마운트 시 1회 로드(작성/삭제 후 돌아오면 다시 마운트되어 갱신됨)
  const posts = React.useMemo(() => listPosts(), []);

  const normalized = query.trim().toLowerCase();
  const filtered = normalized
    ? posts.filter((p) => p.title.toLowerCase().includes(normalized))
    : posts;

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const rows = filtered.slice(start, start + PAGE_SIZE);

  const handleSearch = (value: string) => {
    setQuery(value);
    setPage(1);
  };

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
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <TextField
            size="small"
            placeholder="제목 검색"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon fontSize="small" />
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            startIcon={<EditRoundedIcon />}
            onClick={() => navigate('/app/board/new')}
          >
            글쓰기
          </Button>
        </Stack>
      </Stack>

      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={72} align="center">
                번호
              </TableCell>
              <TableCell>제목</TableCell>
              <TableCell width={120}>작성자</TableCell>
              <TableCell width={140}>작성일</TableCell>
              <TableCell width={88} align="right">
                조회
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((post, index) => (
              <TableRow
                key={post.id}
                hover
                onClick={() => navigate(`/app/board/${post.id}`)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell align="center">
                  {filtered.length - (start + index)}
                </TableCell>
                <TableCell sx={{ fontWeight: 500 }}>{post.title}</TableCell>
                <TableCell>{post.author}</TableCell>
                <TableCell>
                  {new Date(post.createdAt).toLocaleDateString('ko-KR')}
                </TableCell>
                <TableCell align="right">{post.views}</TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                  {normalized ? '검색 결과가 없습니다.' : '등록된 글이 없습니다.'}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack sx={{ alignItems: 'center', mt: 2 }}>
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={(_e, value) => setPage(value)}
          color="primary"
        />
      </Stack>
    </Box>
  );
}
