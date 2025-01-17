import * as React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import useApplications, { ApplicationResponse } from './useApplications';
import { SelectOption } from '@highlight-ui/select';
import { useSearchParams } from 'react-router-dom';

const buildAvailablePositions = (
  applications: ApplicationResponse[]
): SelectOption[] => {
  const positions = applications.map((a) => a.position_applied);
  return Array.from(new Set(positions)).map((p) => ({ label: p, value: p }));
};

const App: React.FunctionComponent = () => {
  const { data, isLoading } = useApplications();

  // I decided to move the selected Position state up, it makes it easier to filter
  const [selectedPosition, setSelectedPosition] =
    React.useState<SelectOption>();
  const [searchName, setSearchName] = React.useState('');

  // Now with react router proper configured, I can access the url params and set when necessary
  const [searchParams, setSearchParams] = useSearchParams();

  // When the url params change, update the selected position. This makes the initial selection
  // based on the url possible
  React.useEffect(() => {
    const position = searchParams.get('position');
    if (position) {
      setSelectedPosition({ label: position, value: position });
    }
  }, [searchParams]);

  // I also moved this logic to build the options up, since the select component returns only a string value,
  // I need this to find the proper selected option and pass it to the Filter component.
  const positionOptions = React.useMemo(
    () => buildAvailablePositions(data ?? []),
    [data]
  );

  const handlePositionChange = (newPosition: string) => {
    const option = positionOptions.find((o) => o.value === newPosition);
    setSearchParams({ position: newPosition });
    setSelectedPosition(option);
  };

  /* Whenever the selectedPosition or the name filter changes, the component re-renders and the filtered data changes.
  /* The component doesn't allow unselecting the position, but I think 
  /* it should be a thing to improve in the component library */
  const filteredData = React.useMemo(
    () =>
      data?.filter(
        (d) =>
          (d.position_applied === selectedPosition?.value ||
            !selectedPosition) &&
          d.name.toLowerCase().includes(searchName.toLowerCase())
      ) ?? [],
    [selectedPosition, searchName, data]
  );

  if (isLoading || !data) {
    return <div>Loading...</div>;
  }

  return (
    <div className='App'>
      <Filters
        options={positionOptions}
        selectedPosition={selectedPosition}
        onPositionChanged={handlePositionChange}
        onNameSearchChanged={setSearchName}
      />
      <Table data={filteredData} />
    </div>
  );
};

export default App;
