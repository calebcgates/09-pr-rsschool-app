import axios from 'axios';

// Newly-introduced violations for nark launch-readiness walk 2026-06-09.
// These should be flagged as "introduced by PR" in the bot comment.

export async function fetchExternalProfile(userId: number): Promise<unknown> {
  const response = await axios.get(`https://api.example.com/profiles/${userId}`);
  return response.data;
}

export async function pushExternalEvent(payload: object): Promise<void> {
  await axios.post('https://api.example.com/events', payload);
}
