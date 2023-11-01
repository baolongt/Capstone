import { TreeItem, treeItemClasses } from '@mui/lab';
import TreeView from '@mui/lab/TreeView';
import { alpha, Checkbox, useTheme } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

type TreeViewSelectProps = {
  data: Item[];
  // onChange: (items: Item[]) => void;
  initData?: Item[];
  onChange: (data: { items: Item[]; children: ItemChild[] }) => void;
};

export interface ItemChild {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  children: Array<ItemChild>;
}

export const TreeViewSelect = ({
  data,
  initData,
  onChange
}: TreeViewSelectProps) => {
  const [items, setItems] = useState<{
    [key: string]: Item;
  }>({});
  const [children, setChildren] = useState<{
    [key: string]: ItemChild;
  }>({});
  const theme = useTheme();

  const handleSelectItem = (item: Item) => {
    // if item is selected, first remove it to items and remove its children from children state
    if (items[item.id] !== null && items[item.id] !== undefined) {
      const newItems = _.omit(items, [item.id]);
      setItems(newItems);

      const newChildren = _.omit(
        children,
        item.children?.map((child) => child.id) || []
      );
      setChildren(newChildren);
    }
    // if item is not selected, add all children to selected
    else {
      // add new item to items
      const newItems = {
        [item.id]: item
      };
      setItems({
        ...items,
        ...newItems
      });
      const newChildren = item.children?.reduce((acc, child) => {
        return {
          ...acc,
          [child.id]: child
        };
      }, {});
      setChildren({
        ...children,
        ...newChildren
      });
    }
  };

  const handleSelectItemChildrent = (
    child: ItemChild & {
      parent: Item;
    }
  ) => {
    // if child is not selected, add it to children
    if (children[child.id] !== null && children[child.id] !== undefined) {
      const newChildren = _.omit(children, [child.id]);
      setChildren(newChildren);
    }
    // if child is selected, add it to children
    else {
      setChildren({
        ...children,
        [child.id]: child
      });
    }
  };

  useEffect(() => {
    //add all children from items to children state
    const isAllChildrenSelected = (item: Item) => {
      return item.children?.every((child) => !!children[child.id]);
    };

    const itemsToBeAdd: {
      [key: string]: Item;
    } = {};
    const itemsToBeRemove: {
      [key: string]: Item;
    }[] = [];
    data.forEach((item) => {
      if (isAllChildrenSelected(item)) {
        itemsToBeAdd[item.id] = item;
      } else if (items[item.id]) {
        itemsToBeRemove.push({
          [item.id]: item
        });
      }
    });

    const newItems = _.omit(
      items,
      itemsToBeRemove.map((item) => Object.keys(item)[0]) || []
    );
    setItems({
      ...newItems,
      ...itemsToBeAdd
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, data]);

  useEffect(() => {
    if (initData) {
      console.log({ initData }, 'initData ');
      const initItems = initData.reduce((acc, item) => {
        return {
          ...acc,
          [item.id]: item
        };
      }, {});
      const children = initData.map((item) => item.children).flat();
      const initChildren = children.reduce((acc, child) => {
        return {
          ...acc,
          [child.id]: child
        };
      }, {});
      setChildren(initChildren);
      setItems(initItems);
    }
  }, []);

  useEffect(() => {
    onChange({
      items: Object.values(items),
      children: Object.values(children)
    });
  }, [children, items]);

  const renderTree = (data: Item) => {
    return (
      <TreeItem
        key={data.id}
        sx={{
          width: '100%',
          [`& .${treeItemClasses.group}`]: {
            borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`
          }
        }}
        icon={
          <Checkbox
            // checked only if all children are selected
            checked={!!items[data.id]}
            onChange={() => handleSelectItem(data)}
            onClick={(e) => e.stopPropagation()}
          />
        }
        nodeId={'item-' + data.id}
        label={
          data.name + (data.children.length ? ` (${data.children.length})` : '')
        }
      >
        {data.children?.map((child) => (
          <TreeItem
            key={child.id}
            icon={
              <Checkbox
                checked={!!children[child.id]}
                onChange={() =>
                  handleSelectItemChildrent({ ...child, parent: data })
                }
                onClick={(e) => e.stopPropagation()}
              />
            }
            nodeId={'child-' + child.id}
            label={child.name}
          />
        ))}
      </TreeItem>
    );
  };

  return (
    <TreeView
      aria-label="file system navigator"
      defaultCollapseIcon={<Checkbox />}
      defaultExpandIcon={<Checkbox />}
      sx={{ height: 240, flexGrow: 1, maxWidth: 400 }}
      defaultExpanded={data.map((item) => 'item-' + item.id)}
    >
      {data.map((node) => renderTree(node))}
    </TreeView>
  );
};
