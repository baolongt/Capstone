/* eslint-disable @typescript-eslint/no-explicit-any */
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import UTurnLeftIcon from '@mui/icons-material/UTurnLeft';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  SxProps,
  TextField,
  Typography
} from '@mui/material';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { useGetExampleWorkflow } from '@/apis/work-flow/get-outgoing-doc-example';
import { TIMEZONE } from '@/constants';
import { user, workFlow } from '@/models';
import { ActionOptions, convertActionToString } from '@/models/work-flow';

import DateTimePickerInput from '../common/date-time-picker';

type DragAndDropListProps = {
  users: user.User[];
  initData?: workFlow.StepCreate[];
  sx?: SxProps;
  handleCreate: (steps: workFlow.StepCreate[]) => void;
  isCreating: boolean;
  docType: workFlow.DocumentTypeCreate;
  isCreatingWorkflow: boolean;
};

type ListItemProps = {
  users: user.User[];
  item: workFlow.StepCreate;
  index: number;
  handleDeleteItem: (id: number) => void;
  handleUpdateHandler: (id: number, handlerId: number) => void;
  handleUpdateAction: (id: number, action: workFlow.Action) => void;
  handleUpdateDeadline: (id: number, deadline: string) => void;
  handleUpdateFailStepNumber: (id: number, failStepNumber: number) => void;
  docType: workFlow.DocumentTypeCreate;
  previewSteps: workFlow.StepCreate[];
};

const convertStepToItem = (step: workFlow.StepCreate) => {
  return `${step.id}`;
};

const ListItem = ({
  item,
  index,
  users,
  handleDeleteItem,
  handleUpdateHandler,
  handleUpdateAction,
  handleUpdateDeadline,
  handleUpdateFailStepNumber,
  docType,
  previewSteps
}: ListItemProps) => {
  const [isHaveFailStep, setIsHaveFailStep] = useState<boolean>(false);

  return (
    <Draggable draggableId={String(item.id)} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          component={Paper}
          sx={{
            width: '100%',
            height: 100,
            display: 'flex',
            justifyContent: 'start',
            mb: 1,
            pt: 2,
            backgroundColor: '#fff'
          }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Chip
            color="primary"
            variant="outlined"
            label={`${index + 1}`}
            sx={{ mr: 1, mt: 1 }}
          />
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'start',
              backgroundColor: '#fff',
              width: '100%'
            }}
          >
            <Autocomplete
              disablePortal
              size="small"
              options={users}
              value={users.filter((user) => user.id === item.handlerId)[0]}
              getOptionLabel={(option) => String(option.name)}
              sx={{ width: 200, mt: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Người xử lý" />
              )}
              onChange={(e, newValue) => {
                if (!newValue) return;
                handleUpdateHandler(item.id, newValue.id);
              }}
            />
            <Autocomplete
              disablePortal
              size="small"
              value={item.action}
              options={ActionOptions[docType]}
              getOptionLabel={(option) => convertActionToString(option)}
              sx={{ width: 200, mt: 1, ml: 1 }}
              renderInput={(params) => (
                <TextField {...params} label="Vai trò" />
              )}
              onChange={(e, newValue) => {
                if (!newValue) return;
                handleUpdateAction(item.id, newValue);
              }}
            />

            <DateTimePickerInput
              value={dayjs(item.deadline).tz(TIMEZONE)}
              sx={{ ml: 1, width: 270 }}
              label="Hạn xử lý"
              onChange={(newValue: string) => {
                console.log(dayjs(newValue).toISOString());
                return handleUpdateDeadline(
                  item.id,
                  dayjs(newValue).toISOString()
                );
              }}
            />

            {index > 0 && !isHaveFailStep && (
              <Box sx={{ mt: 1 }}>
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => setIsHaveFailStep(true)}
                >
                  <UTurnLeftIcon />
                </IconButton>
              </Box>
            )}

            {isHaveFailStep && (
              <>
                <Autocomplete
                  disablePortal
                  size="small"
                  options={previewSteps}
                  getOptionLabel={(option) => convertStepToItem(option)}
                  sx={{ width: 120, mt: 1, ml: 1 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Bước quay lại" />
                  )}
                  onChange={(e, newValue) => {
                    if (newValue) {
                      handleUpdateFailStepNumber(item.id, newValue.id);
                    }
                  }}
                />
                <Box sx={{ mt: 1 }}>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={() => setIsHaveFailStep(false)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </Box>
              </>
            )}
            <Box sx={{ mt: 1 }}>
              <IconButton
                size="small"
                aria-label="delete"
                color="error"
                onClick={() => handleDeleteItem(item.id)}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </Box>
      )}
    </Draggable>
  );
};

