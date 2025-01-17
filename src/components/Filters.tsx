import * as React from 'react';
import { Select, SelectOption } from '@highlight-ui/select';
import { Input } from '@highlight-ui/input';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { useDebouncedInput } from './useDebouncedInput';

interface Props {
  selectedPosition?: SelectOption;
  options: SelectOption[];
  onPositionChanged: (selectedPosition: string) => void;
  onNameSearchChanged: (name: string) => void;
}

const Filters: React.FunctionComponent<Props> = ({
  selectedPosition,
  options,
  onPositionChanged,
  onNameSearchChanged,
}) => {
  // We didn't go through it during the interview, but I implemented the other simple filter
  // to filter by name. I created this small hook to debounce the typing.
  // I think this is a good practice to avoid unnecessary filtering on every keystroke
  const { currentValue, debouncedValue, setCurrentValue } =
    useDebouncedInput('');

  //When the debounced value changes I follow the same approach as the position filter
  React.useEffect(() => {
    onNameSearchChanged(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className='flex items-center justify-between m-8'>
      <div className='flex gap-5'>
        <Select
          selectedOptions={selectedPosition ? [selectedPosition] : undefined}
          enableFlowTriggers
          closeOnSelect
          options={options}
          onSelect={([{ value }]) => onPositionChanged(value.toString())}
          triggerLabel='Position Applied'
          variant='inline'
        />
      </div>
      <Input
        value={currentValue}
        placeholder='Search by name'
        prefix={<MagnifyingGlassIcon className='h-4 w-4' />}
        onChange={({ target: { value } }) => setCurrentValue(value)}
      />
    </div>
  );
};

export default Filters;
