import { Box, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import Draggable from 'react-draggable';
import { FaCheck, FaTimes } from 'react-icons/fa';

type DraggableTextProps = {
  initialText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEnd: React.Dispatch<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  parentRef: React.MutableRefObject<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  docRef: React.MutableRefObject<any>;
  onSet: (text: string) => void;
  onCancel: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CalBoundRightAndBottom = (docRef: React.MutableRefObject<any>) => {
  const style = window.getComputedStyle(docRef.current);
  const paddingTop = parseFloat(style.paddingTop);
  const paddingBottom = parseFloat(style.paddingBottom);
  const paddingLeft = parseFloat(style.paddingLeft);
  const paddingRight = parseFloat(style.paddingRight);

  const width = docRef.current.clientWidth - paddingLeft - paddingRight;
  const height = docRef.current.clientHeight - paddingTop - paddingBottom;

  return {
    right: width,
    bottom: height
  };
};

const DraggableText = ({
  onEnd,
  onSet,
  onCancel,
  initialText,
  docRef
}: DraggableTextProps) => {
  const [text, setText] = useState(initialText);
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

  return (
    <Draggable
      bounds={{
        left: 0,
        top: -40,
        ...CalBoundRightAndBottom(docRef)
      }}
      onStop={(e, dragEl) => {
        const { x, y } = dragEl;
        onEnd({ x, y });
      }}
    >
      <Box
        style={{
          cursor: 'move'
        }}
        sx={{ position: 'absolute', zIndex: 100 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
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
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            borderRadius: 4,
            border: '1px solid #ced4da',
            padding: '0.375rem 0.75rem',
            fontSize: '1rem',
            lineHeight: 1.5,
            color: '#495057',
            backgroundColor: '#fff',
            boxShadow: 'inset 0 1px 1px rgb(0 0 0 / 8%), 0 0 0 transparent',
            transition:
              'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
            cursor: 'move',
            position: 'absolute',
            zIndex: 100
          }}
        >
          {text}
        </Box>
      </Box>
    </Draggable>
  );
};

export default DraggableText;
