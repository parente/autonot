import { render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Calculator from '../src/lib/components/Calculator.svelte';

describe('Calculator time mode', () => {
  it('renders prose and computes investment output', async () => {
    render(Calculator, {
      mode: 'time',
      tasks: '1',
      frequencyUnit: 604800,
      savings: '30',
      savingsUnit: 60,
      lifetime: '1',
      lifetimeUnit: 31536000,
      onSolve: vi.fn(),
    });

    expect(screen.getByText(/We perform a routine task/i)).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/Calendar:/i)).toBeTruthy();
      expect(screen.getByText(/Person:/i)).toBeTruthy();
      expect(screen.getByText(/1\.1 calendar-days/i)).toBeTruthy();
      expect(screen.getByText(/3\.3 person-days/i)).toBeTruthy();
    });
  });

  it('has accessible labels on all time mode controls', () => {
    render(Calculator, { mode: 'time', onSolve: vi.fn() });

    expect(screen.getByLabelText('Calculation mode')).toBeTruthy();
    expect(screen.getByLabelText('Number of times the task is performed')).toBeTruthy();
    expect(screen.getByLabelText('Frequency unit for task repetition')).toBeTruthy();
    expect(screen.getByLabelText('Time saved per task')).toBeTruthy();
    expect(screen.getByLabelText('Unit for time saved per task')).toBeTruthy();
    expect(screen.getByLabelText('Recoup window length')).toBeTruthy();
    expect(screen.getByLabelText('Recoup window unit')).toBeTruthy();
  });
});
