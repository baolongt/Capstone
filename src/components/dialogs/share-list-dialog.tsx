import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useUpdateListShared, useUpdateListUnShared } from '@/apis';
import { useListShared } from '@/apis/outgoingDocument/list-shared';
import { useListUnshared } from '@/apis/outgoingDocument/list-unshared';
import { api } from '@/constants';
import { ShareList } from '@/models/outgoingDocument';

import {
  CustomButton,
  Item,
  ItemChild,
  Loading,
  TreeViewSelect
} from '../common';

export interface ShareListDialogProps {
  isOpen: boolean;
  onClose: () => void;
}
const convertToTreeData = (data: ShareList) => {
  return data.map((item) => {
    return {
      id: item.departmentId.toString(),
      name: item.departmentName,
      children: item.users.map((user) => {
        return {
          id: user.userId.toString(),
          name: user.userName + ' - ' + user.userEmail
        };
      })
    };
  });
};

const getUniq = (
  arr: {
    departmentId: number;
    departmentName: string;
    users: {
      userId: number;
      userName: string;
      userEmail: string;
    }[];
  }[]
) => {
  const groupedData = _.groupBy(arr, 'departmentId');

  const aggregatedData = _.map(groupedData, (items) => {
    return {
      departmentId: items[0].departmentId,
      departmentName: items[0].departmentName,
      users: items
        .map((item) => {
          return item.users;
        })
        .flat()
    };
  });
  return aggregatedData;
};

export const ShareListDialog: React.FC<ShareListDialogProps> = ({
  isOpen,
  onClose
}) => {
  const { id } = useParams<{ id: string }>();
  const { data: listShared, isLoading: slLoading } = useListShared(Number(id));
  const { data: listUnshared, isLoading: ulLoading } = useListUnshared(
    Number(id)
  );
  const [data, setData] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<{
    items: Item[];
    children: ItemChild[];
  }>();
  const [isDirty, setIsDirty] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (listShared && listUnshared) {
      const uniqle = getUniq([...listShared, ...listUnshared]);
      setData(convertToTreeData(uniqle));
    }
  }, [listShared, listUnshared, slLoading, ulLoading]);

  const handleOnChange = (data: { items: Item[]; children: ItemChild[] }) => {
    setSelectedItems(data);
  };

  const {
    mutate: updateListShared,
    isLoading: updateSharedLoading,
    isSuccess: updateSharedSuccess
  } = useUpdateListShared(Number(id));
  const {
    mutate: updateListUnshared,
    isLoading: updateUnshareLoading,
    isSuccess: updateUnshareSuccess
  } = useUpdateListUnShared(Number(id));

  const handleShare = async () => {
    const selectedUsers =
      selectedItems?.children.map((c) => Number(c.id)) || [];
    const listSharedUsers =
      listShared?.map((ls) => ls.users.map((u) => u.userId)).flat() || [];

    const listNewUsers = _.difference(selectedUsers, listSharedUsers);
    const listRemoveUsers = _.difference(listSharedUsers, selectedUsers);

    console.log('test', {
      listNewUsers,
      listRemoveUsers
    });

    try {
      await Promise.all([
        updateListShared({
          userids: listNewUsers
        }),
        updateListUnshared({
          userids: listRemoveUsers
        })
      ]);
      toast.success('Chia sẻ thành công');

      queryClient.invalidateQueries([api.SHARE_LIST, Number(id)]);
      queryClient.invalidateQueries([api.UNSHARE_LIST, Number(id)]);
    } catch (e) {
      console.log(e);
      toast.error('Chia sẻ thất bại');
    }
  };

  useEffect(() => {
    if (selectedItems) {
      console.log(selectedItems);
    }
    const selectedUsers =
      selectedItems?.children.map((c) => Number(c.id)) || [];
    const listSharedUsers =
      listShared?.map((ls) => ls.users.map((u) => u.userId)).flat() || [];
    if (!_.isEqual(selectedUsers, listSharedUsers)) {
      setIsDirty(false);
    } else {
      setIsDirty(true);
    }
  }, [selectedItems]);

  return (
    <Dialog
      open={isOpen}
      sx={{
        '& .MuiDialog-paper': {
          minWidth: { lg: '450px', md: '500px', xs: '75vw' },
          minHeight: { lg: '500px', md: '500px', xs: '75vw' }
        }
      }}
      onClose={onClose}
    >
      <DialogTitle fontWeight={600}>Danh sách chia sẻ</DialogTitle>
      <DialogContent>
        {slLoading && ulLoading ? (
          <Loading />
        ) : (
          listShared &&
          listUnshared && (
            <TreeViewSelect
              data={data}
              initData={convertToTreeData(listShared)}
              onChange={handleOnChange}
            />
          )
        )}
      </DialogContent>

      <DialogActions sx={{ p: '0 24px 24px 0' }}>
        <CustomButton label="Đóng" variant="outlined" onClick={onClose} />
        <LoadingButton
          loading={updateSharedLoading || updateUnshareLoading}
          size="small"
          variant="contained"
          disabled={isDirty}
          onClick={handleShare}
        >
          Chia sẻ
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
