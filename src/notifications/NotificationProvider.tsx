import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import type { AlertColor } from '@mui/material/Alert';

// 앱 전역 토스트 알림. 한 번에 하나씩 보여주고, 겹치면 큐로 순차 표시한다.
// 사용: const notify = useNotify(); notify.error('...'); notify.success('...');

interface Notification {
  key: number;
  message: string;
  severity: AlertColor;
  /** 자동 닫힘(ms). null 이면 수동으로만 닫힘. */
  autoHideDuration: number | null;
}

interface NotifyOptions {
  autoHideDuration?: number | null;
}

interface NotifyApi {
  success: (message: string, options?: NotifyOptions) => void;
  error: (message: string, options?: NotifyOptions) => void;
  info: (message: string, options?: NotifyOptions) => void;
  warning: (message: string, options?: NotifyOptions) => void;
  /** 임의 severity 로 알림. */
  show: (message: string, severity: AlertColor, options?: NotifyOptions) => void;
}

const NotifyContext = React.createContext<NotifyApi | undefined>(undefined);

const DEFAULT_DURATION = 5000;

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [queue, setQueue] = React.useState<Notification[]>([]);
  const [current, setCurrent] = React.useState<Notification | null>(null);
  const [open, setOpen] = React.useState(false);
  const keyRef = React.useRef(0);

  // 큐에 쌓인 알림을 현재 표시가 비었을 때 하나씩 꺼낸다.
  React.useEffect(() => {
    if (queue.length && !current) {
      setCurrent(queue[0]);
      setQueue((prev) => prev.slice(1));
      setOpen(true);
    } else if (queue.length && current && open) {
      // 이미 표시 중인데 새 알림이 오면, 현재 것을 닫고 다음 차례로 넘긴다.
      setOpen(false);
    }
  }, [queue, current, open]);

  const show = React.useCallback(
    (message: string, severity: AlertColor, options?: NotifyOptions) => {
      keyRef.current += 1;
      const duration =
        options?.autoHideDuration === undefined ? DEFAULT_DURATION : options.autoHideDuration;
      setQueue((prev) => [
        ...prev,
        { key: keyRef.current, message, severity, autoHideDuration: duration },
      ]);
    },
    [],
  );

  const api = React.useMemo<NotifyApi>(
    () => ({
      show,
      success: (m, o) => show(m, 'success', o),
      error: (m, o) => show(m, 'error', o),
      info: (m, o) => show(m, 'info', o),
      warning: (m, o) => show(m, 'warning', o),
    }),
    [show],
  );

  const handleClose = (_event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  // 닫힘 트랜지션이 끝나면 current 를 비워 다음 알림을 트리거한다.
  const handleExited = () => {
    setCurrent(null);
  };

  return (
    <NotifyContext.Provider value={api}>
      {children}
      <Snackbar
        key={current?.key}
        open={open}
        autoHideDuration={current?.autoHideDuration ?? undefined}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        slotProps={{ transition: { onExited: handleExited } }}
      >
        <Alert
          onClose={handleClose}
          severity={current?.severity ?? 'info'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {current?.message}
        </Alert>
      </Snackbar>
    </NotifyContext.Provider>
  );
}

export function useNotify(): NotifyApi {
  const ctx = React.useContext(NotifyContext);
  if (!ctx) {
    throw new Error('useNotify must be used within a NotificationProvider');
  }
  return ctx;
}
