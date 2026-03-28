import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Calculator from '../src/lib/components/calculator/CalculatorContainer.svelte';

describe('Calculator money mode', () => {
  it('renders prose and computes max optimization time', async () => {
    render(Calculator, {
      mode: 'money',
      lifetime: '5',
      lifetimeUnit: 31536000,
      costRateUsd: '100000',
      costRateUnit: 31536000,
      savingsRateUsd: '30000',
      savingsRateUnit: 31536000,
      onSolve: vi.fn(),
    });

    expect(screen.getByText(/We think we can save/i)).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText(/Calendar:/i)).toBeTruthy();
      expect(screen.getByText(/Person:/i)).toBeTruthy();
      expect(screen.getByText(/1\.5 calendar-years/i)).toBeTruthy();
      expect(screen.getByText(/164\.3 person-sprints/i)).toBeTruthy();
    });
  });

  it('shows ??? for invalid values', async () => {
    render(Calculator, {
      mode: 'money',
      lifetime: '5',
      lifetimeUnit: 31536000,
      costRateUsd: '100000',
      costRateUnit: 31536000,
      savingsRateUsd: '30000',
      savingsRateUnit: 31536000,
      onSolve: vi.fn(),
    });

    const inputs = screen.getAllByRole('textbox');
    await fireEvent.input(inputs[0], { target: { value: '0' } });

    await waitFor(() => {
      expect(screen.getAllByText(/\?\?\?/).length).toBeGreaterThanOrEqual(2);
    });
  });

  it('renders both calendar and person outputs and emits default solve payload', async () => {
    const onSolve = vi.fn();

    render(Calculator, {
      mode: 'money',
      lifetime: '5',
      lifetimeUnit: 31536000,
      costRateUsd: '100000',
      costRateUnit: 31536000,
      savingsRateUsd: '30000',
      savingsRateUnit: 31536000,
      onSolve,
    });

    await waitFor(() => {
      expect(screen.getByText(/Calendar:/i)).toBeTruthy();
      expect(screen.getByText(/Person:/i)).toBeTruthy();
      expect(screen.getByText(/1\.5 calendar-years/i)).toBeTruthy();
      expect(screen.getByText(/164\.3 person-sprints/i)).toBeTruthy();
    });

    const lifetimeInput = screen.getByLabelText('Recoup window length');
    await fireEvent.input(lifetimeInput, { target: { value: '6' } });

    await waitFor(() => {
      expect(onSolve).toHaveBeenLastCalledWith(
        expect.objectContaining({
          mode: 'money',
        })
      );
    });
  });

  it('renders stacked calendar/person outputs in time mode', async () => {
    render(Calculator, {
      mode: 'time',
      tasks: '10',
      frequencyUnit: 604800,
      savings: '1',
      savingsUnit: 3600,
      lifetime: '8',
      lifetimeUnit: 604800,
      onSolve: vi.fn(),
    });

    await waitFor(() => {
      expect(screen.getByText(/Calendar:/i)).toBeTruthy();
      expect(screen.getByText(/Person:/i)).toBeTruthy();
      expect(screen.getByText(/3\.3 calendar-days/i)).toBeTruthy();
      expect(screen.getByText(/1\.0 person-sprint/i)).toBeTruthy();
    });
  });

  it('has accessible labels on all money mode controls', () => {
    render(Calculator, { mode: 'money', onSolve: vi.fn() });

    expect(screen.getByLabelText('Calculation mode')).toBeTruthy();
    expect(screen.getByLabelText('Money saved per period in US dollars')).toBeTruthy();
    expect(screen.getByLabelText('Unit for money saved per period')).toBeTruthy();
    expect(screen.getByLabelText('Resourcing cost per period in US dollars')).toBeTruthy();
    expect(screen.getByLabelText('Unit for resourcing cost per period')).toBeTruthy();
    expect(screen.getByLabelText('Recoup window length')).toBeTruthy();
    expect(screen.getByLabelText('Recoup window unit')).toBeTruthy();
  });
});