const reorder = (
  list: workFlow.StepCreate[],
  startIndex: number,
  endIndex: number
) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function DragAndDropList({
  users = [],
  initData,
  sx,
  handleCreate,
  docType,
  isCreatingWorkflow
}: DragAndDropListProps) {
  const [items, setItems] = React.useState<workFlow.StepCreate[]>([]);
  const { data } = useGetExampleWorkflow({
    docType
  });
  const handleDragEnd = (result: { destination: any; source?: any }) => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.index === destination.index) {
      return;
    }

    const reorderedItems = reorder(items, source.index, destination.index);

    setItems(reorderedItems);
  };

  const handleAddNewItem = () => {
    setItems((prev) => {
      return [
        ...prev,
        {
          id: items.length + 1,
          handlerId: 1,
          action: workFlow.Action.CONSIDER,
          deadline: new Date().toISOString()
        }
      ];
    });
  };

  useEffect(() => {
    console.log('items changed: ', items);
  }, [items]);

  useEffect(() => {
    if (!initData) return;
    setItems(initData);
  }, [initData]);

  const handleDeleteItem = (id: number) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  const handleUpdateHandler = (id: number, handlerId: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          handlerId
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleUpdateAction = (id: number, action: workFlow.Action) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          action
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleUpdateDeadline = (id: number, deadline: string) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          deadline
        };
      }
      return item;
    });
    setItems(newItems);
  };

  const handleUpdateFailStepNumber = (id: number, failStepNumber: number) => {
    const newItems = items.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          failStepNumber
        };
      }
      return item;
    });
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <Box
            ref={provided.innerRef}
            component="div"
            {...provided.droppableProps}
            sx={sx}
          >
            {items.length === 0 && (
              <Box
                sx={{
                  width: '100%',
                  justifyContent: 'center',
                  textAlign: 'center'
                }}
              >
                <Typography sx={{ color: '#000' }} variant="h5">
                  Chưa có trình tự xử lý
                </Typography>
                <Button
                  sx={{ mt: 2, mr: 1 }}
                  size="small"
                  variant="outlined"
                  color="primary"
                  onClick={() => {
                    if (data) {
                      const newItems = data.map((step) => ({
                        id: step.stepNumber,
                        handlerId: step.handlerId,
                        action: step.action,
                        deadline: step.deadline
                      }));

                      setItems(newItems);
                    }
                  }}
                >
                  Trình xử lý mẫu
                </Button>
              </Box>
            )}
            {items.map((item, index) => {
              return (
                <ListItem
                  key={item.id}
                  handleDeleteItem={handleDeleteItem}
                  handleUpdateHandler={handleUpdateHandler}
                  handleUpdateAction={handleUpdateAction}
                  handleUpdateDeadline={handleUpdateDeadline}
                  handleUpdateFailStepNumber={handleUpdateFailStepNumber}
                  item={item}
                  index={index}
                  users={users}
                  docType={docType}
                  previewSteps={items.slice(0, index)}
                />
              );
            })}
            {provided.placeholder}
          </Box>
        )}
      </Droppable>
      <Box sx={{ width: '100%', px: 15, pt: 1 }}>
        <Box
          sx={{ width: '100%', justifyContent: 'center', textAlign: 'center' }}
        >
          <Button
            sx={{ mt: 2, mr: 1 }}
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleAddNewItem}
          >
            Thêm
          </Button>
          <LoadingButton
            sx={{ mt: 2 }}
            size="small"
            variant="contained"
            color="primary"
            loading={isCreatingWorkflow}
            onClick={() => handleCreate(items)}
          >
            Tạo
          </LoadingButton>
        </Box>
      </Box>
    </DragDropContext>
  );
}
export default DragAndDropList;
