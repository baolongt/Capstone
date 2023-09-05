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
import moment from 'moment';
import React from 'react';

import { ProcessHisstory } from '@/models/outgoingDocument';

type BaseTimelineItemProps = {
  time: string;
  title: string;
  subTitle: string;
  isLast?: boolean;
};

const BaseTimelineItem: React.FC<BaseTimelineItemProps> = (props) => {
  const { time, title, subTitle, isLast } = props;
  return (
    <TimelineItem>
      <TimelineOppositeContent color="textSecondary">
        {time}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="subtitle1">{subTitle}</Typography>
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
          Quá trình xử lý {'  '}
        </Typography>
        {processHistory.map((history, idx) => (
          <BaseTimelineItem
            key={idx}
            time={moment(history.createAt).format('HH:mm - DD/MM/YYYY')}
            title={`Chuyển cho ${history.handlerName}`}
            subTitle={history.note}
            isLast={idx === processHistory.length - 1}
          />
        ))}
      </Timeline>
    </Box>
  );
};
