import axios from 'axios';
import { getAccessToken, requestWithResolvingAuthProblem } from '../../auth';

const backendUrl = process.env.REACT_APP_BACKEND_HOST;

export default async function requestUserFeedback(sessionId, songId, isLike) {
  const data = {
    session_id: sessionId,
    song_id: songId,
    is_like: isLike,
  };
  requestWithResolvingAuthProblem(async () => {
    const accessToken = getAccessToken();
    return axios.post(`${backendUrl}/userFeedback`, JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken,
      },
    });
  });
}
