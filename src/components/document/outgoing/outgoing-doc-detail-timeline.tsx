import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, {
  timelineOppositeContentClasses
} from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import { Box, SxProps, Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';

import { ProcessHisstory } from '@/models/outgoingDocument';

type BaseTimelineItemProps = {
  time: string;
  title: string;
  subTitle: string;
  isLast?: boolean;
};

const translations: Record<string, string> = {
  Consider: 'duyệt',
  Sign: 'ký',
  Accepted: 'Đã xử lý',
  Rejected: 'Từ chối'
};

const BaseTimelineItem: React.FC<BaseTimelineItemProps> = (props) => {
  const { time, title, subTitle, isLast } = props;
  const [, status] = subTitle.split(', ');

  return (
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {time}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot color="success">
          <CheckRoundedIcon />
        </TimelineDot>
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{translations[status]}</Typography>
      </TimelineContent>
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
    <Box sx={sx}>
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
              time={dayjs(history.createdAt).format('HH:mm DD/MM/YYYY')}
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
