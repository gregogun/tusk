import { fetcher } from '@/lib/fetcher';
import { svg } from '@/styles/svg';
import useToast from '@/utils/hooks/useToast';
import { ChevronLeftIcon, Cross2Icon, DotsHorizontalIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogWrapper,
} from './alertDialog';
import { button } from './button';
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFieldset,
  DialogInput,
  DialogLabel,
  DialogTitle,
  DialogWrapper,
} from './dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown';
import { Pencil } from './icons/pencil';
import { Trash } from './icons/trash';
import { Flex } from './layout';
import Link from 'next/link';
import { text } from './text';
import { red } from '@radix-ui/colors';
import { Collection } from '.prisma/client';

interface AlertDialogProps {
  collection: Collection;
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

const AlertDialog = ({ collection, deleteOpen, setDeleteOpen }: AlertDialogProps) => {
  const { notify } = useToast();
  // const { mutate } = useSWRConfig();
  const router = useRouter();
  return (
    <AlertDialogWrapper open={deleteOpen} onOpenChange={() => setDeleteOpen(!deleteOpen)}>
      <AlertDialogContent>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete this collection and{' '}
          <span className={text({ weight: 'bold', css: { color: '$white' } })}>all of its tasks</span>.
        </AlertDialogDescription>
        <Flex css={{ justifyContent: 'center', gap: '$4' }}>
          <AlertDialogCancel asChild>
            <button className={button({ variant: 'outline' })}>Cancel</button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <button
              className={button({
                variant: 'solid',
                css: {
                  backgroundColor: red.red3,
                  color: red.red11,
                  '&:hover': { backgroundColor: red.red5 },
                },
              })}
              onClick={async () => {
                // eslint-disable-next-line promise/always-return
                await fetcher(`/api/collection/${collection.id}`, { id: collection.id }, 'DELETE').then(() => {
                  router.push('/app');
                  notify({ state: 'success', message: 'Collection successfully deleted' });
                });
              }}
            >
              Yes, delete task
            </button>
          </AlertDialogAction>
        </Flex>
      </AlertDialogContent>
    </AlertDialogWrapper>
  );
};

interface DialogProps {
  collection: Collection;
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  updateName: Dispatch<SetStateAction<string>>;
}

const Dialog = ({ collection, editOpen, setEditOpen, updateName }: DialogProps) => {
  const { notify } = useToast();
  return (
    <DialogWrapper open={editOpen} onOpenChange={() => setEditOpen(!editOpen)}>
      <DialogContent>
        <DialogTitle asChild>
          <h2>Edit Task</h2>
        </DialogTitle>
        <DialogDescription asChild>
          <p>Rename your task and hit the save button below to save changes.</p>
        </DialogDescription>
        <DialogFieldset>
          <DialogLabel htmlFor="collection">Name</DialogLabel>
          <DialogInput onChange={(e) => updateName(e.target.value)} id="collection" placeholder="My Collection" />
        </DialogFieldset>
        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
          <DialogClose asChild>
            <button
              aria-label="Close"
              onClick={async () => {
                notify({ state: 'success', message: 'Collection successfully updated' });
                await fetcher(`/api/collection/${collection.id}`, { name: name }, 'PUT');
              }}
              className={button({
                variant: 'brandOutline',
                size: 'md',
                css: { mr: '$4', backgroundColor: '$darkGray' },
              })}
            >
              Save
            </button>
          </DialogClose>
          <DialogClose asChild>
            <button aria-label="Close" className={button({ variant: 'outline', size: 'md', css: {} })}>
              Cancel
            </button>
          </DialogClose>
        </Flex>
        <DialogClose asChild>
          <button
            className={button({
              size: 'icon',
              css: {
                position: 'absolute',
                top: 20,
                right: 20,
              },
            })}
          >
            <Cross2Icon
              className={svg({
                css: {
                  boxSize: '$lg',
                },
              })}
            />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogWrapper>
  );
};

interface DropdownProps {
  editOpen: boolean;
  setEditOpen: Dispatch<SetStateAction<boolean>>;
  deleteOpen: boolean;
  setDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

const Dropdown = ({ deleteOpen, setDeleteOpen, editOpen, setEditOpen }: DropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={button({
            variant: 'ghost',
            size: 'icon',
          })}
        >
          <DotsHorizontalIcon className={svg({ css: { boxSize: '$lg' } })} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent loop>
        <DropdownMenuItem
          role="button"
          onClick={() => setEditOpen(!editOpen)}
          css={{
            padding: '$3',
            borderRadius: '$md $md 0 0',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          Edit{' '}
          <span>
            <Pencil css={{ boxSize: '$md' }} />
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          role="button"
          onClick={() => setDeleteOpen(!deleteOpen)}
          css={{
            padding: '$3',
            borderRadius: '0 0 $md $md',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          Delete
          <span>
            <Trash css={{ boxSize: '$md' }} />
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface CollectionDialogProps {
  collection: Collection;
}

export const CollectionDialog = ({ collection }) => {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, updateName] = useState(collection?.name);

  return (
    <Flex css={{ mb: '$6', alignItems: 'center', justifyContent: 'space-between' }}>
      <Flex css={{ alignItems: 'center' }}>
        <Link href="/app" passHref>
          <a
            className={button({
              size: 'icon',
              css: {
                padding: '$2 $2',
                mr: '$4',
                backgroundColor: '$darkGray',
                '&:hover': {
                  backgroundColor: '$gray',
                },
              },
            })}
          >
            <ChevronLeftIcon aria-label="Back to collections" className={svg({ css: { boxSize: '$2xl' } })} />
          </a>
        </Link>
        <h1 className={text({ size: '2xl', weight: 'bold' })}>{name}</h1>
      </Flex>
      <Dropdown editOpen={editOpen} setEditOpen={setEditOpen} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />
      <AlertDialog collection={collection} deleteOpen={deleteOpen} setDeleteOpen={setDeleteOpen} />
      <Dialog collection={collection} editOpen={editOpen} setEditOpen={setEditOpen} updateName={updateName} />
    </Flex>
  );
};
