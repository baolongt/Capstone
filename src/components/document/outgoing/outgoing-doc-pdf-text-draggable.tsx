import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';

type DraggableTextProps = {
  initialText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEnd: React.Dispatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentRef: React.MutableRefObject<any>;
  onSet: (text: string) => void;
  onCancel: () => void;
};

const DraggableText = ({
  onEnd,
  onSet,
  onCancel,
  initialText,
  parentRef
}: DraggableTextProps) => {
  const [text, setText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialText) {
      setText(initialText);
    } else {
      inputRef?.current?.focus();
      inputRef?.current?.select();
    }
  }, [initialText]);

  const handleCancel = () => {
    onCancel();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <Draggable
      bounds={{
        left: 0,
        top: 0,
        right: parentRef.current.offsetWidth,
        bottom: parentRef.current.offsetHeight
      }}
      onStop={onEnd}
    >
      <Box sx={{ position: 'absolute', zIndex: 100 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Button
            variant="contained"
            color="success"
            sx={{ marginRight: '8px' }}
            onClick={() => onSet(text)}
          >
            <FaCheck />
          </Button>
          <Button variant="contained" color="error" onClick={handleCancel}>
            <FaTimes />
          </Button>
        </Box>
        <TextField
          inputRef={inputRef}
          value={text}
          disabled={true}
          sx={{
            '& .MuiInputBase-input': {
              color: 'inherit'
            },
            '& .MuiInput-underline:before': {
              borderBottomColor: 'inherit'
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'inherit'
            },
            '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
              borderBottomColor: 'inherit'
            }
          }}
          onChange={handleInputChange}
        />
      </Box>
    </Draggable>
  );
};

export default DraggableText;
