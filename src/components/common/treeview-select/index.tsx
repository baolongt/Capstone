import { TreeItem } from '@mui/lab';
import TreeView from '@mui/lab/TreeView';
import { Checkbox } from '@mui/material';
import _ from 'lodash';
import { useEffect, useState } from 'react';

type TreeViewSelectProps = {
  data: Item[];
  // onChange: (items: Item[]) => void;
};

export interface ItemChild {
  id: string;
  name: string;
}

export interface Item {
  id: string;
  name: string;
  children: ItemChild[];
}

export const TreeViewSelect = ({ data }: TreeViewSelectProps) => {
  const [items, setItems] = useState<{
    [key: string]: Item;
  }>({});
  const [children, setChildren] = useState<{
    [key: string]: ItemChild;
  }>({});

  const handleSelectItem = (item: Item) => {
    console.debug('debug ', { item });
    // if item is selected, first remove it to items and remove its children from children state
    if (items[item.id] !== null && items[item.id] !== undefined) {
      const newItems = _.omit(items, [item.id]);
      setItems(newItems);

      const newChildren = _.omit(
        children,
        item.children?.map((child) => child.id)
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

    data.forEach((item) => {
      if (isAllChildrenSelected(item)) {
        setItems({
          ...items,
          [item.id]: item
        });
      } else if (items[item.id]) {
        console.log('update new items');
        const newItems = _.omit(items, [item.id]);
        setItems(newItems);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, data]);

  // useEffect(() => {
  //   onChange(Object.values(items));
  // }, [items, children]);

  const renderTree = (data: Item) => {
    return (
      <TreeItem
        key={data.id}
        icon={
          <Checkbox
            // checked only if all children are selected
            checked={!!items[data.id]}
            onChange={() => handleSelectItem(data)}
            onClick={(e) => e.stopPropagation()}
          />
        }
        nodeId={data.id}
        label={data.name}
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
            nodeId={child.id}
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
    >
      {data.map((node) => renderTree(node))}
    </TreeView>
  );
};
