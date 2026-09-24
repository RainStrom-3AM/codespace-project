import { describe, expect, it, vi } from 'vitest';
import { writeClipboard } from './clipboard';

describe('writeClipboard', () => {
  it('writes the exact selected string', async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);

    await writeClipboard('Mozilla/5.0 (Example)', { writeText });

    expect(writeText).toHaveBeenCalledExactlyOnceWith('Mozilla/5.0 (Example)');
  });

  it('preserves clipboard write failures for truthful UI feedback', async () => {
    const writeText = vi.fn().mockRejectedValue(new Error('permission denied'));

    await expect(writeClipboard('UA', { writeText })).rejects.toThrow('permission denied');
  });
});
