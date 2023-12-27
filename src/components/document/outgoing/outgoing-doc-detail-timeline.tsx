import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import DoDisturbAltRoundedIcon from '@mui/icons-material/DoDisturbAltRounded';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import UTurnLeftRoundedIcon from '@mui/icons-material/UTurnLeftRounded';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, {
  timelineOppositeContentClasses
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, Paper, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { TIMEZONE } from '@/constants';
import { ProcessHisstory } from '@/models/outgoingDocument';

type BaseTimelineItemProps = {
  time: string;
  title: string;
  subTitle: string;
  isLast?: boolean;
};

const translations: Record<string, string> = {
  Consider: 'duyệt',
  Restart: 'bắt đầu lại quy trình',
  Accepted: 'Đã xử lý',
  Rejected: 'Từ chối',
  Withdraw: 'thu hồi văn bản'
};

const renderStatusIcon = (status: string) => {
  switch (status) {
    case 'Accepted':
      return (
        <TimelineDot color="success">
          <CheckRoundedIcon />
        </TimelineDot>
      );
    case 'Rejected':
      return (
        <TimelineDot color="error" sx={{ color: '#fff' }}>
          <DoDisturbAltRoundedIcon />
        </TimelineDot>
      );
    case 'Restart':
      return (
        <TimelineDot color="secondary" sx={{ color: '#fff' }}>
          <ReplayRoundedIcon />
        </TimelineDot>
      );
    case 'Rollback':
      return (
        <TimelineDot color="warning" sx={{ color: '#fff' }}>
          <UTurnLeftRoundedIcon />
        </TimelineDot>
      );
    case 'Withdraw':
      return (
        <TimelineDot color="warning" sx={{ color: '#fff' }}>
          <RateReviewIcon />
        </TimelineDot>
      );
    default:
      return (
        <TimelineDot color="success">
          <CheckRoundedIcon />
        </TimelineDot>
      );
  }
};

const BaseTimelineItem: React.FC<BaseTimelineItemProps> = (props) => {
  const { time, title, subTitle, isLast } = props;
  const [action, status, rollbacknum] = subTitle.split(', ');

  let item = <></>;
  if (action === 'Rollback') {
    item = (
      <>
        <TimelineSeparator>
          {renderStatusIcon(action)}
          {!isLast && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">
            {'Hệ thống quay lại bước ' + rollbacknum}
          </Typography>
          <Typography variant="subtitle1">{status}</Typography>
        </TimelineContent>
      </>
    );
  } else {
    item = (
      <>
        <TimelineSeparator>
          {renderStatusIcon(status)}
          {!isLast && <TimelineConnector />}
        </TimelineSeparator>
        <TimelineContent>
          <Typography variant="h6">{title}</Typography>
          {['Withdraw', 'Restart'].includes(status) ? (
            <> </>
          ) : (
            <Typography variant="subtitle1">{translations[status]}</Typography>
          )}
        </TimelineContent>
      </>
    );
  }

  return (
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {time}
      </TimelineOppositeContent>
      {item}
    </TimelineItem>
  );
};

export type DetailTimelineProps = {
  sx?: SxProps;
  processHistory?: ProcessHisstory[];
};

export const DetailTimeline: React.FC<DetailTimelineProps> = (props) => {
  const { sx, processHistory } = props;

  if (!processHistory) {
    return <></>;
  }

  return (
    <Box sx={sx} component={Paper} elevation={2}>
      <Timeline
        sx={{
          [`& .${timelineOppositeContentClasses.root}`]: {
            flex: 0.005
          }
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Quá trình xử lý
        </Typography>
        {processHistory.map((history, idx) => {
          let title = '';
          const islLast = idx === processHistory.length - 1;

          if (islLast) {
            title = `${history.handlerName} tạo văn bản`;
          } else {
            const [action] = history.note.split(', ');
            title = `${history.handlerName} ${translations[action]}`;
          }

          return (
            <BaseTimelineItem
              key={idx}
              time={dayjs
                .utc(history.createdAt)
                .tz(TIMEZONE)
                .format('HH:mm DD/MM/YYYY')}
              title={title}
              subTitle={history.note}
              isLast={islLast}
            />
          );
        })}
      </Timeline>
    </Box>
  );
};
