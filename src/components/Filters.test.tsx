import { render, screen, userEvent, within } from '../test/utils';
import Filters from './Filters';
import { vi } from 'vitest';

describe('Filters', () => {
  // I didn't add any test, just fixed the props and moved this mock here to make the test pass
  const positions = [
    {
      label: 'Agent',
      value: 'Agent',
    },
    {
      label: 'Orchestrator',
      value: 'Orchestrator',
    },
    {
      label: 'Technician',
      value: 'Technician',
    },
    {
      label: 'Engineer',
      value: 'Engineer',
    },
    {
      label: 'Designer',
      value: 'Designer',
    },
    {
      label: 'Sales person',
      value: 'Sales person',
    },
    {
      label: 'Manager',
      value: 'Manager',
    },
  ];

  it('should render all the positions in the dropdown', async () => {
    render(
      <Filters
        options={positions}
        onNameSearchChanged={vi.fn}
        onPositionChanged={vi.fn}
      />
    );
    const positionApplied = screen.getByRole('button', {
      name: 'Position Applied',
    });

    await userEvent.click(positionApplied);

    const { getByRole } = within(screen.getByRole('listbox'));

    positions.forEach(({ label }) =>
      expect(getByRole('option', { name: label })).toBeInTheDocument()
    );
  });
});
