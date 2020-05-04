import axios from "axios";
import { MAX_LENGTH, MAX_LINES, GistBox } from "gist-box";

interface LaftelAnimation {
  name: string;
}

interface LaftelResponse<T> {
  count: number;
  next: null;
  previous: null;
  results: T[];
}

const instance = axios.create({
  baseURL: "https://laftel.net/api/v1.0",
  timeout: 1000,
  headers: {
    authorization: `Token ${process.env.LAFTEL_TOKEN}`,
    laftel: "TeJava",
  },
});
const box = new GistBox({
  id: process.env.GIST_ID || "",
  token: process.env.GH_TOKEN || "",
});

(async (): Promise<void> => {
  const res = await instance.get<LaftelResponse<LaftelAnimation>>(
    `/users/${process.env.LAFTEL_UID}/playhistory_set/`
  );
  const history = res.data.results
    .slice(0, MAX_LINES)
    .map((el) =>
      el.name.length > MAX_LENGTH - 3
        ? el.name.slice(0, MAX_LENGTH - 3) + "..."
        : el.name
    );

  await box.update({
    filename: "📺 Laftel 최근 본 애니",
    content: history.join("\n"),
  });
})();
