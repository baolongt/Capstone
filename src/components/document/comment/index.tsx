import { LoadingButton } from '@mui/lab';
import { Box, SxProps, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { useCreateComment, useListComments } from '@/apis';
import { Loading } from '@/components/common';
import { TIMEZONE } from '@/constants';
import { DocumentType } from '@/models/comment';

type DocCommentProps = {
  docId: number;
  documentType: DocumentType;
  sx?: SxProps;
};

const DocComment = ({ docId, documentType, sx }: DocCommentProps) => {
  const [content, setContent] = useState<string>('');

  const { data: comments, isLoading } = useListComments({
    docId,
    documentType
  });

  const { mutate: createComment, isLoading: isCreating } = useCreateComment({
    onSuccess: () => {
      setContent('');
    },
    onError: () => {
      toast.error('Gửi bình luận thất bại');
    },
    docId,
    documentType
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setContent(event.target.value);
  };

  const handleSubmit = () => {
    createComment(content);
  };

  return (
    <Box sx={sx}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          mb: 1
        }}
      >
        <TextField
          multiline
          rows={4}
          value={content}
          variant="outlined"
          onChange={handleChange}
        />
        <Box sx={{ mt: 1 }}>
          <LoadingButton
            variant="contained"
            disabled={content.trim().length === 0}
            loading={isCreating}
            onClick={handleSubmit}
          >
            Gửi
          </LoadingButton>
        </Box>
      </Box>

      {isLoading ? (
        <Loading />
      ) : (
        <>
          {comments &&
            comments.map((comment) => {
              return (
                <Box
                  key={comment.id}
                  sx={{
                    border: '1px solid #ccc',
                    borderRadius: '5px',
                    p: 1,
                    mb: 1
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{
                        fontWeight: 'bold'
                      }}
                    >
                      {comment.user?.name}
                    </Typography>
                    {}
                    <Typography>
                      {dayjs
                        .utc(comment.createdDate)
                        .tz(TIMEZONE)
                        .format('HH:mm DD/MM/YYYY')}
                    </Typography>
                  </Box>
                  <Typography>{comment.content}</Typography>
                </Box>
              );
            })}
        </>
      )}
    </Box>
  );
};

export default DocComment;
