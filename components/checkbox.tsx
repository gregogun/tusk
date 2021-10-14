import { srOnly } from '@/styles/srOnly';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import { css, styled } from 'stitches.config';
import { Flex } from './layout';

const StyledCheckbox = styled(CheckboxPrimitive.Root, {
  $$innerBorder: '10px',
  $$outerBorder: 'calc($$innerBorder + 2px)',
  $$thickness: '2px',

  all: 'unset',
  cursor: 'pointer',
  width: '$xl',
  height: '$xl',
  borderRadius: '$$innerBorder',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '$accent',
  //   boxShadow: `0 0 0 2px $colors$white`,
  marginRight: '$5',
  position: 'relative',

  '&::before': {
    backgroundImage: '$gradient',
    content: `''`,
    display: 'block',
    position: 'absolute',
    top: '-$$thickness',
    left: '-$$thickness',
    width: 'calc(100% +  4px)',
    height: 'calc(100% +  4px)',
    borderRadius: '$$outerBorder',
    zIndex: -1,
  },

  '&:hover': {
    backgroundColor: '$gray',
  },
});

const StyledIndicator = styled(CheckboxPrimitive.Indicator, {
  color: '$white',
});

// Exports
//   const Checkbox = StyledCheckbox;
const CheckboxIndicator = StyledIndicator;

// Your app...
const Label = styled('label', {
  ...srOnly,
});

const icon = css({});

interface CheckboxProps {
  complete: boolean;
  setComplete: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
  completed: boolean;
}

export const Checkbox = ({ id, complete, setComplete, completed, ...props }: CheckboxProps) => {
  function handleClick() {
    // updateTaskCompletion().then(() => {
    //   setComplete(!complete);
    // });
  }

  // async function updateTaskCompletion() {
  //   try {
  //     const updateCompleted: UpdateTodoInput = {
  //       id: id,
  //       completed: !complete,
  //     };

  //     await API.graphql({
  //       authMode: GRAPHQL_AUTH_MODE.AMAZON_COGNITO_USER_POOLS,
  //       query: updateTodo,
  //       variables: {
  //         input: updateCompleted,
  //       },
  //     });
  //   } catch ({ errors }) {
  //     console.error(...errors);
  //     throw new Error(errors[0].message);
  //   }
  // }

  return (
    <Flex css={{ alignItems: 'center' }}>
      <StyledCheckbox checked={completed} id="c1">
        <CheckboxIndicator>
          {completed ? (
            <CheckIcon
              className={icon({
                css: {
                  boxSize: '$lg',
                },
              })}
            />
          ) : null}
        </CheckboxIndicator>
      </StyledCheckbox>
      <Label css={{ paddingLeft: '$4' }} htmlFor="c1">
        Accept terms and conditions.
      </Label>
    </Flex>
  );
};
