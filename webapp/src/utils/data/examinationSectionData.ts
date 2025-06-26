export type ScreeningTestData = {
  title: string;
  section: string;
  items: string[];
  color: "blue" | "green" | "orange" | "red";
};

export const section3yo: ScreeningTestData = {
  title: "Niebieski - 3 lata",
  section: "section3yo",
  items: ["Pokaż Pociąg.", "Pokaż ucho misia."],
  color: "blue",
};

export const section4yo: ScreeningTestData = {
  title: "Zielony - 4 lata",
  section: "section4yo",
  items: ["Pokaż czym się je zupę.", "Pokaż pojemnik na sól."],
  color: "green",
};

export const section5yo: ScreeningTestData = {
  title: "Pomarańczowy - 5 lata",
  section: "section5yo",
  items: [
    "Pokaż zwierzę, które mieszka w zoo i na tym obrazku jest największe.",
    "Pokaż zwierzę w paski, które przypomina konia.",
  ],
  color: "orange",
};

export const section6yo: ScreeningTestData = {
  title: "Czerwony - 6 lata",
  section: "section6yo",
  items: [
    "Pokaż największe nożyczki, a potem nożyczki z żółtą rączką.",
    "Wskaż kredkę, która leży pomiędzy czerwoną a zieloną kredką.",
  ],
  color: "red",
};
