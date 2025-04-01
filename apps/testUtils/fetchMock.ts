/* 
  psy21d 
  Apche 2.0 licensed
*/
export function mockFetch() {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ success: true }),
  } as Response);
}

export function clearFetch() {
  (global.fetch as jest.Mock).mockClear();
}
