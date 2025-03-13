const API_ENDPOINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const api = {
  fetchCats: (keyword) => request(`search?q=${keyword}`),
  fetchCatInfo: (id) => request(`${id}`),
  fetchRandomCats: () => request("random50"),
};

const request = async (url) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${url}`);
    if (!res.ok) {
      throw new Error(getErrorMsg(res.status));
    }
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching data: ", err.message);
    return { data: [], error: err.message };
  }
};

const getErrorMsg = (status) => {
  switch (status) {
    case 400:
      return "🚨 잘못된 요청입니다. 다시 확인해주세요.";
    case 401:
      return "🔒 인증이 필요합니다. 로그인 후 시도해주세요.";
    case 403:
      return "⛔ 접근이 거부되었습니다.";
    case 404:
      return "❌ 찾을 수 없는 데이터입니다.";
    case 500:
      return "🔥 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    case 503:
      return "⚠️ 현재 서버가 점검 중입니다. 잠시 후 다시 시도해주세요.";
    default:
      return `❗ 알 수 없는 오류 (Error Code: ${status})`;
  }
};

export default api;
