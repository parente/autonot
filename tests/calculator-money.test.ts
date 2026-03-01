import { fireEvent, render, screen, waitFor } from '@testing-library/svelte';
import { describe, expect, it, vi } from 'vitest';

import Calculator from '../src/lib/components/Calculator.svelte';

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
      expect(screen.getByText(/1\.5 years/i)).toBeTruthy();
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
      expect(screen.getByText(/\?\?\?/)).toBeTruthy();
    });
  });
});
